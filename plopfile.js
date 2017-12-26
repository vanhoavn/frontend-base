let validatorNotEmpty = (name) => (value) => value.length ? true : `${name} is required`;

module.exports = function(plop) {

    plop.handlebars.registerHelper("x", function(expression, options) {
        var result;
        var context = this;
        with(context) {
            result = (function() {
                try {
                    return eval(expression);
                } catch (e) {
                    console.warn('•Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
                }
            }).call(context);
        }
        return result;
    });

    plop.handlebars.registerHelper("xif", function(expression, options) {
        return plop.handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
    });

    plop.addHelper('vueExtensionForType', function(type) {
        return type == 'tsx' ? 'vuex' : 'vue';
    });

    function extractNameAndFolder(data) {
        let { name } = data;
        if (name.indexOf('/') !== false) {
            let [last_name, ...parts] = name.split(/\//g).reverse();
            data.folder = parts.reverse().join('/');
            data.name = last_name;
        }
    }

    plop.setGenerator('vue', {
        description: 'Create new vue component',
        prompts: [{
                type: 'input',
                name: 'name',
                message: 'Component name:',
                validate: validatorNotEmpty("Component name"),
            },
            {
                type: 'list',
                name: 'lang',
                default: 'ts',
                choices: [
                    { value: 'ts', name: 'TypeScript' },
                    { value: 'tsx', name: 'TypeScript with JSX support' },
                    { value: '', name: 'Javascript' },
                ],
                message: 'Component language:',
            },
            {
                type: 'input',
                name: 'folder',
                message: 'Component path:',
                validate: validatorNotEmpty("Component path"),
            },
        ],
        actions: [{
            type: 'add',
            path: 'src/app/{{folder}}/{{pascalCase name}}.{{vueExtensionForType lang}}',
            templateFile: 'templates/component.vue',
        }, ]
    });
    plop.setGenerator('vue-tsx', {
        description: 'Create new vue component in tsx',
        prompts: [{
                type: 'input',
                name: 'name',
                message: 'Component name:',
                validate: validatorNotEmpty("Component name"),
            },
            {
                type: 'input',
                name: 'folder',
                message: 'Component path:',
                validate: validatorNotEmpty("Component path"),
            },
        ],
        actions: [{
            type: 'add',
            path: 'src/app/{{folder}}/{{pascalCase name}}.tsx',
            templateFile: 'templates/vue-component.tsx',
        }, ]
    });
    plop.setGenerator('vue-functional', {
        description: 'Create new vue component',
        prompts: [{
                type: 'input',
                name: 'name',
                message: 'Component name:',
                validate: validatorNotEmpty("Component name"),
            },
            {
                type: 'input',
                name: 'folder',
                message: 'Component path:',
                validate: validatorNotEmpty("Component path"),
            },
        ],
        actions: [{
            type: 'add',
            path: 'src/app/{{folder}}/{{pascalCase name}}.tsx',
            templateFile: 'templates/vue-functional-component.tsx',
        }, ]
    });
    plop.setGenerator('vue-directive', {
        description: 'Create new vue directive',
        prompts: [{
                type: 'input',
                name: 'name',
                message: 'Directive name:',
                validate: validatorNotEmpty("Directive name"),
            },
            {
                type: 'input',
                name: 'folder',
                message: 'Directive path:',
                validate: validatorNotEmpty("Directive path"),
            },
        ],
        actions: [{
            type: 'add',
            path: 'src/app/{{folder}}/{{pascalCase name}}.ts',
            templateFile: 'templates/vue-directive.ts',
        }, ]
    });
};