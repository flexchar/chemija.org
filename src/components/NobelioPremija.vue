<template>
    <section class="bg-white shadow">
        <h2 class="text-xl p-2 border-b">Nobelio premija</h2>
        <blockquote class="p-2">{{ premija }}</blockquote>
    </section>
</template>

<script>
    import premijos from '@/data/nobelioPremijos.json';

    export default {
        name: 'nobelio-premija',
        data() {
            return {
                premijos,
            };
        },
        computed: {
            premija() {
                return this.premijos[
                    Math.floor(Math.random() * this.premijos.length)
                ];
            },
        },
    };
</script>

<style lang="scss">
</style>