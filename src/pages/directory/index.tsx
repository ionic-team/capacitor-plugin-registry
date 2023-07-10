import clsx from "clsx";
import styles from "./index.module.scss";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useRouter } from "next/router";
import PlatformBar from "@components/platform-bar";

import IconAuthor from "./assets/icons/author.png";
import IconDownloads from "./assets/icons/downloads.png";
import IconHealth from "./assets/icons/health.png";
import IconIssues from "./assets/icons/issues.png";
import IconLicense from "./assets/icons/license.png";
import IconOfficialBadge from "./assets/icons/official-badge.png";
import IconStars from "./assets/icons/stars.png";
import IconUpdated from "./assets/icons/updated.png";
import IconWatchers from "./assets/icons/watchers.png";
import IconQuestion from "./assets/icons/question.png";

import Image from "next/image";
import { PluginResult } from "@root/shared/plugin-result";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { InferGetStaticPropsType } from "next";
import { getStaticProps } from "@root/pages/directory";
import SiteFooter from "@components/site-footer";
import Prefooter from "@components/prefooter";
import SiteHeader from "@components/site-header";
import SiteMeta from "@components/site-meta";

const DirectoryPageContext = createContext<{
  pluginData: PluginResult[];
  setPluginData: Dispatch<SetStateAction<PluginResult[]>>;
  setFilters: Dispatch<SetStateAction<string[]>>;
  setPlatforms: Dispatch<SetStateAction<string[]>>;
  filters: string[];
  platforms: string[];
  allPlatforms: string[];
}>({
  pluginData: [],
  setPluginData: () => {},
  setFilters: () => {},
  setPlatforms: () => {},
  filters: [],
  platforms: [],
  allPlatforms: [],
});

const DirectoryPage = ({
  allPlatforms,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pluginData, setPluginData] = useState<PluginResult[]>([]);
  const [platforms, setPlatforms] = useState<string[]>(["android", "ios"]);
  // const { query } = useRouter();
  const [filters, setFilters] = useState<string[]>(["official", "community"]);

  // TODO: query string functinality
  // useEffect(() => {
  //   setFilters(
  //     query.filters
  //       ? Array.isArray(query.filters)
  //         ? query.filters
  //         : query.filters.split(",")
  //       : []
  //   );
  // }, [query]);

  return (
    <>
      <SiteMeta title="Capacitor Plugin Directory" />
      <DirectoryPageContext.Provider
        value={{
          pluginData,
          setPluginData,
          setFilters,
          filters,
          allPlatforms,
          setPlatforms,
          platforms,
        }}
      >
        <PlatformBar />
        <main>
          <Search />
          <Content />
          <Prefooter />
        </main>
      </DirectoryPageContext.Provider>
      <SiteFooter />
    </>
  );
};

const Search = () => {
  const { setPluginData } = useContext(DirectoryPageContext);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const search = async () => {
        const res = await fetch(`/api/search?search=${e.target.value}`);

        setPluginData(await res.json());
      };

      search();
    },
    [setPluginData]
  );

  return (
    <section className={styles.search} id="search">
      <div className="ds-container">
        <div className={styles.searchInputWrapper}>
          <input
            onChange={handleChange}
            className={styles.searchInput}
            placeholder="Search plugins..."
          />
        </div>
      </div>
    </section>
  );
};

const Sidebar = () => {
  const { allPlatforms, setFilters, platforms, setPlatforms, filters } =
    useContext(DirectoryPageContext);

  const handlePlatformCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.dataset.name;

      if (!value) return;

      setPlatforms((platform) => {
        if (!e.target.checked) {
          const index = platform.indexOf(value);
          if (index < 0) return platform;
          platform.splice(index, 1);
          return [...platform];
        } else {
          return [...platform, value];
        }
      });
    },
    [setPlatforms]
  );

  const handleFilterCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.dataset.name;

      if (!value) return;

      setFilters((filter) => {
        if (!e.target.checked) {
          const index = filter.indexOf(value);
          if (index < 0) return filter;
          filter.splice(index, 1);
          return [...filter];
        } else {
          return [...filter, value];
        }
      });
    },
    [setFilters]
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarStickyWrapper}>
        <article className={styles.sidebarFilters}>
          <h2>Filter</h2>
          <div>
            <div className={clsx("ds-paragraph-4", styles.sidebarFilter)}>
              <input
                data-name="official"
                type="checkbox"
                checked={filters.includes("official")}
                onChange={handleFilterCheckboxChange}
              />
              <Image
                src={IconOfficialBadge}
                width={IconOfficialBadge.width / 2}
                height={IconOfficialBadge.height / 2}
                alt="official plugin icon"
              />
              Official
              <Tippy content="Built and maintained by Ionic">
                <Image
                  src={IconQuestion}
                  width={IconQuestion.width / 2}
                  height={IconQuestion.height / 2}
                  alt="question icon"
                />
              </Tippy>
            </div>
            <div className={clsx("ds-paragraph-4", styles.sidebarFilter)}>
              <input
                data-name="community"
                type="checkbox"
                checked={filters.includes("community")}
                onChange={handleFilterCheckboxChange}
              />
              Community
              <Tippy content="Built and maintained by independent developers in the Ionic community.">
                <Image
                  src={IconQuestion}
                  width={IconQuestion.width / 2}
                  height={IconQuestion.height / 2}
                  alt="question icon"
                />
              </Tippy>
            </div>
          </div>
        </article>
        <article className={styles.sidebarPlatforms}>
          <h2>Platform</h2>
          <div>
            {allPlatforms.map((platform) => (
              <div
                key={platform}
                className={clsx("ds-paragraph-4", styles.sidebarPlatform)}
              >
                <input
                  checked={platforms.includes(platform)}
                  data-name={platform}
                  type="checkbox"
                  onChange={handlePlatformCheckboxChange}
                  aria-label={platform}
                />
                {platform}
              </div>
            ))}
          </div>
        </article>
      </div>
    </aside>
  );
};

