module.exports = {
    "globals": {
      "urlImage": true,
      "fetch": true,
      "game": true
    },
    "plugins": [
      "react",
      "react-native"
    ],
    "extends": ["eslint:all", "plugin:react/all", "airbnb", "plugin:react/recommended", "plugin:react-native/all"],
    "parser":"babel-eslint",
    "rules": {
      "react/jsx-no-bind": [0, { "allowBind": true }],
      "react/jsx-filename-extension": [0, { "extensions": [".js", ".jsx"] }],
      "react/destructuring-assignment": [0, { "extensions": [".jsx", ".js"] }],
      "react/prop-types": [0, { "extensions": [".jsx", ".js" ]}],
      "no-use-before-define": [0, { "functions": true, "classes": true }],
      "prefer-destructuring": [0, {
        "array": true,
        "object": true
      }, {
        "enforceForRenamedProperties": false
      }],
      "no-restricted-globals": [0, "isNaN"]
    }
    
}
