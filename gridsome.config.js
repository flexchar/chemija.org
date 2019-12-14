// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const sanityConfig = require('./sanity.config');

module.exports = {
    siteName: 'Chemija.org',
    siteDescription: 'Chemijos ir kitų gamtos mokslų mėgėjų svetainė',
    templates: {
        SanityArticle: '/:slug__current',
    },
    plugins: [
        {
            use: 'gridsome-source-sanity',
            options: {
                ...sanityConfig,
                token:
                    'skjDhoRSV1UqoGjmjgY0F34bLZSp9FgbUrN19FNhoR4JQIhNgBfB4kgHHZ5iqheZR3oQSXLRwwv1AbLOFi40QuuPFWCYr62xRL704IMCdtftMfudSkhe2BOH41goAttgL4XbBh8ZCGPvSgeQDfLuSkCDAn01qE8ExH2lZMylAVc9kXScXrKF',
                overlayDrafts: process.env.development,
                watchMode: process.env.development,
            },
        },
        {
            use: 'gridsome-plugin-tailwindcss',
            options: {
                tailwindConfig: './tailwind.config.js',
                purgeConfig: {},
                presetEnvConfig: {},
                shouldPurge: process.env.production,
                shouldImport: true,
                shouldTimeTravel: true,
                shouldPurgeUnusedKeyframes: true,
            },
        },
    ],
};
