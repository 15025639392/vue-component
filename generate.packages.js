const fs =  require('fs')
const path =  require('path')
const root = path.resolve(__dirname,'packages')
const packages = fs.readdirSync(root)
const configs = packages
  .filter((item)=>fs.statSync(path.resolve(root,item)).isDirectory()).map(item=>{
      const firstWord = item.slice(0,1).toUpperCase()
      const restWord = item.slice(1).toLowerCase()
      const name = firstWord+restWord
      return `export * from './${item}'`
  }).join('\n')

  fs.writeFileSync(path.resolve(root,'index.js'),configs)