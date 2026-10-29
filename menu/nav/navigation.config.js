
export const navigationConfig = {
  label: "Main navigation",

  items: [
    {
      id: "home",
      label: "Home",
      href: "/",
    },
    {
      id: "github",
      label: "Github",
      href: "/github",
    },
    {
      id: "documents",
      label: "Documents",
      children: [
        {
          id: "html",
          label: "HTML",
          href: "/html",
        },
        {
          id: "markdown",
          label: "Markdown",
          href: "/markdown",
          children: [
            {
              id: "markdown-guide",
              label: "Guide",
              href: "/markdown/guide",
            },
            {
              id: "markdown-examples",
              label: "Examples",
              href: "/markdown/examples",
            },
          ],
        },
        {
          id: "pdf",
          label: "PDF",
          href: "/pdf",
        },
      ],
    },
    {
      id: "profile",
      label: "Profile",
      href: "/profile",
    },
  ],
};
