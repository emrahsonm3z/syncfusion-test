### Install **Next.js** framework

```
npx create-next-app .
```

Removed customised files.

### Configure Eslint with Airbnb style guide

ESLint is a linter which will analyze your code and find common issues, while also identifying styles inconsistent with AirBnB’s style guide if configured.

If eslint is not installed globally:

```
npm install -g eslint
```

To install ESLint and setup a config file, we’ll use another npx package script.

```
npx eslint --init
```

The script will ask a few questions then go ahead and install its dependencies into the devDependencies section in ./package.json. It also creates ./.eslintrc.json which contains all the configurations.

- How would you like to use ESLint? · style
- What type of modules does your project use? · esm
- Which framework does your project use? · react
- Does your project use TypeScript? · No
- Where does your code run? · browser, node
- How would you like to define a style for your project? · guide
- Which style guide do you want to follow? · airbnb
- What format do you want your config file to be in? · JSON
- Would you like to install them now with npm? Yes

**.eslintrc.json**:

```
{
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types": 0,
        "react/jsx-props-no-spreading": "off",
        "jsx-a11y/anchor-is-valid": [
            "error",
            {
                "components": ["Link"],
                "specialLink": ["hrefLeft", "hrefRight"],
                "aspects": ["invalidHref", "preferButton"]
            }
        ]
    }
}

```

Allow you to declare state as a class variable instead of in the constructor of a React Component.

```
"react/state-in-constructor": "off"
```

Add **.eslintignore** file:

```
node_modules
dist
build
.next
.storybook
__mocks__
.env.local
```

**package/scripts**:

```
"lint": "eslint . --ext .js,.jsx",
"lint:fix": "npm run lint -- --fix",
```

ESLint parser isn’t up to date with ongoing JavaScript changes, so we need to use the babel-eslint parser.

```
yarn add -D babel-eslint
```

In **.eslintrc.json**, add:

```
"parser": "babel-eslint"
```

### Reference

- ESLint Rules - https://eslint.org/docs/rules/
- Airbnb Style Guide - https://github.com/airbnb/javascript

Easy autofixable import sorting.

```
yarn add -D eslint-plugin-simple-import-sort
```

In **.eslintrc.json**, add:

```
"plugins": ["simple-import-sort"]
"rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "sort-imports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/prefer-default-export": "off",
}
```

### Configure Prettier

Prettier is a code formatter that can identify and automatically fix style issues in your code. To install we need to install 3 packages—prettier itself, eslint-plugin-prettier which integrates Prietter into ESLint, and eslint-config-prettier which will turn off ESLint rules that conflict with Prettier.

```
yarn add -D prettier eslint-plugin-prettier eslint-config-prettier
```

add **.prettierrc**:

```
{
  "printWidth": 80,
  "semi": false,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "none",
  "jsxBracketSameLine": true,
  "bracketSpacing": true
}
```

**package/scripts**:

```
"format": "prettier --write ./**/*.{js,jsx}",
```

### Reference

- Prettier Options - https://prettier.io/docs/en/options.html

add **.prettierignore** :

```
node_modules
dist
build
.next
__mocks__
```

Add "prettier" and prettier/react to the extends section into **.eslintrc.json**

```
"extends": ["prettier", "prettier/react"],
"plugins": ["prettier"],
"rules": {
    "prettier/prettier": [
      "error",
      { "endOfLine": "auto" },
      { "usePrettierrc": true }
    ],
}
```

- Install Prettier extension
- Vscode settings:

**.vscode/settings.json**:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "files.associations": {
    "*.css": "postcss",
    "*.xml": "html",
    "*.svg": "html"
  },
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll": true
  },
  "files.autoSaveDelay": 500,
  "files.autoSave": "off"
}

```

### Install Husky and Lint-Staged

Husky can prevent bad git commit, git push! Linters against staged git files and don’t let slip into your code base!

```
yarn add -D husky@4.3.5 lint-staged
```

Add in package.json

```
"husky": {
    "hooks": {
        "pre-commit": "lint-staged"
    }
},
"lint-staged": {
    "*.{js,ts,tsx}": [
        "prettier --write",
        "eslint --fix --quiet"
    ]
}
```

### Absolute Imports and Module path aliases

Create **jsconfig.json**

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

Add webpack configurations: **next.config.js**:

```
const path = require('path')

