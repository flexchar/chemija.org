<template>
    <Layout>
        <header class="px-2 sm:px-0">
            <h1 class="text-4xl text-gray-800">
                Chemijos egzaminai
            </h1>
            <p>
                Chemijos valstybinių bei mokyklinių egzaminų užduočių ir
                atsakymų archyvas. Egzaminai su atsakymais nuo 1996 metų.
            </p>
            <div class="flex items-center">
                <span class="flex-1 hidden md:inline"></span>

                <label class="py-4 mr-2">
                    <input
                        type="radio"
                        :value="true"
                        v-model="download"
                        class="w-5 h-5 mr-1 align-middle"
                    />
                    <span class="align-middle">Siųstis failus</span>
                </label>
                <label class="py-4">
                    <input
                        type="radio"
                        :value="false"
                        v-model="download"
                        class="w-5 h-5 mr-1 align-middle"
                    />
                    <span class="align-middle">Žiūrėti naršyklėje</span>
                </label>
            </div>
        </header>

        <table class="table-auto w-full bg-white shadow">
            <thead class="text-white tracking-wide text-left">
                <tr class="bg-green-600">
                    <th class="px-2 md:px-6 py-4 font-semibold">Metai</th>
                    <th class="px-2 md:px-6 py-4 font-semibold">Tipas</th>
                    <th class="px-2 md:px-6 py-4 font-semibold">Sesija</th>
                    <th class="px-2 md:px-6 py-4 font-semibold">Užduotys</th>
                    <th class="px-2 md:px-6 py-4 font-semibold">Atsakymai</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="exam in exams"
                    :key="exam._id"
                    class="hover:bg-gray-200 border-b"
                >
                    <td class="px-2 md:px-6 py-4">{{ exam.year }}</td>
                    <td class="px-2 md:px-6 py-4">{{ exam.level }}</td>
                    <td class="px-2 md:px-6 py-4">
                        {{ exam.session.split(' ')[0] }}
                    </td>
                    <td class="px-2 md:px-6 py-4">
                        <a
                            class="hover:text-green-600 font-semibold block"
                            :href="
                                !download
                                    ? exam.questions
                                    : getDonwloadLink(exam)
                            "
                            target="_blank"
                        >
                            Užduotys
                        </a>
                    </td>
                    <td class="px-2 md:px-6 py-4">
                        <a
                            v-if="exam.answers"
                            class="hover:text-green-600 font-semibold block"
                            :href="
                                !download
                                    ? exam.answers
                                    : getDonwloadLink(exam, 1)
                            "
                            target="_blank"
                        >
                            Atsakymai
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </Layout>
</template>

<script>
    import computeExams from '@/helpers/computeExams';
    export default {
        name: 'Egzaminai',
        metaInfo: {
            title: 'Chemijos egzaminų užduotys',
            meta: [
                {
                    key: 'description',
                    name: 'description',
                    content:
                        'Chemijos valstybinių bei mokyklinių egzaminų užduočių ir atsakymų archyvas. Egzaminai su atsakymais nuo 1996 metų.',
                },
                {
                    key: 'keywords',
                    name: 'keywords',
                    content: [
                        'chemijos',
                        'valstybiniai',
                        'mokykliniai',
                        'brandos',
                        'egzaminai',
                        'testai',
                    ].join(', '),
                },
            ],
        },
        data() {
            return {
                download: false,
            };
        },
        computed: {
            exams() {
                return computeExams(this.$page.exams.edges);
            },
        },
        methods: {
            getDonwloadLink(exam, isAnswers = false) {
                const name = `${exam.year} chemijos ${exam.level} egzaminas ${
                    exam.session
                } - ${isAnswers ? 'atsakymai' : 'užduotys'}`;

                const url = !isAnswers ? exam.questions : exam.answers;

                return url + '?dl=' + name.toLowerCase();
            },
        },
    };
</script>

<page-query>
    query getExams {
        exams: allSanityExam(order: DESC, sortBy: "year") {
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
                }
            }
        }
    }
</page-query>
