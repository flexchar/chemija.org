<template>
    <section>
        <label class="block mb-4">
            <span class="block">Farenheito, °F</span>
            <input
                type="number"
                step="0.0001"
                class="p-2 border w-full"
                @keyup.enter="calculate"
                v-model="degrees.fahrenheit"
            />
        </label>
        <label class="block mb-4">
            <span class="block">Celsijaus, °C</span>
            <input
                type="number"
                step="0.0001"
                class="p-2 border w-full"
                @keyup.enter="calculate"
                v-model="degrees.celsius"
            />
        </label>
        <label class="block mb-4">
            <span class="block">Kelvino, K</span>
            <input
                type="number"
                step="0.0001"
                class="p-2 border w-full"
                @keyup.enter="calculate"
                v-model="degrees.kelvin"
            />
        </label>

        <button
            class="px-4 py-2 bg-green-500 text-white mt-4 mr-4"
            :class="{
                'bg-green-800 cursor-not-allowed': isEmpty,
                'hover:bg-green-400': !isEmpty,
            }"
            @click="calculate"
            :disabled="isEmpty"
        >
            Skaičiuoti
        </button>
        <button class="px-4 hover:text-gray-800 mt-4" @click="resetDegrees">
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
                return Object.values(this.degrees).filter(Boolean).length === 0;
            },
        },
        methods: {
            resetDegrees() {
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
