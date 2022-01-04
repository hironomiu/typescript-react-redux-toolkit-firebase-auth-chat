# typescript-react-redux-toolkit-firebase-auth-chat

Firebase Authentication(GitHub)で認証  
Firebase Realtime Database でデータの管理  
Firebase Storage でファイルの管理

## Create Memo

### React

```
npx create-react-app --template typescript
```

or

```
yarn create react-app --template typescript
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
