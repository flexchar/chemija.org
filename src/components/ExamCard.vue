<template>
    <div class="Aborder-t-8 rounded bg-white p-2">
        <div
            class="bg-white text-center -m-2 py-1 font-bold"
            :class="getRandomBorder()"
        >
            {{ exam.year }}
        </div>
        <div class="py-3">
            <p>
                metų chemijos
                <b>{{ exam.level.toLowerCase() }}</b>
                brandos egzaminas -
                {{ exam.session.toLowerCase() }}
            </p>
            <blockquote
                v-if="exam.notes"
                class="p-1 px-2 border-l-4 border-red-900 rounded bg-gray-200 flex"
            >
                <em>{{ exam.notes }}</em>
            </blockquote>
        </div>

        <div class="flex justify-between">
            <a
                class="py-2 px-4 rounded bg-gray-200"
                :href="exam.questions"
                target="_blank"
            >
                Užduotys
            </a>
            <a
                v-if="exam.answers"
                class="py-2 px-4 rounded bg-gray-200"
                :href="exam.answers"
                target="_blank"
            >
                Atsakymai
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ExamCard',
        props: {
            exam: {
                type: Object,
                required: true,
            },
        },
        methods: {
            getRandomColor() {
                const colors = [
                    'black',
                    'white',
                    'gray',
                    // 'red',
                    // 'orange',
                    // 'yellow',
                    // 'green',
                    // 'teal',
                    // 'blue',
                    // 'indigo',
                    // 'purple',
                    // 'pink',
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            },
            getRandomLightness() {
                const lums = [300, 400, 500, 600, 700];
                return lums[Math.floor(Math.random() * lums.length)];
            },
            getRandomBorder() {
                return `bg-${this.getRandomColor()}-${this.getRandomLightness()}`;
            },
        },
    };
</script>