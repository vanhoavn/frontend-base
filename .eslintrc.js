module.exports = {
    root: true,
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html',
    ],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': ["error", 4, { "SwitchCase": 1 }],
        'semi': ["error", "always"],
        'one-var': "off",
        'comma-dangle': "off",
        'space-before-function-paren': "off",
        'camelcase': ["error", { properties: "never" }],
        'no-useless-escape': "off",
        'no-mixed-operators': "off",
        'import/first': "off",
        'no-multiple-empty-lines': "off",
        'no-multi-spaces': "off",
        'import/no-webpack-loader-syntax': "off",
    },
    globals: {},
};