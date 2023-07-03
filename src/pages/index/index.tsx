import clsx from "clsx";
import styles from "./index.module.scss";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import PlatformBar from "@components/platform-bar";

import { PluginInfo } from "@/scripts/types/plugin";

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
import { PluginResult } from "@/shared/plugin-result";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const IndexPageContext = createContext<{
  pluginData: PluginInfo[];
  setPluginData: Dispatch<SetStateAction<PluginInfo[]>>;
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

const IndexPage = ({ allPlatforms }) => {
  const [pluginData, setPluginData] = useState<PluginInfo[]>([]);
  const [platforms, setPlatforms] = useState<string[]>(["android", "ios"]);
  const { query } = useRouter();
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    setFilters(
      query.filters
        ? Array.isArray(query.filters)
          ? query.filters
          : query.filters.split(",")
        : []
    );
  }, [query]);

  useEffect(() => {
    setPluginData((pluginData) => [
      ...pluginData.filter((plugin) =>
        plugin.platforms.some((platform) => platforms.includes(platform))
      ),
    ]);
  }, [platforms]);

  return (
    <IndexPageContext.Provider
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
      <Search />
      <Content />
    </IndexPageContext.Provider>
  );
};

const Search = () => {
  const { setPluginData } = useContext(IndexPageContext);

  const handleChange = useCallback(
    (e) => {
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
  const { allPlatforms, setFilters, platforms, setPlatforms } =
    useContext(IndexPageContext);

  const handlePlatformCheckboxChange = useCallback(
    (e) => {
      const value = e.target.dataset.name;

      setPlatforms((platform) => {
        if (!e.target.checked) {
          const index = platform.indexOf(value);
          return platform.splice(index, 1);
        } else {
          return [...platform, value];
        }
      });
    },
    [setPlatforms]
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarStickyWrapper}>
        <article className={styles.sidebarFilters}>
          <h2 className="ds-overline-3">Filter</h2>
          <div>
            <div className={clsx("ds-paragraph-4", styles.sidebarFilter)}>
              <input type="checkbox" />
              <Image
                src={IconOfficialBadge}
                width={IconOfficialBadge.width / 2}
                height={IconOfficialBadge.height / 2}
                alt="Author icon"
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
              <input type="checkbox" />
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
          <h2 className="ds-overline-3">Platform</h2>
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
    useContext(IndexPageContext);

  return (
    <div className={styles.results}>
      {pluginData
        .filter((plugin) => {
          plugin.platforms.some((platform) => platforms.includes(platform));
        })
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
  stats: { downloads, stars, openIssues, watchers },
}: Partial<PluginResult>) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  return (
    <article className={styles.pluginCard}>
      <header>
        <h2 className={clsx("ds-heading-5", styles.pluginCardTitle)}>
          {githubUrl ? <a href={githubUrl}>{name}</a> : name}
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

export default IndexPage;
