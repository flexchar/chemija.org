<template>
    <Layout>
        <section class="flex flex-col sm:flex-row">
            <div class="w-full md:w-1/2 pb-4 sm:p-0 flex flex-col">
                <div class="pb-4 flex-1">
                    Chemijos bei kitų gamtos mokslų mėgėjų namuai
                </div>
                <div class="pb-4 flex-1">
                    <p>pilnus įvairiausių straipsnių,</p>
                    <p>eksperimentų,</p>
                    <p>egzaminų,</p>
                    <p>uždavinių</p>
                    <p>ir dar daugiau!</p>
                </div>
                <nobelio-premija></nobelio-premija>
            </div>

            <div class="w-full md:w-1/2">
                <img src="/science.svg" alt="" />
            </div>
        </section>

        <section>
            <div class="border-b py-1 my-4 flex justify-between items-end">
                <h2 class="text-3xl">Straipsniai</h2>
                <g-link to="/straipsniai">Visi straipsniai</g-link>
            </div>

            <div class="grid">
                <article
                    v-for="{ node } in articles"
                    :key="node.slug.current"
                    class="bg-white-300 shadow flex flex-col rounded"
                >
                    <time
                        :datatime="node._createdAt"
                        :title="new Date(node._createdAt).toLocaleString('lt')"
                        class="bg-white p-2 text-right"
                    >
                        {{ relativeTime(node._createdAt) }}
                    </time>
                    <g-link
                        :to="node.slug.current"
                        class="p-2 text-xl break-words h-full"
                    >
                        {{ node.title }}
                    </g-link>
                    <p class="p-2 border-t text-sm">
                        {{ node.categories.map(cat => cat.title).join(', ') }}
                    </p>
                </article>
            </div>
        </section>

        <section>
            <div class="border-b py-1 my-4 flex justify-between items-end">
                <h2 class="text-3xl">Egzaminai</h2>
                <g-link to="/egzaminai">Visi egzaminai</g-link>
            </div>

            <div class="flex">
                <div class="w-1/2">
                    <img src="/exams.svg" alt="" />
                </div>

                <div class="grid">
                    <exam-card
                        v-for="{ node } in $page.exams.edges"
                        :exam="node"
                        :key="node._id"
                    ></exam-card>
                </div>
            </div>
        </section>
    </Layout>
</template>

<script>
    import nobelioPremija from '@/components/NobelioPremija';
    import examCard from '@/components/ExamCard';
    export default {
        name: 'titulinis',
        metaInfo: {
            titleTemplate: '%s',
        },
        computed: {
            articles() {
                const ls = localStorage.getItem('topArticles');

                if (ls) {
                    return JSON.parse(ls);
                }

                const articles = this.$page.articles.edges;
                localStorage.setItem('topArticles', JSON.stringify(articles));

                return articles;
            },
        },
        components: {
            nobelioPremija,
            examCard,
        },
    };
</script>

<page-query>
    query latestContent {
        articles: allSanityArticle(limit: 5, sortBy: "_createdAt") {
            edges {
                node {
                    title
                    slug {
                        current
                    }
                    _createdAt
                    categories {
                        title
                    }
                }
            }
        }
        exams: allSanityExam(limit: 3, sortBy: "year") {
            edges {
                node {
                    _id
                    year(format: "YYYY")
                    level
                    session
                    answers {
                        asset {
                            url
                        }
                    }
                    questions {
                        asset {
                            url
                        }
                    }
                    notes
                }
            }
        }
    }
</page-query>
