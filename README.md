# vue3-typescript-sample

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Setup GitHub Actions for deploying static site
### Requirements

- NodeJS == v22.7.0

### Set enviroment variables

- Access to https://github.com/{your-account}/{repository-name}/settings/secrets/actions
- Push "**New repository secret**" button
- Add Below
  - **AWS_ACCESS_KEY_ID** : your-aws-access_key
  - **AWS_SECRET_ACCESS_KEY** : your-aws-secret_key
- Push "Variable" tab
- Push "**New repository valiable**" button
  - For Production
    - **CLOUDFRONT_DISTRIBUTION** : your cloudfront distribution created by terraform for production
    - **S3_CONFIG_BUCKET**: **"your-serverles-configs/your-project-name/frontend/prd"** for production
    - **S3_RESOURCE_BUCKET**: **"your-domain-static.example.com"** for production
  - For Develop
    - **CLOUDFRONT_DISTRIBUTION_DEV** : your cloudfront distribution created by terraform for develop
    - **S3_CONFIG_BUCKET_DEV**: **"your-serverles-configs/your-project-name/frontend/dev"** for develop
    - **S3_RESOURCE_BUCKET_DEV**: **"your-domain-static-dev.example.com"** for develop
