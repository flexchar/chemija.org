// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const sanityOptions = require('./sanity.config.js');
const REDIRECT_CODE = 301;

module.exports = function (api) {
    api.loadSource(({ addCollection, addMetadata }) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
        addMetadata('sanityOptions', sanityOptions);
    });

    api.createPages(({ createPage }) => {
        // Use the Pages API here: https://gridsome.org/docs/pages-api/
    });

    api.beforeBuild(args => {
        const pages = args._app.pages._pages.data;
        const articles = pages.filter(
            page =>
                page.internal.queryVariables &&
                page.internal.queryVariables._type === 'article'
        );

        const urls = articles.reduce((redirects, { internal, publicPath }) => {
            // PageData
            const data = internal.queryVariables;
            const target = publicPath; // use Gridsome's final publicPath
            const sources = data.legacy_urls;

            const nodeUrls = sources.reduce(
                (previous, url) => ({ ...previous, [url]: target }),
                {}
            );

            return {
                ...redirects,
                ...nodeUrls,
            };
        }, {});

        const redirectsText = Object.entries(urls).reduce(
            (prev, [from, to]) => {
                return `${prev} /${from} ${to} ${REDIRECT_CODE} \n`;
            },
            ''
        );

        args.afterBuild(({ config }) => {
            const { outputDir } = config;
            const fs = require('fs');
            fs.writeFileSync(`${outputDir}/_redirects`, redirectsText);
        });
    });
};
