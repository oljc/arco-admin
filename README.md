<h1 align="center">Arco Admin</h1>

<p align="center">一款开箱即用、功能丰富的中后台管理系统框架，最新技术栈的标准化规范项目。</p> 
<br/>
<p align="center">
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatibility"></a>
  <img alt="License" src="https://img.shields.io/github/license/LIjiAngChen8/arco-admin">
  <img src="https://img.shields.io/github/last-commit/LIjiAngChen8/arco-admin.svg" alt="node compatibility">
  <img alt="Version" src="https://img.shields.io/github/package-json/v/LIjiAngChen8/arco-admin/main">
</p>

*<p align="center">📌项目还在快速开发中敬请期待，目前可当启动模板使用👈🏻</p>*

## 特性
+ ⚡️ 新版极速响应的 [Vite 5](https://cn.vitejs.dev) 前端构建工具。
+ 👍🏻 [Vue 3](https://cn.vuejs.org) + 官方首推的 [Vue Router](https://router.vuejs.org/zh) + [Pinia](https://pinia.vuejs.org/zh)管理器。
+ 🔩 字节跳动出品的企业级设计生态 [ArcoDesign](https://arco.design/) 组件库。
+ 🎨 [Less](https://less.bootcss.com/) CSS 预处理器。
+ 📚 采用 [i18n](https://github.com/intlify/vue-i18n-next/tree/master/packages/vue-i18n#readme) + [i18n-ally](https://github.com/lokalise/i18n-ally) 实现更简单、规范的自动化国际化方案。
+ 🌐 基于 [Axios](https://axios-http.com/zh/) 封装了一些常用简单便捷的请求方法。
+ ⌨️ 内置多种业务场景页面、二次封装组件、框架支持配置轻松实现个性化定制。
+ 🧚🏻 项目已全面采用 `ESM` 标准的模块化语法，紧随现代前端开发领域的大统一趋势。
+ 📦 持续优化配置以跟进各个`依赖`、`Vite` 的更新、废弃、合并特性等，以实现最佳的打包优化效果。  

## 规范
提高代码质量、减少错误，并确保整个项目代码风格的一致性让你能够更轻松地管理代码质量和风格。

+ **代码规范：**  [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io) + [Prettier](https://prettier.io)<br/>
    *通过预先定义的规范来对代码语法、风格和格式的静态检查和规范来确保代码质量和可读性*

+ **提交规范：**  [Husky](https://typicode.github.io/husky/#/) + [Lint-Staged](https://github.com/okonet/lint-staged) + [Commitlint](https://commitlint.js.org)<br/>
  *提交代码时通过预设的代码风格检查、格式化和消息校验确保每次提交的代码质量和风格保持一致*

## 浏览器支持

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /><br/>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br/>Opera | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" /><br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Edge >=16| >= 31 | >= 49| >= 31| last 2 versions| >= 36 | last 2 versions

## 使用
1. 克隆此仓库
```bash
git clone https://github.com/LIjiAngChen8/arco-admin
```
2. 安装依赖
```bash
pnpm i
```
3. 运行
```bash
pnpm run dev
```

### VsCode 扩展推荐

| [<img src="https://vue.gallerycdn.vsassets.io/extensions/vue/volar/1.8.24/1701250883040/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) | [<img src="https://dbaeumer.gallerycdn.vsassets.io/extensions/dbaeumer/vscode-eslint/2.4.2/1687441427519/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |[<img src="https://esbenp.gallerycdn.vsassets.io/extensions/esbenp/prettier-vscode/10.1.0/1690819498575/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |[<img src="https://lokalise.gallerycdn.vsassets.io/extensions/lokalise/i18n-ally/2.12.0/1695476646920/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) |[<img src="https://stylelint.gallerycdn.vsassets.io/extensions/stylelint/vscode-stylelint/1.3.0/1698920117910/Microsoft.VisualStudio.Services.Icons.Default" width="25px" height="25px" /><br>Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)|[<img src="https://editorconfig.gallerycdn.vsassets.io/extensions/editorconfig/editorconfig/0.16.4/1607315835386/Microsoft.VisualStudio.Services.Icons.Default" width="25px" height="25px" /><br>EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)|[<img src="https://antfu.gallerycdn.vsassets.io/extensions/antfu/vite/0.2.5/1622972526798/Microsoft.VisualStudio.Services.Icons.Default" width="25px" height="25px" /><br>Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite)|
| --- | --- | --- | ---| --- | --- | --- |

## 贡献
欢迎任何形式的贡献，我们将会认真对待每一份参与。<br/><br/>

<a href="https://github.com/LIjiAngChen8/arco-admin/graphs/contributors"><img src="https://contrib.rocks/image?repo=LIjiAngChen8/arco-admin" />
</a><br/>

## Star 趋势图

[![趋势图](https://starchart.cc/LIjiAngChen8/arco-admin.svg)](https://starchart.cc/LIjiAngChen8/arco-admin)

# License
本项目遵循 [MIT 协议](./LICENSE)许可证。
