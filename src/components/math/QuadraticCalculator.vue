<template>
    <div>
        <div class="">
            <div class="relative mb-4 w-full text-gray-700">
                <label
                    class="absolute left-0 top-0 px-4 py-2 font-bold leading-relaxed"
                >
                    A
                </label>
                <input
                    class="w-full pl-12 p-2 border focus:border-gray-800"
                    type="number"
                    step="0.0001"
                    v-model.number="formula.a"
                    placeholder="a"
                    @keyup.enter="calculate"
                />
                <p v-if="formula.a === 0" class="w-full text-red-600">
                    Ši kreivė nėra kvadratinė. Įveskite reikšmę, kuri nėra
                    nulis.
                </p>
            </div>
            <div class="relative mb-4 w-full text-gray-700">
                <label
                    class="absolute left-0 px-4 py-2 font-bold leading-relaxed"
                >
                    B
                </label>
                <input
                    class="w-full pl-12 p-2 border focus:border-gray-800"
                    type="number"
                    step="0.0001"
                    v-model.number="formula.b"
                    placeholder="b"
                    @keyup.enter="calculate"
                />
            </div>
            <div class="relative mb-4 w-full text-gray-700">
                <label
                    class="absolute left-0 px-4 py-2 font-bold leading-relaxed"
                >
                    C
                </label>
                <input
                    class="w-full pl-12 p-2 border focus:border-gray-800"
                    type="number"
                    step="0.0001"
                    v-model.number="formula.c"
                    placeholder="c"
                    @keyup.enter="calculate"
                />
            </div>
        </div>

        <dl>
            <dt>
                Lygtis
                <span v-html="equation"></span>
            </dt>

            <dd>Diskriminantas: {{ discriminant }}</dd>
            <dd class="mb-4">Diskriminanto šaknis: {{ discriminantRoot }}</dd>

            <!-- <dd class="mb-4">
                x
                <sub>1</sub>
                = {{ x1 }}, x
                <sub>2</sub>
                = {{ x2 }}
            </dd> -->

            <dd class="mb-4">{{ results.answer1 }}</dd>

            <dd class="mb-4" v-if="results.answer2">
                Plotas, kurį riboja kreivė virš x ašies, yra
                {{ results.answer2 }} kvadratiniai vienetai.
            </dd>

            <dd class="mb-4" v-if="results.answer3">
                Kreivės nuolydis bet kuriame taške yra: {{ results.answer3 }}
            </dd>

            <dd class="mb-4" v-if="results.answer4">
                {{ results.answer4 }} kreivės vertė pasireiškia ties
                koordinatėmis {{ results.answer5 }}
            </dd>
        </dl>

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
    /**
     * Round to two decimals
     */
    function round(num) {
        return parseFloat(Math.round(num * 100) / 100);
    }

    // Original adapted from code sourced from
    // https://www.javascriptkit.com/script/cut42.shtml
    export default {
        name: 'quadratic-calculator',
        data() {
            return {
                formula: {
                    a: null,
                    b: null,
                    c: null,
                },
                results: {
                    answer1: null,
                    answer2: null,
                    answer3: null,
                    answer4: null,
                    answer5: null,
                },
            };
        },
        computed: {
            equation() {
                const { a, b, c } = this.formula;
                return `${a || 'a'}x<sup>2</sup> + ${b || 'b'}x + ${
                    c || 'c'
                } = 0`;
            },
            discriminant() {
                const { a, b, c } = this.formula;
                return b * b - 4 * a * c;
            },
            discriminantRoot() {
                return Math.sqrt(this.discriminant);
            },
            x1() {
                const { a, b, c } = this.formula;
                return (-b + this.discriminantRoot) / (2 * a);
            },
            x2() {
                const { a, b, c } = this.formula;
                return (-b - this.discriminantRoot) / (2 * a);
            },
            // Ready when all values are present
            isReady() {
                return (
                    Object.values(this.formula).filter(e => parseFloat(e) === e)
                        .length === 3
                );
            },
        },
        methods: {
            reset() {
                this.formula = {
                    a: null,
                    b: null,
                    c: null,
                };
                this.results = {
                    answer1: null,
                    answer2: null,
                    answer3: null,
                    answer4: null,
                    answer5: null,
                };
            },
            calculate() {
                const valA = this.formula.a;
                const valB = this.formula.b;
                const valC = this.formula.c;
                const disc = this.discriminant;
                const r_disc = this.discriminantRoot;
                let { x1, x2 } = this;

                const ing1 =
                    (valA * x1 * x1 * x1) / 3 +
                    (valB * x1 * x1) / 2 +
                    valC * x1;
                const ing2 =
                    (valA * x2 * x2 * x2) / 3 +
                    (valB * x2 * x2) / 2 +
                    valC * x2;
                let inte = ing1 - ing2;
                let sec_dx = -valB / (2 * valA);
                let sec_dy = valA * sec_dx * sec_dx + valB * sec_dx + 1 * valC;
                inte = round(inte * 100) / 100;
                x1 = round(x1 * 100) / 100;
                x2 = round(x2 * 100) / 100;
                sec_dx = round(sec_dx * 100) / 100;
                sec_dy = round(sec_dy * 100) / 100;

                if (disc > 0) {
                    this.results.answer1 = `Kreivė kerta x ašį ties ${x1} ir ${x2}`;
                    if (inte > 0) {
                        this.results.answer2 = inte;
                    } else if (inte < 0) {
                        this.results.answer2 = -inte;
                    } else if (inte === 0) {
                        this.results.answer2 = 0;
                    }
                }
                if (disc < 0) {
                    this.results.answer1 =
                        'Kreivė neturi šaknų, nes ji nekerta x ašies.';
                    this.results.answer2 = 'N/A';
                }
                if (disc === 0) {
                    this.results.answer1 = `Kreivė liečia x ašį ties ${x1}`;
                    this.results.answer2 = 'N/A';
                }

                this.results.answer3 = 2 * valA + 'x+' + valB;

                let e_val;
                if (valA < 0) {
                    e_val = 'Didžiausia';
                } else if (valA > 0) {
                    e_val = 'Mažiausia';
                }

                this.results.answer4 = e_val;
                this.results.answer5 = sec_dx + ', ' + sec_dy;
            },
        },
    };
</script>
