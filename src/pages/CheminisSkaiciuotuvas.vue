<template>
    <layout>
        <section>
            <h2 class="text-2xl pb-8">Cheminis skaičiuotuvas</h2>

            <!-- Temperature converter -->
            <section class="flex flex-col md:flex-row mb-8">
                <div class="w-full md:w-1/3 mr-4 mb-8">
                    <h2 class="pb-4">
                        Temperatūros konvertavimas
                    </h2>
                    <p class="text-sm font-light">
                        Rašykite tik į vieną laukelį
                    </p>
                </div>
                <div class="w-full md:w-2/3">
                    <temperature-converter />
                </div>
            </section>

            <hr class="my-8" />

            <!--  Chemical equation balancer  -->
            <section class="flex flex-col md:flex-row mb-8">
                <div class="w-full md:w-1/3 mr-4 mb-8">
                    <h2 class="pb-4">
                        Reakcijų lygintuvas
                    </h2>
                    <p class="text-sm mb-2 font-light">
                        Chemijos reackijos lygčių lyginimas
                    </p>
                    <p class="text-sm font-light">
                        Elektronai rašomi su ^ ženklu,
                        <br />
                        Na^+ yra tas pats kas Na
                        <sup>+</sup>
                    </p>
                </div>
                <div class="w-full md:w-2/3">
                    <balancer />
                </div>
            </section>

            <hr class="my-8" />

            <!--  Concentration calculator  -->
            <section class="flex flex-col md:flex-row mb-8">
                <div class="w-full md:w-1/3 mr-4 mb-8">
                    <h2 class="pb-4">
                        Molinės koncentracijos skaičiavimas
                    </h2>
                    <p class="font-light Atext-sm mb-2">
                        Pagal lygtį:
                        <span>
                            <abbr title="tirpalo koncentracija, mol/l">
                                c(A)
                            </abbr>
                            =
                            <abbr title="ištirpusios medžiagos kiekis, mol">
                                n (A)
                            </abbr>
                            :
                            <abbr title="tirpalo tūris, l arba dm^3">V</abbr>
                        </span>
                        ,
                        <br />
                        A - ištirpusi medžiaga
                    </p>
                    <p class="text-sm font-light">
                        Įvesti du žinomus skaičius
                    </p>
                </div>
                <div class="w-full md:w-2/3">
                    <concentration-calculator />
                </div>
            </section>
        </section>
    </layout>
</template>

<script>
    import Balancer from '@/components/math/ChemicalBalancer';
    import TemperatureConverter from '@/components/math/TemperatureConverter';
    import ConcentrationCalculator from '@/components/math/ConcentrationCalculator';
    export default {
        name: 'cheminis-skaiciuotuvas',
        metaInfo: {
            title: 'Cheminis skaičiuotuvas',
            meta: [
                {
                    key: 'description',
                    name: 'description',
                    content:
                        'Su šiuo cheminiu skaičiuokliu tu gali išlyginti chemijos lygtis, išspręsti kvadratines lygtis, konvertuoti temperatūrą, išvesti empirinę formulę, apskaičiuoti molinę koncentraciją, apskaičiuoti ašies kreives',
                },
                {
                    key: 'keywords',
                    name: 'keywords',
                    content: [
                        'kvadratinių lygčių skaičiuotuvas',
                        'empirinės formulės išvedimas',
                        'temperatūros konvertavimas',
                        'molinė koncentracija',
                        'reakcijų lygintuvas',
                    ].join(', '),
                },
            ],
        },
        components: {
            Balancer,
            TemperatureConverter,
            ConcentrationCalculator,
        },
    };
</script>

<style></style>
