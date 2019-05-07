# VSCode_update 1.32.3

## 工作台

1. 预览并应用颜色主题
2. 在 “键盘快捷键” 页面上编辑，快捷键绑定的 when
3. 文件列表过滤方式切换
   用于控制当文件列表获取焦点后，是否自动捕获键盘输入， 使用命令：`list.toggleKeyboardNavigation`
   示例：
    ```json
    {
        "key": "/",
        "command": "list.toggleKeyboardNavigation",
        "when": "filesExplorerFocus"
    }
    ```

## 编辑

1. 悬停快速查看并修改问题
    - 悬停显示问题并带有快速修复按钮
    - 在问题查看面板上，可以快速导航到上一个/下一个错误
2. 自动修复
    - 快捷键 -- `shift + alt + .`
    - 自动修复存在多种建议，如果希望可以对其进行单独键绑定
        ```json
        {
            "key": "ctrl+shift+r ctrl+e",
            "command": "editor.action.codeAction",
            "args": {
                "kind": "refactor.extract.constant",
                "preferred": true
            }
        }
        ```
    - 可以在设置中，设置在保存的时候自动修复所有操作
        ```json
        // On save, run both fixAll and organizeImports source actions
        "editor.codeActionsOnSave": {
            "source.fixAll": true,
            "source.organizeImports": true,
        }
        ```
3. 改进了列选择
   修改了 `ctrl` ,目前 `ctrl` 只用来添加光标。`alt` 用于转换多选和框选的方式（框选的时候同时按住 Alt 进行转换）

## 调试

1. Debug Console 的字体配置
   现在可以配置的字体大小，字体和行高在调试控制台中使用这些设置：`debug.console.fontSize，debug.console.fontFamily，和debug.console.lineHeight。`
2. 文本可以自动换行

## 集成终端

1. 变量支持
   现在可以在命令中使用变量`workbench.action.terminal.sendSequence`，例如：
    ```json
    {
        "key": "ctrl+shift+t",
        "command": "workbench.action.terminal.sendSequence",
        "args": { "text": ". ${file}" }
    }
    ```

## 预览功能（预览功能尚未准备好发布，但功能足以使用）

1. 在调试服务器程序时自动打开 URI

    开发 Web 程序通常需要在 Web 浏览器中打开特定的 URL，以便在调试器中命中服务器代码。在这个里程碑中，我们添加了第一个新的 VS 代码功能，该功能试图以灵活的方式自动执行此过程。

    示例：

    ```js
    var express = require("express");
    var app = express();

    app.get("/", function(req, res) {
        res.send("Hello World!");
    });

    app.listen(3000, function() {
        console.log("Example app listening on port 3000!");
    });
    ```

    现在我们需要调试这个程序，希望能够在浏览器中进行预览

    我们可以在调试的配置中设置：

    ```json
    {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${workspaceFolder}/app.js",

        "serverReadyAction": {
            "pattern": "listening on port ([0-9]+)",
            "uriFormat": "http://localhost:%s",
            "action": "openExternally"
        }
    }
    ```

    - pattern 属性描述了用于匹配程序的声明端口的输出字符串的正则表达式。端口号的模式放在括号中，以便它可用作正则表达式捕获组。在此示例中，我们仅提取端口号，但也可以提取完整的 URI。
    - uriFormat 属性描述了如何将端口号转换为 URI。第一个%s 由匹配模式的第一个捕获组代替。

    然后，在 VS 代码（“外部”）之外打开生成的 URI，并为 URI 的方案配置标准应用程序。
    或者，action 可以设置为 debugWithChrome。在这种情况下，VS Code 会为 URI 启动 Chrome 调试会话（这需要安装 Debugger for Chrome 扩展程序）。在此模式下，webRoot 可以添加传递给 Chrome 调试会话的属性。

    默认值：

    ```json
    {
        pattern："listening on.* (https?://\\S+|[0-9]+)", //匹配常用消息“侦听端口3000”或“正在侦听：https：// localhost：5001 ”。
        uriFormat："http://localhost:%s",
        webRoot："${workspaceFolder}",
    }
    ```

## 添加扩展

1. 为调试工具栏添加命令
   现在，扩展可以为调试工具栏提供命令。以下是扩展程序的示例 `package.json`

    ```json
    {
        "contributes": {
            "commands": [
                {
                    "command": "dart.hotReload",
                    "title": "Hot Reload",
                    "icon": {
                        "dark": "./media/hot_reload_inverse.svg",
                        "light": "./media/hot_reload.svg"
                    }
                }
            ],
            "menus": {
                "debug/toolbar": [
                    {
                        "command": "dart.hotReload",
                        "when": "debugType == dart",
                        "group": "dart"
                    }
                ]
            }
        }
    }
    ```

    该扩展添加了调试工具栏右侧的“热重载”按钮。
