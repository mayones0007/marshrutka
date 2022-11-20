module.exports = {
    productionSourceMap: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/styles/_variables.scss";`,
            }
        }
    },
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        }
    }
};