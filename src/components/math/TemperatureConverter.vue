<template>
    <section>
        <label class="block mb-4 text-gray-700">
            Farenheito, °F
            <input
                type="number"
                step="0.0001"
                class="p-2 border w-full focus:border-gray-500"
                @keyup.enter="calculate"
                v-model.number="degrees.fahrenheit"
            />
        </label>
        <label class="block mb-4 text-gray-700">
            Celsijaus, °C
            <input
                type="number"
                step="0.0001"
                class="p-2 border w-full focus:border-gray-500"
                @keyup.enter="calculate"
                v-model.number="degrees.celsius"
            />
        </label>
        <label class="block mb-4 text-gray-700">
            Kelvino, K
            <input
                type="number"
                step="0.0001"
                class="p-2 border w-full focus:border-gray-500"
                @keyup.enter="calculate"
                v-model.number="degrees.kelvin"
            />
        </label>

        <button
            class="mt-4 mr-4 py-2 px-4 rounded bg-white border border-gray-400 text-gray-700"
            :class="{
                'opacity-50 cursor-not-allowed': isEmpty,
                'hover:border-gray-600': !isEmpty,
            }"
            @click="calculate"
            :disabled="isEmpty"
        >
            Skaičiuoti
        </button>
        <button class="px-4 py-2 hover:text-gray-600 mt-4" @click="reset">
            Išvalyti
        </button>
    </section>
</template>

<script>
    export default {
        name: 'temperature-converter',
        data() {
            return {
                degrees: {
                    fahrenheit: null,
                    celsius: null,
                    kelvin: null,
                },
            };
        },
        computed: {
            isEmpty() {
                return (
                    Object.values(this.degrees).filter(val => val !== null)
                        .length === 0
                );
            },
        },
        methods: {
            reset() {
                this.degrees = {
                    fahrenheit: null,
                    celsius: null,
                    kelvin: null,
                };
            },
            calculate() {
                const [type, value] = Object.entries(this.degrees).find(
                    ([type, val]) => !isNaN(parseFloat(val))
                );
                const kelvin = this.calculateKelvin(value, type);
                const temp = this.calculateTemperature(kelvin);
                this.degrees = temp;
            },
            // Get kelvins from whichever source
            calculateKelvin(value, type) {
                const num = parseFloat(value);
                switch (type) {
                    case 'fahrenheit':
                        return ((num - 32) * 5) / 9 + 273.15;
                        break;
                    case 'celsius':
                        return num + 273.15;
                        break;
                    case 'kelvin':
                        return num;
                        break;
                }
            },
            // Calculate others from kelvins
            calculateTemperature(kelvin) {
                return {
                    fahrenheit: +(((kelvin - 273.15) * 9) / 5 + 32).toFixed(4),
                    celsius: +(kelvin - 273.15).toFixed(4),
                    kelvin: +kelvin.toFixed(4),
                };
            },
        },
    };
</script>

<style></style>
