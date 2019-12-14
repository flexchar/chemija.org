<script>
    import ExamCard from '@/components/ExamCard';
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
            ],
        },
        computed: {
            examsCached() {
                const EXAM_CACHE_KEY = 'exams';
                const ls = localStorage.getItem(EXAM_CACHE_KEY);

                if (ls) {
                    return JSON.parse(ls);
                }

                const { edges } = this.$page.exams;
                localStorage.setItem(EXAM_CACHE_KEY, JSON.stringify(edges));

                return edges;
            },
            exams() {
                return this.examsCached.map(
                    ({
                        node: {
                            _id,
                            year,
                            level,
                            session,
                            answers,
                            questions,
                            notes,
                        },
                    }) => {
                        return {
                            _id,
                            year,
                            level,
                            session,
                            notes,
                            questions: questions.asset.url,
                            answers: answers && answers.asset && answers.asset.url,
                        };
                    }
                );
            },
        },
        render(h) {
            return (
                <Layout>
                    <div class="grid" style="--css-grid-minmax: 300px">
                        {this.exams.map(exam => (
                            <ExamCard exam={exam} />
                        ))}
                    </div>
                </Layout>
            );
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
                notes
            }
        }
    }
}
</page-query>
