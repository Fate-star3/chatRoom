module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-plugin-import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        dictionary: ['./src', 'node_modules']
      },
      alias: [['@', './src']]
    }
  },
  rules: {
    // https://github.com/airbnb/javascript/issues/2505 修改一些airbnb的规则
    'no-fallthrough': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'global-require': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-dupe-args': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-expressions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'no-new': 'off',
    'default-param-last': 'off',
    'no-loss-of-precision': 'off',
    'no-empty-pattern': 'off',
    'prefer-destructuring': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/jsx-no-bind': 'off',
    'react/static-property-placement': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'import/no-cycle': 'off',
    'no-continue': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'react/no-array-index-key': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-shadow': 'off',
    'consistent-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'react/no-unstable-nested-components': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'prefer-regex-literals': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',

    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'arrow-body-style': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] }
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/extensions': [
      'error',
      {
        tsx: 'never',
        ts: 'never',
        jsx: 'never',
        js: 'never',
        json: 'never',
        scss: 'off'
      }
    ],
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'object',
          'unknown'
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        'newlines-between': 'always'
      }
    ],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off'
  }
}
