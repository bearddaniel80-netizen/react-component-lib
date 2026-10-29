const endpointBuilders = {
  default: ({ activeMenu, item }) =>
    `/api/${activeMenu}/${item}`,

  github: ({ activeMenu, item }) =>
    `/api/${activeMenu}/github/${item}`,

  html: ({ activeMenu, item }) =>
    `/api/${activeMenu}/html/${item}`,

  markdown: ({ activeMenu, item }) =>
    `/api/${activeMenu}/markdown/${item}`,

  pdf: ({ activeMenu, item }) =>
    `/api/${activeMenu}/pdf/${item}`,

  cache: ({ activeMenu, item }) =>
    `/api/${activeMenu}/cache/${item}`,

  failfast: ({ activeMenu, item }) =>
    `/api/${activeMenu}/failfast/${item}`,

  failfastquery: ({ activeMenu, item }) =>
    `/api/${activeMenu}/failfast/query/${item}`,
  
  profile: ({ activeMenu, item }) =>
    `/api/${activeMenu}/profile/${item}`,
  
  retry: ({ activeMenu, item }) =>
    `/api/${activeMenu}/retry/3/${item}`,
};

export function buildSubmenuEndpoint({
  activeMenu,
  item,
  mode = "default",
}) {
  const builder = endpointBuilders[mode];

  if (!builder) {
    console.log(
      "mode: ", mode
    );
    throw new Error(`Unknown menu mode: ${mode}`);
  }

  return builder({
    activeMenu,
    item,
  });
}