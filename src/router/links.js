export const ROUTER = {
  home: "/",
  login: "/login",
  logout: "/logout",
  settings: "/settings",
  funds: "/settings/funds",
  singleFund: "/settings/funds/:id",
};

export const getUrl = (rawUrl, params) => {
  let url = rawUrl;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, value);
  }
  return url;
};
