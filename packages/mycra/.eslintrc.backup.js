/**
 * Configuration Variant: 1
 *
 *
 *
 *
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    // "prettier",
    // "prettier/react",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "prettier"],
  rules: {
    "arrow-parens": [2, { requireForBlockBody: true }],
    "button-has-type": "off",
    camelcase: ["off", { ignoreDestructuring: true }],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-lone-blocks": "off",
    "no-nested-ternary": "off",
    "no-plusplus": "off",
    "no-shadow": "off",
    "no-unused-expressions": "off",
    "no-use-before-define": "off",
    "quote-props": 2,
    "react/button-has-type": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-boolean-value": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-no-bind": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-wrap-multilines": "off",
    "react/no-array-index-key": "off",
    "react/no-string-refs": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unused-state": "off",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/sort-comp": "off",
    semi: 1,
  },
};

/**
 * Configuration Variant: 2
 *
 *
 */
var OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = exports = {
  env: {
    es6: true,
  },

  ecmaFeatures: {
    // env=es6 doesn't include modules, which we are using
    modules: true,
  },

  extends: "eslint:recommended",

  rules: {
    // Possible Errors (overrides from recommended set)
    "no-extra-parens": ERROR,
    "no-unexpected-multiline": ERROR,
    // All JSDoc comments must be valid
    "valid-jsdoc": [
      ERROR,
      {
        requireReturn: false,
        requireReturnDescription: false,
        requireParamDescription: true,
        prefer: {
          return: "returns",
        },
      },
    ],

    // Best Practices
    // Allowed a getter without setter, but all setters require getters
    "accessor-pairs": [
      ERROR,
      {
        getWithoutSet: false,
        setWithoutGet: true,
      },
    ],
    "block-scoped-var": WARN,
    "consistent-return": ERROR,
    curly: ERROR,
    "default-case": WARN,

    // the dot goes with the property when doing multiline
    "dot-location": [WARN, "property"],
    "dot-notation": WARN,
    eqeqeq: [ERROR, "smart"],
    "guard-for-in": WARN,
    "no-alert": ERROR,
    "no-caller": ERROR,
    "no-case-declarations": WARN,
    "no-div-regex": WARN,
    "no-else-return": WARN,
    "no-empty-label": WARN,
    "no-empty-pattern": WARN,
    "no-eq-null": WARN,
    "no-eval": ERROR,
    "no-extend-native": ERROR,
    "no-extra-bind": WARN,
    "no-floating-decimal": WARN,
    "no-implicit-coercion": [
      WARN,
      {
        boolean: true,
        number: true,
        string: true,
      },
    ],
    "no-implied-eval": ERROR,
    "no-invalid-this": ERROR,
    "no-iterator": ERROR,
    "no-labels": WARN,
    "no-lone-blocks": WARN,
    "no-loop-func": ERROR,
    "no-magic-numbers": WARN,
    "no-multi-spaces": ERROR,
    "no-multi-str": WARN,
    "no-native-reassign": ERROR,
    "no-new-func": ERROR,
    "no-new-wrappers": ERROR,
    "no-new": ERROR,
    "no-octal-escape": ERROR,
    "no-param-reassign": ERROR,
    "no-process-env": WARN,
    "no-proto": ERROR,
    "no-redeclare": ERROR,
    "no-return-assign": ERROR,
    "no-script-url": ERROR,
    "no-self-compare": ERROR,
    "no-throw-literal": ERROR,
    "no-unused-expressions": ERROR,
    "no-useless-call": ERROR,
    "no-useless-concat": ERROR,
    "no-void": WARN,

    // Produce warnings when something is commented as TODO or FIXME
    "no-warning-comments": [
      WARN,
      {
        terms: ["TODO", "FIXME"],
        location: "start",
      },
    ],
    "no-with": WARN,
    radix: WARN,
    "vars-on-top": ERROR,

    // Enforces the style of wrapped functions
    "wrap-iife": [ERROR, "outside"],
    yoda: ERROR,

    // Strict Mode - for ES6, never use strict.
    strict: [ERROR, "never"],

    // Variables
    "init-declarations": [ERROR, "always"],
    "no-catch-shadow": WARN,
    "no-delete-var": ERROR,
    "no-label-var": ERROR,
    "no-shadow-restricted-names": ERROR,
    "no-shadow": WARN,

    // We require all vars to be initialized (see init-declarations)
    // If we NEED a var to be initialized to undefined, it needs to be explicit
    "no-undef-init": OFF,
    "no-undef": ERROR,
    "no-undefined": OFF,
    "no-unused-vars": WARN,

    // Disallow hoisting - let & const don't allow hoisting anyhow
    "no-use-before-define": ERROR,

    // Node.js and CommonJS
    "callback-return": [WARN, ["callback", "next"]],
    "global-require": ERROR,
    "handle-callback-err": WARN,
    "no-mixed-requires": WARN,
    "no-new-require": ERROR,

    // Use path.concat instead
    "no-path-concat": ERROR,
    "no-process-exit": ERROR,
    "no-restricted-modules": OFF,
    "no-sync": WARN,

    // ECMAScript 6 support
    "arrow-body-style": [ERROR, "always"],
    "arrow-parens": [ERROR, "always"],
    "arrow-spacing": [ERROR, { before: true, after: true }],
    "constructor-super": ERROR,
    "generator-star-spacing": [ERROR, "before"],
    "no-arrow-condition": ERROR,
    "no-class-assign": ERROR,
    "no-const-assign": ERROR,
    "no-dupe-class-members": ERROR,
    "no-this-before-super": ERROR,
    "no-var": WARN,
    "object-shorthand": [WARN, "never"],
    "prefer-arrow-callback": WARN,
    "prefer-spread": WARN,
    "prefer-template": WARN,
    "require-yield": ERROR,

    // Stylistic - everything here is a warning because of style.
    "array-bracket-spacing": [WARN, "always"],
    "block-spacing": [WARN, "always"],
    "brace-style": [WARN, "1tbs", { allowSingleLine: false }],
    camelcase: WARN,
    "comma-spacing": [WARN, { before: false, after: true }],
    "comma-style": [WARN, "last"],
    "computed-property-spacing": [WARN, "never"],
    "consistent-this": [WARN, "self"],
    "eol-last": WARN,
    "func-names": WARN,
    "func-style": [WARN, "declaration"],
    "id-length": [WARN, { min: 2, max: 32 }],
    indent: [WARN, 4],
    "jsx-quotes": [WARN, "prefer-double"],
    "linebreak-style": [WARN, "unix"],
    "lines-around-comment": [WARN, { beforeBlockComment: true }],
    "max-depth": [WARN, 8],
    "max-len": [WARN, 132],
    "max-nested-callbacks": [WARN, 8],
    "max-params": [WARN, 8],
    "new-cap": WARN,
    "new-parens": WARN,
    "no-array-constructor": WARN,
    "no-bitwise": OFF,
    "no-continue": OFF,
    "no-inline-comments": OFF,
    "no-lonely-if": WARN,
    "no-mixed-spaces-and-tabs": WARN,
    "no-multiple-empty-lines": WARN,
    "no-negated-condition": OFF,
    "no-nested-ternary": WARN,
    "no-new-object": WARN,
    "no-plusplus": OFF,
    "no-spaced-func": WARN,
    "no-ternary": OFF,
    "no-trailing-spaces": WARN,
    "no-underscore-dangle": WARN,
    "no-unneeded-ternary": WARN,
    "object-curly-spacing": [WARN, "always"],
    "one-var": OFF,
    "operator-assignment": [WARN, "never"],
    "operator-linebreak": [WARN, "after"],
    "padded-blocks": [WARN, "never"],
    "quote-props": [WARN, "consistent-as-needed"],
    quotes: [WARN, "single"],
    "require-jsdoc": [
      WARN,
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: false,
        },
      },
    ],
    "semi-spacing": [WARN, { before: false, after: true }],
    semi: [ERROR, "always"],
    "sort-vars": OFF,
    "space-after-keywords": [WARN, "always"],
    "space-before-blocks": [WARN, "always"],
    "space-before-function-paren": [WARN, "never"],
    "space-before-keywords": [WARN, "always"],
    "space-in-parens": [WARN, "never"],
    "space-infix-ops": [WARN, { int32Hint: true }],
    "space-return-throw-case": ERROR,
    "space-unary-ops": ERROR,
    "spaced-comment": [WARN, "always"],
    "wrap-regex": WARN,
  },
};

