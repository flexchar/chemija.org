<template>
    <Layout>
        <div class="articles">
            <article v-for="article in articles" :key="article.node.id">
                <g-link :to="article.node.path">
                    <header>
                        {{ article.node.title }}
                        {{ article.node.views }}
                    </header>
                </g-link>
            </article>
        </div>
    </Layout>
</template>

<script>
    import BlockContent from '@/components/BlockContent';
    export default {
        name: 'Straipsniai',
        computed: {
            articles() {
                return this.$page.articles.edges;
            },
        },
        components: {
            BlockContent,
        },
    };
</script>

<style lang="scss">
    //
</style>

<page-query>
query getArticles {
    articles: allSanityArticle {
        totalCount
        pageInfo {
            totalItems
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