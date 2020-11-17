export default {
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Meta description" }
    ]
  },
  buildModules: ["@nuxt/typescript-build"],
  styleResources: {
    scss: ["~/css/_variables.scss", "~/css/_mixins.scss"]
  },
  loaders: {
    ts: {
      silent: true
    }
  },
  css: ["~/css/main.css"],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ["script", "style", "font"].includes(type);
      }
    }
  }
};
