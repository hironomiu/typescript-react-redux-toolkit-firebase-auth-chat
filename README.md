# typescript-react-redux-toolkit-firebase-auth-chat

[![Deploy to Firebase Hosting on merge](https://github.com/hironomiu/typescript-react-redux-toolkit-firebase-auth-chat/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/hironomiu/typescript-react-redux-toolkit-firebase-auth-chat/actions/workflows/firebase-hosting-merge.yml)

Firebase Authentication(GitHub)で認証  
Firebase Realtime Database でデータの管理  
Firebase Storage でファイルの管理

## Run

```
yarn start
```

## Build

```
yarn run build
```

## Testing

`src/__tests__`に配置

```
yarn test
```

## Install Memo

### React

```
yarn create react-app --template typescript
```

or

下記実行で script の実行が`npm`となった場合は以降の`yarn`の箇所は全て`npm`に読み替える

```
npx create-react-app --template typescript
```

### firebase

```
yarn add firebase @types/firebase
```

### react-router-dom

```
yarn add react-router-dom @types/react-router-dom redux @types/redux
```

### react-redux & redux-toolkit

```
yarn add @reduxjs/toolkit react-redux @types/react-redux
```

### Tailwind(v3)

[Tailwind 公式 docs/instllation](https://tailwindcss.com/docs/installation)

```
yarn add tailwindcss@latest @types/tailwindcss
```

initialize

```
npx tailwindcss init -p
```

modify tailwind.config.js

```
module.exports = {
  content: ['./src/**/*.tsx', './public/index.html'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

modify `index.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### @headlessui/react

```
yarn add @headlessui/react
```

### @heroicons/react

```
yarn add @heroicons/react
```

### GitHub

アカウント -> Settings -> Developer settings -> OAuth Apps -> New OAuth App

取得した「Client ID」「Client secrets」を Firebase Auth で設定する

## Deploy

Firebase -> Hosting -> はじめる

```
yarn add --dev firebase-tools
```

つぎへ

```
npx firebase login
npx firebase init
```

`? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. ` -> `❯◉ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`

`? Please select an option:` -> `❯ Use an existing project `

`? Select a default Firebase project for this directory:` -> `❯ auth-chat-sample (auth-chat-sample) `

`? What do you want to use as your public directory?` -> `build`

`? Configure as a single-page app (rewrite all urls to /index.html)?` -> `y`

`? Set up automatic builds and deploys with GitHub?` -> `y`

`? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository)` -> リポジトリが選択されていることを確認しエンター

`? Set up the workflow to run a build script before every deploy? ` -> `yarn install && yarn build`

`? Set up automatic deployment to your site's live channel when a PR is merged?` -> `y`

`? What is the name of the GitHub branch associated with your site's live channel?` -> `main`

つぎへ

```
yarn run build
npx firebase deploy
```