webpack: (config) => {
    const { resolve } = config

    // jsconfig
    resolve.alias['~'] = path.resolve(__dirname)

    return config
}
```

Install eslint-import-resolver-alias and add eslint config :

```
yarn add -D eslint-import-resolver-alias
```

**.eslintrc.json**:

```
"settings": {
      "import/resolver": {
        "alias": {
          "map": [["~", "."]],
          "extensions": [".js", ".jsx"]
        }
      }
},
```

### Configure postcss

```
yarn add autoprefixer postcss-nested postcss-custom-media -D
```

add **postcss.config.js**:

```
const breakpoints = {
  sm: 544, // Small screen / phone
  md: 768, // Medium screen / tablet
  lg: 1024, // Large screen / desktop
  xl: 1200 // Extra large screen / wide desktop
}

module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-nested': {},
    'postcss-custom-media': {
      importFrom: [
        {
          customMedia: { '--d': `(min-width: ${breakpoints.lg + 1}px)` } // desktop
        },
        {
          customMedia: {
            '--t': `(min-width: ${breakpoints.md}px) and (max-width:${breakpoints.lg}px)` // tablet
          }
        },
        {
          customMedia: {
            '--m': `(max-width:${breakpoints.md - 1}px)` // mobile
          }
        },
        {
          customMedia: {
            '--dt': `(min-width: ${breakpoints.md}px)` // desktop-and-tablet
          }
        },
        {
          customMedia: {
            '--tm': `(max-width:${breakpoints.lg - 1}px)` // tablet-and-mobile
          }
        }
      ]
    }
  }
}
```

### Setting up custom meta tags for pages

Create **components/meta/index** component.

#### Create Favicon Package

This package was generated with [RealFaviconGenerator](https://realfavicongenerator.net/) [v0.16](https://realfavicongenerator.net/change_log#v0.16)

##### Install instructions

To install this package:

Extract this package in the root of your web site. If your site is <code>http://www.example.com</code>, you should be able to access a file named <code>http://www.example.com/favicon.ico</code>.

Insert the following code in the `head` section of your pages:

    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

_Optional_ - Check your favicon with the [favicon checker](https://realfavicongenerator.net/favicon_checker)

**_For the development process, the project was published on vercel._**

### Convert svg images to component

**Install svgr:**

```
yarn add -D @svgr/cli
```

Create components from /icons folder into /components/icons folder

```
  "scripts": {
    "svgr": "svgr icons -d components/icons --icon --svg-props className= --replace-attr-values \"#fff=currentColor\" --replace-attr-values \"#000=currentColor\" --svgo-config .svgorc.json && eslint components/icons --fix"
  },
```

### Reference

- https://react-svgr.com/docs/cli/

**Create Layout**
Into **/components** folder

```
function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
```

### Configure ENV

```
yarn add dotenv
```

**next.config.js**:

```
require('dotenv').config()
```

### PWA

```
yarn add next-pwa next-compose-plugins
```

**next.config.js**:

```

const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')

module.exports = withPlugins(
  [],
  withPWA({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development'

  })
)
```

### Using custom env file path

```
yarn add env-cmd
```

**package.json**:

```
    "dev": "env-cmd -f .env.development next dev",
    "build:dev": "env-cmd -f .env.development next build",
    "build:stage": "env-cmd -f .env.staging next build",
    "build:prod": "env-cmd -f .env.production next build",
    "start:stage": "env-cmd -f .env.staging next start",
    "start": "env-cmd -f .env.production next start",
```

### Enabled webpack bundle analyzer

```
yarn add @next/bundle-analyzer
```

**package.json**:

```
"analyze": "cross-env ANALYZE=true next build",
    "analyze:server": "cross-env BUNDLE_ANALYZE=server next build",
    "analyze:browser": "cross-env BUNDLE_ANALYZE=browser next build"
```

**next.config.js**:

```
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins(
  [[withBundleAnalyzer]],
  ....)
```
