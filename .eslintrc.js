module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  parser: 'babel-eslint',
  // required to lint *.vue files
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    }
  },
  plugins: [
    'react'
  ],
  settings: {
    "react": {
      "pragma": "React",  // Pragma to use, default to "React"
    }
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 最后一个允许跟  “,”
    'comma-dangle': 0,
    // ``里面至少有一个${}
    'quotes': 0,
    // () 前要加空格
    'space-before-function-paren': 0,
    // 只能用 attr={xxx}
    'jsx-quotes': 0,
    // 声明变量必须使用
    'no-unused-vars': 0,
  }
}
