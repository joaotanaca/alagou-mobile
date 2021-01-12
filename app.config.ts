export default {
    name: "Alagou!",
    version: "1.0.0",
    extra: {
        API_KEY: "pk.6cc37731b5e5ba4186f609c847f2b56a",
    },
    icon: "./assets/icon.png",
    splash: {
        image: "./assets/splash.png",
        backgroundColor: "#ffffff",
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
    },
    web: {
        favicon: "./assets/favicon.png",
    },
};
