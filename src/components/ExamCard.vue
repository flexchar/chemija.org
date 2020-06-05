<template>
    <div class="bg-white p-2 border-t-8 rounded" :class="getRandomBorder()">
        <div class="py-3">
            <p>
                {{ exam.year }} metų chemijos
                <b>{{ exam.level.toLowerCase() }}</b>
                brandos egzaminas -
                {{ exam.session.toLowerCase() }}
            </p>
            <blockquote
                v-if="exam.notes"
                class="flex p-1 px-2 border-l-4 border-red-900 rounded bg-gray-200"
            >
                <em>{{ exam.notes }}</em>
            </blockquote>
        </div>

        <div class="flex">
            <a
                class="py-2 px-4 rounded bg-gray-200 hover:bg-gray-600 hover:text-white mr-2"
                :href="exam.questions"
                target="_blank"
            >
                Užduotys
            </a>
            <a
                v-if="exam.answers"
                class="py-2 px-4 rounded bg-gray-200 hover:bg-gray-600 hover:text-white"
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
                    // 'black',
                    // 'white',
                    'gray',
                    'red',
                    'orange',
                    'yellow',
                    'green',
                    'teal',
                    'blue',
                    'indigo',
                    'purple',
                    'pink',
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            },
            getRandomLightness() {
                const lums = [300, 400, 500, 600, 700];
                return lums[Math.floor(Math.random() * lums.length)];
            },
            getRandomBorder() {
                return `border-${this.getRandomColor()}-${this.getRandomLightness()}`;
            },
        },
    };
</script>
