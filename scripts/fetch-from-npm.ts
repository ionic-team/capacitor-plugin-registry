import { httpGet } from "./utils";
import { PluginInfo } from "./types/plugin";
import { getNpmToken } from "./secrets";
import { removeFromPluginList } from "./summary";
import { capacitorVersions, cordovaTestNames, testNames } from "./test-names";
import { NpmDownloads, NpmInfo } from "./types/npm-data-schema";

export async function applyNpmInfo(plugin: PluginInfo) {
  const [npmHistory, npmLatest] = await Promise.all([
    getNpmInfo(plugin.name, false),
    getNpmInfo(plugin.name, true),
  ]);

  plugin.version = npmHistory.version;
  plugin.versions = npmHistory.versions ? npmHistory.versions as string[] : [];
  plugin.author = npmHistory.author;
  plugin.description = npmHistory.description;
  plugin.bugs = npmHistory.bugs?.url;
  plugin.published = npmHistory.time[npmHistory.version];
  if (!plugin.published) {
    plugin.published = npmHistory?.created;
  }
  plugin.license = npmHistory.license;
  plugin.repo = cleanUrl(npmHistory.repository?.url);
  plugin.keywords = npmHistory.keywords;
  if (npmLatest.cordova) {
    plugin.platforms = npmLatest.cordova.platforms;
  }
  if (npmLatest.capacitor) {
    plugin.platforms = [];
    if (npmLatest.capacitor.ios) plugin.platforms.push("ios");
    if (npmLatest.capacitor.android) plugin.platforms.push("android");
  }

  plugin.success = [
    ...getCapacitorVersions(npmLatest),
    ...getCordovaVersions(npmLatest),
  ] as any;
  plugin.success = cleanupBasedOnPlatforms(plugin.success, plugin.platforms);
  plugin.fails = [];
  for (const test of testNames()) {
    if (!plugin.success.includes(test)) {
      plugin.fails.push(test);
    }
  }
}

export async function applyNpmDownloads(plugin: PluginInfo) {
  try {
    const period = "last-month";
    const np: NpmDownloads = await httpGet(
      `https://api.npmjs.org/downloads/point/${period}/${plugin.name}`,
      npmHeaders()
    );
    plugin.downloads = np.downloads;
    plugin.downloadStart = np.start;
    plugin.downloadEnd = np.end;
    plugin.downloadPeriod = period;
  } catch (error) {
    console.error("applyNpmDownloads Failed", (error as any).message);
  }
}

async function getNpmInfo(name: string, latest: boolean): Promise<NpmInfo> {
  let url = "";
  try {
    url = latest
      ? `https://registry.npmjs.org/${name}/latest`
      : `https://registry.npmjs.org/${name}`;
    const np: NpmInfo = await httpGet(url, npmHeaders());
    np.versions = undefined;
    np.version = np["dist-tags"] ? np["dist-tags"].latest : np.version;
    return np;
  } catch (error) {
    console.error(`getNpmInfo Failed ${url}`, error);
    return {} as NpmInfo;
  }
}

function npmHeaders(): any {
  return {
    headers: {
      Authorization: `bearer ${getNpmToken()}`,
      "User-Agent": "Ionic Plugin Explorer",
      Accept: "*/*",
    },
  };
}

function cleanUrl(url: string): string {
  if (url) {
    return url.replace("git+", "");
  }
  return url;
}

function cleanupBasedOnPlatforms(
  tests: string[],
  platforms: string[]
): string[] {
  return tests.filter((test) => {
    return (
      (test.includes("ios") && platforms.includes("ios")) ||
      (test.includes("android") && platforms.includes("android"))
    );
  });
}

function getCapacitorVersions(p: NpmInfo): string[] {
  let cap: string = capCoreDeps(p);
  const result = [];
  if (likelyCordova(p)) {
    const t = [];
    for (let version of capacitorVersions) {
      t.push(`^${version}.0.0`);
    }
    cap = t.join(" | ");
  }
  for (let version of capacitorVersions) {
    let match = false;

    if (cap?.includes(`>`) && !cap?.includes(`>=`)) {
      const t = cap.split(">");
      const min = parseInt(t[1].trim());
      if (version > min) {
        match = true;
      }
    } else if (cap?.includes(`>=`)) {
      const t = cap.split(">=");
      const min = parseInt(t[1].trim());
      if (version >= min) {
        match = true;
      }
    }
    if (
      cap?.includes(`^${version}`) ||
      cap?.includes(`>=${version}`) ||
      match
    ) {
      result.push(`capacitor-ios-${version}`);
      result.push(`capacitor-android-${version}`);
    }
  }
  if (result.length == 0) {
    if (!likelyCordova(p)) {
      if (!cap) {
        console.error(
          `Error: ${p.name} does not seem to be Capacitor or Cordova based. The package will be removed.`
        );
        removeFromPluginList(p.name);
      } else {
        console.error(
          `Warning ${p.name} is Capacitor based but dependent on @capacitor/core "${cap}"`
        );
      }
    }
  }
  return result;
}

function capCoreDeps(p: NpmInfo): string {
  let cap = p.peerDependencies
    ? p.peerDependencies["@capacitor/core"]
    : undefined;
  if (!cap) {
    cap = p.dependencies ? p.dependencies["@capacitor/core"] : undefined;
    if (!cap) {
      cap = p.devDependencies
        ? p.devDependencies["@capacitor/core"]
        : undefined;
      if (!cap) {
        cap = p.devDependencies
          ? p.devDependencies["@capacitor/ios"]
          : undefined;
      } else if (!cap) {
        cap = p.devDependencies
          ? p.devDependencies["@capacitor/android"]
          : undefined;
      }
    }
  }
  return cap;
}

function likelyCordova(p: NpmInfo): boolean {
  if (p.cordova?.platforms) return true;
  if (p.engines && p.engines["cordova"]) return true;
  if (p.dependencies && p.dependencies["cordova-android"]) return true;
  if (p.dependencies && p.dependencies["cordova-ios"]) return true;
  if (p.name.includes("cordova-")) return true; // We dont extract the package to see if there is a plugin.xml but this is close enough
  return false;
}

function getCordovaVersions(p: NpmInfo): string[] {
  const result = [];
  const isCapacitor = !!capCoreDeps(p);

  if (!isCapacitor && likelyCordova(p)) {
    for (let cordova of cordovaTestNames()) {
      result.push(cordova);
    }
  }
  return result;
}
