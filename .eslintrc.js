module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": 0,
        "class-methods-use-this": 0,
        "react/jsx-wrap-multilines": 0,
        "react/prop-types": 0,
        "react/no-array-index-key": 0,
        "padded-blocks": 0,
        "react/destructuring-assignment": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "react/jsx-closing-tag-location": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/no-danger": 0,
        "react/no-access-state-in-setstate": 0,
        "max-len": 0,
        "jsx-a11y/interactive-supports-focus": 0,
        "jsx-a11y/accessible-emoji": 0,
        "no-return-assign": 0,
        "jsx-a11y/label-has-associated-control": 0,
      },
    "extends": ["airbnb", "plugin:react/recommended"]
};