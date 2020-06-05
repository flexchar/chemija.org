<template>
    <div class="flex flex-col h-full">
        <header
            class="py-4 border-b mb-6 bg-white"
            :class="{ 'md:sticky top-0 z-20': stickyHeader }"
        >
            <div class="container flex items-center justify-between">
                <a href="/" class="md:w-1/4 w-1/3">
                    <img
                        class="banner"
                        src="/banner.png"
                        :alt="$static.meta.siteDescription"
                        :title="$static.meta.siteSlogan"
                    />
                </a>
                <nav class="nav">
                    <g-link class="nav__link" to="/egzaminai">Egzaminai</g-link>
                    <g-link class="nav__link" to="/straipsniai">
                        Straipsniai
                    </g-link>
                </nav>
            </div>
        </header>

        <section class="container flex-1" :class="containerClass">
            <slot />
        </section>

        <footer class="border-t py-10 mt-5">
            <div class="container flex justify-between">
                <p>
                    ©
                    <time
                        :datetime="new Date().toISOString()"
                        :title="`Atnaujinta ${new Date().toLocaleString('lt')}`"
                    >
                        {{ new Date().getFullYear() }}
                    </time>
                    Chemija.org
                </p>
                <a href="https://github.com/flexchar/" target="_blank">
                    Lukas Vanagas 🍦
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        props: {
            containerClass: {
                type: String,
                default: null,
            },
            stickyHeader: {
                type: Boolean,
                default: true,
            },
        },
    };
</script>

<static-query>
    query {
        meta: metadata {
            siteName
            siteDescription
            siteSlogan
        }
    }
</static-query>

<style lang="scss">
    html,
    body {
        height: 100%;
    }
    body {
        font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
            Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.5;

        margin: 0;
        padding: 0;

        background-color: whitesmoke;
    }
    .banner {
        filter: contrast(0);
    }

    .nav__link {
        margin-left: 20px;

        text-decoration: none;

        &:hover {
            color: steelblue;
        }
    }
</style>
