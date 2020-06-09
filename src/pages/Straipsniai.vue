<template>
    <Layout>
        <div class="grid mb-4" style="--css-grid-minmax: 250px;">
            <article
                v-for="{ node: article } in articles"
                :key="article.id"
                class="max-w-sm rounded overflow-hidden shadow-lg"
            >
                <img
                    v-if="article.mainImage"
                    class="w-full"
                    :src="article.mainImage.asset.url"
                    :alt="article.mainImage.asset.originalFilename"
                />

                <div class="px-6 py-4">
                    <g-link :to="article.path">
                        <div class="font-bold text-xl mb-2">
                            {{ article.title }}
                        </div>
                    </g-link>
                    <p
                        class="text-gray-700 text-base"
                        v-html="
                            truncate(
                                Array.isArray(article._rawBody)
                                    ? toPlainText(article._rawBody)
                                    : article._rawBody
                            )
                        "
                    ></p>
                </div>

                <div class="px-6 py-4">
                    <span
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                        👁 {{ article.views }}
                    </span>
                    <span
                        v-for="category in article.categories.map(c => c.title)"
                        :key="category"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                        #{{ category }}
                    </span>
                </div>
            </article>
        </div>

        <Pager
            class="flex flex-wrap justify-center"
            :info="$page.articles.pageInfo"
            linkClass="px-4 py-2 m-2 bg-white shadow rounded hover:bg-green-500 hover:text-white"
            firstLabel="Pirmas"
            lastLabel="Paskutinis"
        />
    </Layout>
</template>

<script>
    import BlockContent from '@/components/BlockContent';
    import { toPlainText } from '@/helpers/PortableToPlainText';
    import { truncate } from '@/helpers/truncate';
    import { Pager } from 'gridsome';

    export default {
        name: 'Straipsniai',
        metaInfo: {
            title: 'Straipsniai',
        },
        computed: {
            articles() {
                return this.$page.articles.edges.reverse();
            },
        },
        components: {
            BlockContent,
        },
        methods: {
            toPlainText,
            truncate: val => truncate(val, 125, true),
        },
        components: {
            Pager,
        },
    };
</script>

<page-query>
    query getArticles($page: Int) {
        articles: allSanityArticle(perPage: 9, page: $page) @paginate {
            totalCount
            pageInfo {
                totalPages
                currentPage
            }
            edges {
                node {
                    id
                    _id
                    _type
                    _createdAt
                    title
                    slug {
                        current
                    }
                    mainImage {
                        asset {
                            url
                            originalFilename
                        }
                    }
                    legacy_urls
                    categories {
                        title
                    }
                    views
                    _rawBody
                    path
                }
            }
        }
    }
</page-query>
