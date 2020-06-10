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
                    <p class="text-sm">Rašykite tik į vieną laukelį</p>
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
                    <p class="text-sm mb-2">
                        Chemijos reackijos lygčių lyginimas
                    </p>
                    <p class="text-sm">
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
        </section>
    </layout>
</template>

<script>
    import Balancer from '@/components/math/ChemicalBalancer';
    import TemperatureConverter from '@/components/math/TemperatureConverter';
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
        },
    };
</script>

<style></style>
