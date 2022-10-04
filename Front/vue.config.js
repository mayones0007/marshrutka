module.exports = {
    productionSourceMap: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/styles/_variables.scss";`,
            }
        }
    },
};