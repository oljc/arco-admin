<div align="center">

<a href="https://github.com/oljc/arco-admin">
  <img width="180" src="./docs/logo.svg" alt="Arco admin logo">
</a>

<h1>Arco Admin</h1>
<p>An out-of-the-box, feature-rich middle and back-office management system framework, standardized with the latest technology stack.</p>

English | [简体中文](./README.md)

[![Netlify Status](https://api.netlify.com/api/v1/badges/4177124c-546f-4726-a842-00b72bf864fa/deploy-status)](https://arco-admin.netlify.app)
<a href="https://nodejs.org/en/about/previous-releases" target="_blank"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatibility"></a>
<img alt="License" src="https://img.shields.io/github/license/oljc/arco-admin">
<img src="https://img.shields.io/github/last-commit/oljc/arco-admin.svg" alt="node compatibility">
<img alt="Version" src="https://img.shields.io/github/package-json/v/oljc/arco-admin/main">

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foljc%2Farco-admin&project-name=arco-admin&build-command=pnpm%20run%20build&install-command=pnpm%20i&output-directory=dist)
[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/oljc/arco-admin)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats/thumbnail.png?repo_id=725470717&image_size=auto&color_scheme=dark" width="655" height="auto">
  <img alt="oljc/arco-admin" src="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats/thumbnail.png?repo_id=725470717&image_size=auto&color_scheme=light" width="655" height="auto">
</picture>

</div>

## Features
+ ⚡️ New version built with [Vite 5](https://vitejs.dev) for lightning-fast response in frontend development.
+ 👍🏻 [Vue 3](https://vuejs.org) + officially recommended [Vue Router](https://router.vuejs.org) + [Pinia](https://pinia.vuejs.org) state manager.
+ 🔩 Enterprise-level design ecosystem [ArcoDesign](https://arco.design/) component library by ByteDance.
+ 🎨 [Less](http://lesscss.org/) CSS preprocessor.
+ 📚 Utilizing [i18n](https://github.com/intlify/vue-i18n-next/tree/master/packages/vue-i18n#readme) + [i18n-ally](https://github.com/lokalise/i18n-ally) for a simpler, standardized automated internationalization solution.
+ 🌐 Encapsulated common and convenient request methods based on [Axios](https://axios-http.com).
+ ⌨️ Built-in various business scenario pages, components, and framework support configurations for easy customization.
+ 🧚🏻 Fully adopted the `ESM` standard modular syntax, following the trend in modern frontend development.
+ 📦 Continuously optimized configurations to keep up with updates, deprecations, and merged features of dependencies and `Vite`, ensuring the best bundling optimization.

## Versions
- International version：[i18n branch](https://github.com/oljc/arco-admin/tree/i18n)

## Standards
Enhance code quality, reduce errors, and ensure consistency in the entire project's code style to facilitate easier code quality and style management.

+ **Code Standards:**  [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io) + [Prettier](https://prettier.io)<br/>
    *Static checking and standardization of code syntax, style, and formatting through predefined standards to ensure code quality and readability*

+ **Commit Standards:**  [Husky](https://typicode.github.io/husky/#/) + [Lint-Staged](https://github.com/okonet/lint-staged) + [Commitlint](https://commitlint.js.org)<br/>
  *Ensure consistent code quality and style for each commit through predefined code style checks, formatting, and message validation upon code submission*

## Browser Support

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" /><br/>Samsung | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br/>Opera | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" /><br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| >=16| >= 31 | >= 49| >= 31| last 2 versions| >= 36 | last 2 versions

## Usage
1. Clone this repository
```bash
git clone https://github.com/oljc/arco-admin
```
2. Install dependencies
```bash
pnpm i
```
3. Run
```bash
pnpm run dev
```

#### VsCode Tools

| [<img src="https://vue.gallerycdn.vsassets.io/extensions/vue/volar/1.8.24/1701250883040/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) | [<img src="https://dbaeumer.gallerycdn.vsassets.io/extensions/dbaeumer/vscode-eslint/2.4.2/1687441427519/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |[<img src="https://esbenp.gallerycdn.vsassets.io/extensions/esbenp/prettier-vscode/10.1.0/1690819498575/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |[<img src="https://lokalise.gallerycdn.vsassets.io/extensions/lokalise/i18n-ally/2.12.0/1695476646920/Microsoft.VisualStudio.Services.Icons.Default" width="24px" height="24px" /><br>i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) |[<img src="https://stylelint.gallerycdn.vsassets.io/extensions/stylelint/vscode-stylelint/1.3.0/1698920117910/Microsoft.VisualStudio.Services.Icons.Default" width="25px" height="25px" /><br>Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)|[<img src="https://editorconfig.gallerycdn.vsassets.io/extensions/editorconfig/editorconfig/0.16.4/1607315835386/Microsoft.VisualStudio.Services.Icons.Default" width="25px" height="25px" /><br>EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)|[<img src="https://antfu.gallerycdn.vsassets.io/extensions/antfu/vite/0.2.5/1622972526798/Microsoft.VisualStudio.Services.Icons.Default" width="25px" height="25px" /><br>Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite)|
| --- | --- | --- | ---| --- | --- | --- |

# Achievements
Added to the [awesome-vite](https://github.com/vitejs/awesome-vite#vue-3) list 🎉

## Contributing

Welcome contributions in any form and assure you that we will carefully consider each and every one of them.<br/><br/>

<a href="https://github.com/oljc/arco-admin/graphs/contributors"><img src="https://contrib.rocks/image?repo=oljc/arco-admin" />
</a><br/>

# License
This project is licensed under the [MIT License](./LICENSE)

[![趋势图](https://starchart.cc/oljc/arco-admin.svg)](https://starchart.cc/oljc/arco-admin)