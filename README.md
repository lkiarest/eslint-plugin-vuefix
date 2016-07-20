# eslint-plugin-vuefix

自动修复(autofix) .vue 文件

由于eslint插件机制不完善，在sublime中作为插件使用的时候最好执行两次 lint 查看结果。

_参考了之前存在的npm插件 “eslint-plugin-vue”(Twiknight)，感谢作者 --其只支持vue文件的错误提示，并没有fix的功能)_

## Installation

```
$ npm install eslint-plugin-vuefix --save-dev
```

需要与eslint使用同样的方式安装

## Usage

在“.eslintrc” 文件中添加插件声明

```json
{
    "plugins": [
        "vuefix"
    ]
}
```

## License

MIT
