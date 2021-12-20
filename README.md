# typescript-react-redux-toolkit-firebase-auth-chat

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

### Tailwind

```
yarn add tailwindcss@latest @types/tailwindcss
```

### GitHub

アカウント -> Settings -> Developer settings -> OAuth Apps -> New OAuth App

取得した「Client ID」「Client secrets」を Firebase Auth で設定する