/**
 * Configuration Variant: 3
 * use this format since .eslintrc is deprecated.
 * You can logically derive this format.
 *
 *
 *
 */

module.exports = {
  parser: "babel-eslint",
  extends: [
    "plugin:flowtype/recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "eslint-config-airbnb",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
  ],
  plugins: [
    "react",
    "redux-saga",
    "jest",
    "flowtype",
    "prettier",
    "compat",
    "import",
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    "jest/globals": true,
    "shared-node-browser": true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    jsx: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    "compat/compat": 1,
    "prettier/prettier": [
      "error",
      {
        useTabs: true,
        printWidth: 80,
        tabWidth: 4,
        singleQuote: true,
        trailingComma: "es5",
        jsxBracketSameLine: false,
        semi: false,
      },
    ],
    "no-var": 2,
    "no-const-assign": "error",
    radix: "error",
    "prefer-template": "error",
    "prefer-const": "error",
    "prefer-spread": "error",
    eqeqeq: ["error", "always"],
    semi: [2, "never"],
    "default-case": 2,
    "template-curly-spacing": 0, // Prettier.
    "arrow-parens": 0, // Does not work with Flow generic types
    "consistent-return": 0, // Flow.
    // Prefer new line before return
    // http://eslint.org/docs/rules/newline-before-return
    "newline-before-return": "error",
    "no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: true },
    ],
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "no-return-await": 0,
    "no-restricted-syntax": 0,
    "no-underscore-dangle": 0,
    "import/first": 0,
    "no-restricted-globals": 1,
    "no-useless-escape": 1,
    //was not working when used with flow prop types
    "no-unused-vars": 1,
    "react/no-unused-prop-types": 1,
    // require or disallow Yoda conditions
    // https://eslint.org/docs/rules/yoda
    yoda: ["error", "never", { exceptRange: true }],
    // Require modules with a single export to use a default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    "import/prefer-default-export": 0,

    // no longer defined
    "jsx-a11y/href-no-hash": "off",

    "global-require": 0, // Used by webpack isomorphic tools and React Native.
    "no-console": 0, // we are enabling this in the scripts
    "no-debugger": 0, // we are enabling this in the scripts
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    quotes: ["error", "single", { avoidEscape: true }],
    // React control override.
    "react/display-name": 0,
    "react/forbid-prop-types": 0, // using Flow types.
    "react/jsx-closing-bracket-location": 0, // Prettier.
    "react/jsx-filename-extension": 0, // JSX belongs to .js files.
    "react/jsx-indent": 0, // Prettier.
    "react/jsx-indent-props": 0, // Prettier.
    "react/jsx-wrap-multilines": 0, // Prettier.
    "react/no-danger": 0, // Control freaky.
    "react/no-unescaped-entities": 0, // Prettier.
    "react/no-unused-prop-types": 0, // Flow.
    "react/prop-types": 0, // Flow.
    "react/require-default-props": 0, // Flow.
    "react/jsx-no-bind": 2,
    "react/prefer-stateless-function": [2, { ignorePureComponents: true }],
  },
  settings: {
    polyfills: ["promises"],
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
};
