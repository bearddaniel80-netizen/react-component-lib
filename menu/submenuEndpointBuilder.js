const endpointBuilders = {
  default: ({ activeMenu, item }) =>
    `/api/${activeMenu}/${item}`,

  profile: ({ activeMenu, item }) =>
    `/api/${activeMenu}/profile/${item}`,
};

export function buildSubmenuEndpoint({
  activeMenu,
  item,
  mode = "default",
}) {
  const builder = endpointBuilders[mode];

  if (!builder) {
    throw new Error(`Unknown menu mode: ${mode}`);
  }

  return builder({
    activeMenu,
    item,
  });
}