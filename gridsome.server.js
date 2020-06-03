// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const sanityOptions = require('./sanity.config.js');

module.exports = function (api) {
    api.loadSource(({ addCollection, addMetadata }) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
        addMetadata('sanityOptions', sanityOptions);
    });

    api.createPages(({ createPage }) => {
        // Use the Pages API here: https://gridsome.org/docs/pages-api/
    });

    api.beforeBuild(args => {
        // console.log('args', args);

        // const { graphql } = args;
        // const data = pages[6].internal.queryVariables;

        const pages = args._app.pages._pages.data;
        const articles = pages.filter(
            page =>
                page.internal.queryVariables &&
                page.internal.queryVariables._type === 'article'
        );

        const urls = articles.reduce((redirects, { internal }) => {
            // PageData
            const data = internal.queryVariables;
            const target = data.slug.current;
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
                return `${prev} /${from} /${to} 301 \n`;
            },
            ''
        );

        args.afterBuild(({ config }) => {
            const { outputDir, context } = config;
            const fs = require('fs');
            fs.writeFileSync(`${outputDir}/_redirects`, redirectsText);
        });

        // Demo output
        const queryVariables = {
            id: '100',
            $uid: 'KoDBqM52wK-100',
            internal: {
                typeName: 'SanityArticle',
                timestamp: 1591213082958,
                publicPath: { default: '/natrio-sulfitas/' },
            },
            _createdAt: '2019-10-06T18:59:50Z',
            _id: '100',
            _rev: 'EhyAwDM56giys6NDP1ZPZg',
            _type: 'article',
            _updatedAt: '2019-10-06T18:59:50Z',
            body: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            marks: [],
                            text:
                                'Natrio sulfitas. Na2SO3 \u0013 bespalviai heksagonalinės sistemos kristalai, pakankamai gerai tirpstantys vandenyje (21g 100g H2O, 20C). Natrio sulfato tirpalai turi šarminę reakciją, juos rūgštinant, išsiskiria SO2. Natrio sulfitas \u0013 stiprus reduktorius. Vandeniniuose tirpaluose jį lengvai oksiduoja deguonis. Natrio sulfitas gaunamas vykstant Na2CO3 ir SO2 tirpalų sąveikai. Sotinimas vykdomas tol, kol gaunamas 45-47% NaHSO3 tirpalas. Tirpalas neutralizuojamas soda ir šaldant kristalinamas Na2SO3"7H2O. Bevandenis natrio sulfitas gaunamas išgarinant koncentruotą tirpalą. Vartojamas fotografijoje, vaistų pramonėje, medicinoje ir sintetinių pluoštų gamyboje.',
                        },
                    ],
                    markDefs: [],
                    style: 'normal',
                },
                { _type: 'block', children: [], markDefs: [], style: 'normal' },
            ],
            categories: [
                {
                    _key: '97b1613f2c2b79a50b10d539',
                    _ref: '8790043f-3b92-4661-b622-54b378a331fc',
                    _type: 'reference',
                },
            ],
            legacy_urls: ['natrio-sulfitas,s100', 'natrio-sulfitas,s100.html'],
            publishedAt: '2013-01-20T13:53:21.000Z',
            slug: { _type: 'slug', current: 'natrio-sulfitas' },
            title: 'Natrio sulfitas',
            views: 6055,
            path: '/natrio-sulfitas/',
            $loki: 1,
        };

        // debugger;
        // process.exit(20);
    });
};
