<template>
    <Layout containerClass="flex flex-col items-center">
        <g-image
            v-if="hero"
            :src="imageUrl(hero).height(400).url()"
            :alt="hero.description"
            class="w-full pb-4"
        />
        <article class="w-full sm:w-3/4 lg:w-1/2">
            <header class="pb-8 text-left">
                <h1 class="text-5xl font-light">
                    {{ post.title }}
                </h1>

                <div class="flex justify-between text-sm tracking-wide">
                    <p class="text-gray-800 py-2 md:py-0">
                        <time
                            :datatime="post._updatedAt"
                            :title="
                                'Atnaujinta ' +
                                new Date(post._updatedAt).toLocaleString('lt')
                            "
                        >
                            {{
                                new Date(post._updatedAt).toLocaleDateString(
                                    'lt'
                                )
                            }}
                        </time>
                    </p>

                    <p title="Kategorijos">
                        {{ post.categories.map(c => c.title).join(', ') }}
                    </p>
                </div>
            </header>

            <main class="text-justify pb-8">
                <block-content :blocks="post._rawBody"></block-content>
            </main>

            <footer class="py-4 text-sm tracking-wide">
                <p>
                    Pirmą kartą paskelbta
                    <time
                        :datatime="post._createdAt"
                        :title="new Date(post._createdAt).toLocaleString('lt')"
                    >
                        {{ new Date(post._createdAt).toLocaleDateString('lt') }}
                    </time>
                </p>
            </footer>
        </article>
    </Layout>
</template>

<script>
    import BlockContent from '@/components/BlockContent';
    import imageUrl from '@/helpers/sanityImage';

    export default {
        name: 'Article',
        metaInfo() {
            return {
                title: this.post.title,
            };
        },
        computed: {
            post() {
                return this.$page.post;
            },
            hero() {
                return this.post.mainImage;
            },
        },
        methods: {
            imageUrl,
        },
        components: {
            BlockContent,
        },
    };
</script>

<page-query>
    query Article($id: ID!) {
        post: sanityArticle(id: $id) {
            title
            _createdAt
            _updatedAt
            mainImage {
                asset {
                    url
                    description
                }
                crop {
                    top
                    bottom
                    left
                    right
                }
            }
            categories {
                title
            }
            _rawBody
        }
    }
</page-query>
