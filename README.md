# eslint-plugin-vuefix

This ESLint plugin extracts and auto-fix scripts from .vue files.

## Usage

Simply install via npm install --save-dev eslint-plugin-vuefix and add the plugin to your ESLint configuration. See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#configuring-plugins).

Plugin should be installed __the same way as eslint：__

```shell
$ npm i eslint -D # local
$ npm i eslint-plugin-vuefix -D # local
# or
$ npm i eslint -g # global
$ npm i eslint-plugin-vuefix -g # global
```

Example:

```json
{
    "plugins": [
        "vuefix"
    ],
    "rules": {
        "vuefix/vuefix": [2, {"auto": true}]
    }
}
```

## Options

- __auto__  (Boolean, default: true). If set to false, the file will not be overwritten automatically

## License

[MIT](LICENSE) © qintx

