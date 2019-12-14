module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es6: true,
    },
    plugins: ['gridsome'],
    extends: ['prettier', 'plugin:gridsome/recommended'],
    rules: {
        'gridsome/format-query-block': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-expressions': [
            'error',
            {
                allowTernary: true,
                allowShortCircuit: true,
                allowTaggedTemplates: true,
            },
        ],
    },
};
