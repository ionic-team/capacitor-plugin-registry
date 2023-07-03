import IndexPage from "@pages/index";

import pluginData from "../data/plugin-data.json";

const Index = (props) => <IndexPage {...props} />;

export const getStaticProps = async () => {
  const allPlatforms = pluginData.reduce((acc, cur) => {
    if (!Array.isArray(cur.platforms)) return acc;

    cur.platforms.forEach(
      (platform) => !acc.includes(platform) && acc.push(platform)
    );
    return acc;
  }, []);

  return {
    props: {
      allPlatforms,
    },
  };
};

export default Index;
