module.exports = {
    purge: ['./src/**/*.vue'],
    theme: {
        extend: {
            container: {
                center: true,
                padding: '1rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
        },
    },
    variants: {},
    plugins: [],
};