const Results = () => {
  const { pluginData, platforms, filters, setPluginData } =
    useContext(DirectoryPageContext);

  return (
    <div className={styles.results}>
      {pluginData
        //filter by platforms
        .filter((plugin) =>
          plugin.platforms.some((platform) => platforms.includes(platform))
        )
        //filter by filters
        .filter((plugin) => filters.includes(plugin.type))
        .map((data) => {
          return <PluginCard key={data.name} {...data} />;
        })}
    </div>
  );
};

const PluginCard = ({
  name,
  description,
  health: { score },
  license,
  lastUpdated,
  githubUrl,
  author,
  platforms,
  type,
  stats: { downloads, stars, openIssues, watchers },
}: PluginResult) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  return (
    <article className={styles.pluginCard}>
      <header>
        <h2 className={clsx("ds-heading-5", styles.pluginCardTitle)}>
          {githubUrl ? (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          ) : (
            name
          )}
          {type === "official" && (
            <Image
              src={IconOfficialBadge}
              width={IconOfficialBadge.width / 2}
              height={IconOfficialBadge.height / 2}
              alt="official plugin icon"
            />
          )}
        </h2>
        <div className={styles.pluginCardPlatforms}>
          {platforms?.map((platform) => (
            <span key={platform} className={styles.pluginCardPlatform}>
              {platform}
            </span>
          ))}
        </div>
        <p className="ds-paragraph-4">{description}</p>
        <div className={styles.pluginCardBottomInfo}>
          <span
            className={clsx("ds-paragraph-6", styles.pluginCardBottomInfoItem)}
          >
            <Image
              src={IconLicense}
              width={IconLicense.width / 2}
              height={IconLicense.height / 2}
              alt="License icon"
            />
            {license} license
          </span>
          {author && "name" in author && (
            <span
              className={clsx(
                "ds-paragraph-6",
                styles.pluginCardBottomInfoItem
              )}
            >
              <Image
                src={IconAuthor}
                width={IconAuthor.width / 2}
                height={IconAuthor.height / 2}
                alt="Author icon"
              />
              {author.name}
            </span>
          )}
        </div>
      </header>
      <div className={styles.pluginCardEnd}>
        <div className={styles.pluginCardStats}>
          {downloads && (
            <div className={clsx("ds-paragraph-4", styles.pluginCardStatItem)}>
              <Image
                src={IconDownloads}
                width={IconDownloads.width / 2}
                height={IconDownloads.height / 2}
                alt="Downloads icon"
              />
              {downloads} Downloads
            </div>
          )}
          {lastUpdated && (
            <div className={clsx("ds-paragraph-4", styles.pluginCardStatItem)}>
              <Image
                src={IconUpdated}
                width={IconUpdated.width / 2}
                height={IconUpdated.height / 2}
                alt="Updated icon"
              />
              Updated: {formatter.format(new Date(lastUpdated))}
            </div>
          )}
          <div className={clsx("ds-paragraph-4", styles.pluginCardStatItem)}>
            <Image
              src={IconIssues}
              width={IconIssues.width / 2}
              height={IconIssues.height / 2}
              alt="Issues icon"
            />
            {openIssues} issues
          </div>
          <div className={clsx("ds-paragraph-4", styles.pluginCardStatItem)}>
            <Image
              src={IconHealth}
              width={IconHealth.width / 2}
              height={IconHealth.height / 2}
              alt="Health icon"
            />
            Health: {score}%
          </div>
          <div className={clsx("ds-paragraph-4", styles.pluginCardStatItem)}>
            <Image
              src={IconStars}
              width={IconStars.width / 2}
              height={IconStars.height / 2}
              alt="Stars icon"
            />
            {stars} stars
          </div>
          <div className={clsx("ds-paragraph-4", styles.pluginCardStatItem)}>
            <Image
              src={IconWatchers}
              width={IconWatchers.width / 2}
              height={IconWatchers.height / 2}
              alt="Watchers icon"
            />
            {watchers} Watchers
          </div>
        </div>
      </div>
    </article>
  );
};

const Content = () => {
  return (
    <div className={clsx("ds-container", styles.content)}>
      <Sidebar />
      <Results />
    </div>
  );
};

export default DirectoryPage;
