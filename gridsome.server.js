// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const sanityOptions = require('./sanity.config.js');
const GLOBAL_REDIRECTS = require('./redirects.js');

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
        const articleRedirects = getArticleRedirects(pages);

        const redirects = articleRedirects.concat(GLOBAL_REDIRECTS);
        const redirectsText = generateRedirectsString(redirects);

        args.afterBuild(({ config }) => {
            const { outputDir } = config;
            const fs = require('fs');
            fs.writeFileSync(`${outputDir}/_redirects`, redirectsText);
        });
    });
};

/**
 * Build string representing _redirects file for Netlify
 *
 * @param {array} redirects Array of redirects
 * @return {string} redirects file text
 */
function generateRedirectsString(redirects) {
    return redirects.reduce((prev, { from, to, code }) => {
        // Prevent empty redirects
        if (from && to) {
            return `${prev}${from} ${to} ${code} \n`;
        }
        return prev;
    }, '');
}

/**
 * Filter articles out of all gridsome pages, extract legacy urls and build redirects
 *
 * @param {array} pages Array of pages passed from Gridsome
 * @return {array} Array of redirects
 */
function getArticleRedirects(pages) {
    const articles = pages.filter(
        page =>
            page.internal.queryVariables &&
            page.internal.queryVariables._type === 'article'
    );

    const urls = articles.reduce((redirects, { internal, publicPath }) => {
        const sources = internal.queryVariables.legacy_urls;
        const target = publicPath; // use Gridsome publicPath

        const nodeUrls = sources.reduce(
            (previous, url) => [
                ...previous,
                { from: `/${url}`, to: target, code: 301 },
            ],
            []
        );

        return redirects.concat(nodeUrls);
    }, []);

    return urls;
}
