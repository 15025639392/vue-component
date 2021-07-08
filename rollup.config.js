import fs from 'fs';
import path from 'path';
import {terser} from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import json from '@rollup/plugin-json';
// import postcss from 'rollup-plugin-postcss';
import {nodeResolve} from '@rollup/plugin-node-resolve';
const isDev = process.env.NODE_ENV!=='production';
const plugins=[
    vue({
      css:true,//单文件组件的样式插入到html的style标签
      complieTemplate:true //把组件转换成render函数
    }),
  	json(),
  	nodeResolve(),
  	// postcss({
    //   //把css插入到 style 中
    //   // inject:true
    //   // 把css放到js同一目录
    //   extract:true
    // }),
 ]
isDev||plugins.push(terser({
  output:{
    comments:false
  }
}))
const root = path.resolve(__dirname,'packages')
const packages = fs.readdirSync(root)

const config = packages
  .filter((item)=>fs.statSync(path.resolve(root,item)).isDirectory())
	.map(item=>{
  	const pkg = require(path.resolve(root,item,'package.json'))
  	return {
      input:path.resolve(root,item,'index.js'),
      output:[
        {
          exports:'auto',
          file:path.resolve(root,item,pkg.main),
          format:'cjs'
        },
        {
          exports:'auto',
          file:path.resolve(root,item,pkg.module),
          format:'es'
        }
      ],
      plugins
    }
	})
module.exports=config