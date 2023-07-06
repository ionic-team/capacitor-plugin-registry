export const HOSTNAME = "capacitorjs.com";

export const BASE_URL = `https://${HOSTNAME}`;

export const isSameSite = (hyperlink: string) => {
  const url = new URL(hyperlink);

  return url.origin === BASE_URL;
};
