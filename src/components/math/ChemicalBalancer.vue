<template>
    <div>
        <label class="block mb-4">
            <input
                type="text"
                class="p-2 border w-full focus:border-gray-500"
                placeholder="Na + H2O2 = NaOH"
                v-model="equation"
                @keyup.enter="balance"
            />
        </label>

        <div class="px-2" v-html="result"></div>

        <div class="mt-4">
            <button
                class="mt-4 mr-4 py-2 px-4 rounded bg-white border border-gray-400 text-gray-700"
                :class="{
                    'opacity-50 cursor-not-allowed': !equation,
                    'hover:border-gray-600': equation,
                }"
                :disabled="!equation"
            >
                Lyginti
            </button>

            <button
                class="px-4 py-2 hover:text-gray-600 mt-4"
                @click="provideRandom"
            >
                Rodyti pavyzdį
            </button>

            <button
                class="px-4 py-2 hover:text-gray-600 mt-4"
                @click="equation = ''"
            >
                Išvalyti
            </button>
        </div>
    </div>
</template>

<script>
    // With all the respect and copyright, this is an adopted version from
    // https://www.nayuki.io/page/chemical-equation-balancer-javascript
    import { balance, getRandom } from '@/helpers/chemicalEquationBalancer';

    export default {
        name: 'balancer',
        data() {
            return {
                equation: '',
                result: '',
            };
        },
        methods: {
            balance() {
                this.result = balance(this.equation);
            },
            provideRandom() {
                this.equation = getRandom();
                this.balance();
            },
        },
    };
</script>

<style></style>
