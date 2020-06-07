<template>
    <Layout>
        <!-- Welcome hero -->
        <section class="flex flex-col sm:flex-row justify-between py-16">
            <h1
                class="text-3xl font-light self-center text-center sm:text-left w-full sm:w-1/2 pb-20 sm:pb-0"
            >
                Chemijos bei kitų gamtos mokslų mėgėjų svetainė
            </h1>

            <div class="flex justify-center w-full sm:w-1/2">
                <img
                    src="/science.svg"
                    class="w-64"
                    alt="Woman scientist taking notes next to chemistry flasks"
                    title="Chemija tavo draugas"
                />
            </div>
        </section>

        <!-- Articles -->
        <section>
            <div class="border-b py-1 my-4 flex justify-between items-end">
                <h2 class="text-3xl">Straipsniai</h2>
                <g-link to="/straipsniai" class="hover:underline">
                    Visi straipsniai
                </g-link>
            </div>

            <article
                v-for="{ node } in $page.articles.edges"
                :key="node.path"
                class="flex flex-col md:flex-row justify-between pb-4 mb-6 sm:mb-10 md:mb-16"
            >
                <p class="text-gray-800 py-2 md:py-0 text-sm tracking-wide">
                    <time
                        :datatime="node._updatedAt"
                        :title="
                            'Atnaujinta ' +
                            new Date(node._updatedAt).toLocaleString('lt')
                        "
                    >
                        {{ new Date(node._updatedAt).toLocaleString('lt') }}
                    </time>
                </p>
                <div class="md:w-3/4">
                    <p class="text-gray-800 text-sm tracking-wide pb-2">
                        {{ node.categories.map(cat => cat.title).join(', ') }}
                    </p>

                    <g-link
                        :to="node.path"
                        class="text-2xl break-words hover:text-green-600 hover:underline"
                    >
                        {{ node.title }}
                    </g-link>
                </div>
            </article>
        </section>

        <!-- Exams -->
        <section>
            <div class="border-b py-1 my-4 flex justify-between items-end">
                <h2 class="text-3xl">Egzaminai</h2>
                <g-link to="/egzaminai" class="hover:underline">
                    Visi egzaminai
                </g-link>
            </div>

            <p class="mb-16">
                Didžiausias chemijos egzaminų archyvas padės tau
                <mark>PASIRUOŠTI EGZAMINUI</mark>
                ir gliaudyti užduotis it riešutus!
            </p>

            <div class="flex flex-col sm:flex-row pb-8">
                <div class="hidden sm:flex w-1/2 items-center">
                    <img
                        src="/exams.svg"
                        alt="Students writting an exam"
                        title="Pasiruošk egzaminams"
                        class="px-10 lg:px-16 xl:px-32"
                    />
                </div>

                <div class="w-full sm:w-1/2">
                    <exam-card
                        v-for="exam in exams"
                        :exam="exam"
                        :key="exam._id"
                        class="mb-8"
                    ></exam-card>
                </div>
            </div>
        </section>
    </Layout>
</template>

<script>
    import nobelioPremija from '@/components/NobelioPremija';
    import computeExams from '@/helpers/computeExams';
    import examCard from '@/components/ExamCard';
    export default {
        name: 'titulinis',
        metaInfo: {
            titleTemplate: '%s',
        },
        computed: {
            articles() {
                return this.$page.articles.edges;
            },
            exams() {
                return computeExams(this.$page.exams.edges);
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
                    path
                    _updatedAt
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
