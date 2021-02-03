export default {
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Meta description" }
    ]
  },
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/pwa"],
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
  },
  pwa: {
    meta: {
      mobileAppIOS: true,
      appleStatusBarStyle: "black-translucent",
      name: "SL Classifier",
      title: "SL Classifier",
      author: "Timo Scheuermann",
      description:
        "Skin Lesion Classifier, a Convolutional Neural Network based lesion classifier created for my Bachelor Thesis",
      nativeUI: true,
      ogHost: "https://slc.timos.design",
      theme_color: "#f5f5f7",
      themeColor: "#f5f5f7"
    },
    manifest: {
      background_color: "#f5f5f7",
      backgroundColor: "#f5f5f7",
      theme_color: "#f5f5f7",
      themeColor: "#f5f5f7",
      display: "fullscreen"
    }
  },
  loading: {
    color: "#08f"
  },
  manifest: {
    background_color: "#f5f5f7",
    backgroundColor: "#f5f5f7",
    theme_color: "#f5f5f7",
    themeColor: "#f5f5f7",
    display: "fullscreen"
  }
  // server: {
  //   host: "192.168.2.177",
  //   port: 8080
  // }
};
