## 使用

### 初始化
```sh
git clone https://github.com/15025639392/vue-component.git
cd vue-component
git switch 封装ol
npm install -g @vue/cli-service-global
yarn install -W
```
### 构建/发布

- 发布暂时还未实现

```sh
yarn  plop <packageName>  // 创建包
yarn  build // 构建release
yarn  doc // 本地预览文档
yarn build:doc // 构建release文档
```
### 单功能开发

- eg: /packages/test/demos/test.vue
```sh
vue serve test.vue
```

### 测试

- 目录：eg:/packages/test/demos/_tests_
- 所有测试文件存放在 _tests_/*.js
- 在_tests_/*.js文件里面编写测试用例
- 注：测试用例一般用于 输入/输出 测试