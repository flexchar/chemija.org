<template>
    <div @keyup.enter="calculate">
        <label class="block mb-4 text-gray-700">
            Atomų molių skaičius (n)
            <input
                class="w-full border p-2 focus:border-gray-500"
                type="number"
                step="0.0001"
                v-model.number="formula.n"
                placeholder="n, (mol)"
            />
        </label>
        <label class="block mb-4 text-gray-700">
            Elemento masė (m)
            <input
                class="w-full border p-2 focus:border-gray-500"
                type="number"
                step="0.0001"
                v-model.number="formula.m"
                placeholder="m, (g)"
            />
        </label>
        <label class="block mb-4 text-gray-700">
            Santykinė atominė masė (M)
            <input
                class="w-full border p-2 focus:border-gray-500"
                type="number"
                step="0.0001"
                v-model.number="formula.M"
                placeholder="M, (g/mol)"
            />
        </label>

        <button
            class="mt-4 mr-4 py-2 px-4 rounded bg-white border border-gray-400 text-gray-700"
            :class="{
                'opacity-50 cursor-not-allowed': !isReady,
                'hover:border-gray-600': isReady,
            }"
            @click="calculate"
            :disabled="!isReady"
        >
            Skaičiuoti
        </button>
        <button class="px-4 py-2 hover:text-gray-600 mt-4" @click="reset">
            Išvalyti
        </button>
    </div>
</template>

<script>
    export default {
        name: 'molar-mass-calculator',
        data() {
            return {
                formula: {
                    n: null,
                    m: null,
                    M: null,
                },
            };
        },
        computed: {
            // Ready when two values are present and they are numbers
            isReady() {
                return (
                    Object.values(this.formula).filter(e => parseFloat(e) === e)
                        .length === 2
                );
            },
        },
        methods: {
            reset() {
                this.formula = {
                    n: null,
                    m: null,
                    M: null,
                };
            },
            calculate() {
                const result = Object.entries(this.formula).find(
                    ([, val]) => val === null || val === ''
                );
                if (!result) {
                    return;
                }
                const [missing = null] = result;

                const { n, m, M } = this.formula;

                let answer;
                switch (missing) {
                    case 'n':
                        answer = m / M;
                        break;
                    case 'm':
                        answer = n * M;
                        break;
                    case 'M':
                        answer = n / m;
                        break;
                }

                this.formula[missing] = answer;
            },
        },
    };
</script>
