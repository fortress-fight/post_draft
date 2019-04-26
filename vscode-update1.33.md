# VSCode_update 1.33

## 工作台

1. 更快的选择语言设置

    命令：`configure display language`
    功能：打开快速选择列表，支持对本地的语言进行选择

2. 改进 `Source Control`（侧边栏-git） 的显示，使其更像 `File Explorer`。同时增进了 `source control` 的右键菜单，可以选是否显示某些项目

## 编辑

1. `IntelliSense Customization`
    
    对于智能提示有了新的设置方式：

    - `editor.suggest.filteredTypes` -- 过滤一些格式：`{"keyword": false}`
    - `editor.suggest.maxVisibleSuggestions` -- 最大显示数量
    - `editor.suggest.showIcons` -- 是否显示图标
  
2. 默认格式化工具的选择

    设置：`editor.defaultFormatter` 
    示例：
        ```js
        [javascript]: {
            'editor.defaultFormatter": "HookyQR.beautify"
        }
        ```
 
3. 跳转到定义变量的位置

    设置：`editor.gotoLocation.multiple`
    有效值：
        - `peek` -- 在当前位置打开 Peek 
        - `gotoAndPeek` -- 打开主要位置，并显示 Peek 视图
        - `goto` -- 仅打开主要位置

4. 代码段变量 -- `$WORKSPACE_NAME`

    在添加代码段的时候，可以引入表示打开工作区/文件夹的名称 `$WORKSPACE_NAME`

## 语言

1. Typescript

    - 转换为解构参数
        可以为 TypeScript 的命名参数重构为可以通过将函数转换为耽搁命名参数对象，来快速组织长函数参数列表

    -  禁用 CSS 属性值完成选项
        设置：`css.completion.triggerPropertyValueCompletion` 允许您禁止制定属性值不去完成

