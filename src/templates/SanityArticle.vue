<template>
    <Layout>
        <article>
            <header>{{ $page.article.title }}</header>

            <block-content :blocks="$page.article._rawBody"></block-content>

            <footer>
                Kategorijos:
                <ul>
                    <li v-for="cat in $page.article.categories" :key="cat.id">
                        {{ cat.title }}
                    </li>
                </ul>
            </footer>
        </article>
    </Layout>
</template>

<script>
    import BlockContent from '@/components/BlockContent';
    export default {
        name: 'Article',
        metaInfo() {
            return {
                title: this.$page.article.title,
            };
        },
        components: {
            BlockContent,
        },
    };
</script>

<page-query>
query Article($id: ID!) {
    # metadata {
    #   sanityOptions {
    #     projectId
    #     dataset
    #   }
    # }
    article: sanityArticle(id: $id) {
        title
        _createdAt(format: "MM, YYYY")
        categories {
            id
            title
        }
        _rawBody
    }
}
</page-query>
