<template>
    <div class="flex flex-col h-full">
        <header class="py-4 border-b mb-6">
            <div class="container flex items-center justify-between">
                <a href="/" class="md:w-1/4 w-1/3">
                    <img
                        class="banner"
                        src="/banner.png"
                        :alt="$static.metadata.siteName"
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

        <section class="container flex-1">
            <slot />
        </section>

        <footer class="border-t py-10 mt-5">
            <div class="container flex justify-between">
                <p>© 2019 Chemija.org</p>
                <p>Lukas Vanagas 🍦</p>
            </div>
        </footer>
    </div>
</template>

<static-query>
query {
    metadata {
        siteName
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
