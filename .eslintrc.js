module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript',
    ],
    parserOptions: {
        project: './tsconfig.json'
    },

    rules: {
        '@typescript-eslint/indent': ['error', 4],
        'padded-blocks': 'off',
        'yoda': ['warn', 'always']
    }
}
