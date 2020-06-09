<template>
    <portable-text
        :blocks="blocks"
        :serializers="serializers"
        :projectId="$static.metadata.sanityOptions.projectId"
        :dataset="$static.metadata.sanityOptions.dataset"
    />
</template>

<script>
    import PortableText from 'sanity-blocks-vue-component';

    export default {
        props: {
            blocks: Array,
        },
        components: {
            PortableText,
        },
        data() {
            return {
                serializers: {
                    types: {
                        mainImage: ({ node }) => (
                            <figure>
                                <img
                                    src={this.$urlForImage(
                                        node,
                                        this.$static.metadata.sanityOptions
                                    )
                                        .auto('format')
                                        .url()}
                                    alt={node.alt}
                                />
                                <figcaption>{node.caption}</figcaption>
                            </figure>
                        ),
                        youtube: ({ node }) => {
                            const { url } = node;

                            const id = (url.split('watch?v=')[1] || '').split(
                                '&'
                            )[0];

                            return (
                                <div class="videoWrapper">
                                    <iframe
                                        class={'py-4'}
                                        type="text/html"
                                        src={`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`}
                                        allowfullscreen
                                        frameborder="0"></iframe>
                                </div>
                            );
                        },
                    },

                    marks: {
                        sub: node => <sub>{node.children}</sub>,
                        sup: node => <sup>{node.children}</sup>,
                    },
                },
            };
        },
    };
</script>

<static-query>
    {
        metadata {
            sanityOptions {
                projectId
                dataset
            }
        }
    }
</static-query>
