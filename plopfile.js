
/**
 * 
 * @param {*} plop 
 * @type { import('./node_modules/plop/src/plop') }
 */

 module.exports = plop =>{
    plop.setGenerator('component',{
        discription:'create a vue component',
        prompts:[
            {
                type:'input',
                name:'name',
                message: 'component name',
                default: 'MyComponent'
            }
        ],
        actions:[
            {
                type:'add',
                path: 'packages/{{name}}/src/{{name}}.vue',
                templateFile: 'plop-template/component/src/component.hbs'
            },
            {
                type:'add',
                path: 'packages/{{name}}/_tests_/{{name}}.test.js',
                templateFile: 'plop-template/component/_tests_/component.test.hbs'
            },
            {
                type:'add',
                path: 'packages/{{name}}/stories/{{name}}.stories.js',
                templateFile: 'plop-template/component/stories/component.stories.hbs'
            },
            
            {
                type:'add',
                path: 'packages/{{name}}/index.js',
                templateFile: 'plop-template/component/index.hbs'
            },

            {
                type:'add',
                path: 'packages/{{name}}/README.md',
                templateFile: 'plop-template/component/README.hbs'
            },
            {
                type:'add',
                path: 'packages/{{name}}/LICENSE',
                templateFile: 'plop-template/component/LICENSE'
            },
            {
                type:'add',
                path: 'packages/{{name}}/package.json',
                templateFile: 'plop-template/component/package.hbs'
            }
        ]
    })
}