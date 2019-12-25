const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    publicPath: "//localhost:3000/",
    css: {
        extract: false
    },
    configureWebpack: {
        devtool: 'none', // 不打包sourcemap
        output: {
            library: "singleVue", // 导出名称
            libraryTarget: "window", //挂载目标
        },
         /**** 添加开头 ****/
        plugins: [
            new StatsPlugin('manifest.json', {
                chunkModules: false,
                entrypoints: true,
                source: false,
                chunks: false,
                modules: false,
                assets: false,
                children: false,
                exclude: [/node_modules/]
            }),
        ]
        /**** 添加结尾 ****/
    },
    devServer: {
        contentBase: './',
        compress: true,
    }
};

