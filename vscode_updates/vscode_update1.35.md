# VSCode_update 1.35

⏲:2019-06-10

## 编辑

1. 跳转到定义的位置

    - 通过 F12 触发：`editor.gotoLocation.multiple: goto` ，如果出现多个定义，可以使用 F12 逐个跳转到每个定义（之前只会跳转到第一个）
    - 可以通过设置 `workbench.editor,revealIfOpen` 来规定是否要重用当前编辑器，默认是不重用的

## 语言

1. 目前 TS 和 JS 都支持了智能选择，可以使用扩展选择（Shift + Alt + Right）和收缩选择（Shift + Alt + Left）命令

    ![20190610141424.png](https://code.visualstudio.com/assets/updates/1_35/ts-smart-select.gif)

2. TS 重构

    使用新的 Extract 为 TypeScript 键入别名重构，以快速将部件类型提取到其自己的类型别名中：

    ![重构](https://code.visualstudio.com/assets/updates/1_35/ts-extract-type.gif)

    可以为该行为绑定快捷键：

    ```json
    {
        "key": "shift+ctrl+e",
        "command": "editor.action.codeAction",
        "args": {
            "kind": "refactor.extract",
            "preferred": true
        }
    }
    ```

## 来源控制

1. 比较合并冲突与完整上下文

    新设置 `merge-conflict.diffViewPosition` 允许您在比较合并冲突时在新编辑器组中打开差异视图。此外，新视图显示已更改文件的完整差异视图，这为合并冲突提供了更好的上下文。

    ![diff](https://code.visualstudio.com/assets/updates/1_35/compare-conflict.gif)

## 其他

1. 使用 ctrl + 左键 可以快速折叠目录树
