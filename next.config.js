const nextra = require("nextra");

const nextraDocsConfig = {
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
};

const nextJsConfig = {
  redirects: async () => [
    { source: "/", destination: "/docs/getting-started", permanent: false },
    {
      source: "/docs/database-connections/redshift",
      destination: "/docs/database-connections/postgresql",
      permanent: false,
    },
    {
      source: "/docs/database-connections/mariadb",
      destination: "/docs/database-connections/mysql",
      permanent: false,
    },
  ],
};

module.exports = nextra(nextraDocsConfig)(nextJsConfig);
