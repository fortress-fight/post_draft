# VSCode_update 1.32.3

⏲:2019-07-15

## 工作台

**隐藏单个状态栏**

右键底部状态栏可以选择需要显示的项目

![隐藏单个状态栏](https://code.visualstudio.com/assets/updates/1_36/status-bar.gif)

**树缩进指南**

可设置项:

-   `workbench.tree.indent` 设置控制树的缩进级别
-   `workbench.tree.renderIndentGuides` 设置的行为方式
    -   onHover - 悬停在树上时显示缩进引导线。默认行为。
    -   always - 始终在树中显示缩进引导线。
    -   none - 禁止使用

## 集成终端

**启动环境干净的终端**

VS Code 中的集成终端始终与普通终端略有不同，特别是在 Linux 和 macOS 上。原因是环境始终从 VS Code 的窗口（实例）继承，VS Code / Electron 相关的环境变量被删除，而普通终端通常从 Dock / Start 菜单启动并使用系统环境。这可能会在某些情况下导致问题，例如 Python 虚拟环境因其使用 \$PATH 变量的方式而被破坏。

我们可以控制终端不使用 vscode 的环境变量

`terminal.integrated.inheritEnv` 默认为 `true`

-   以后的版本中, 该选项可以会被切换成 `false`
-   该选择在 window 下不会产生影响

**更改 Ctrl+\\**

之前，Ctrl+\已映射到在 Linux 和 Windows 上拆分终端的命令，但这已被更改为传递 SIGQUIT 到 shell，因为大多数人都希望终端能够做到。如果您想要旧的行为，可以将此键盘快捷方式添加到您的 keybindings.json 文件中。

```json
{
    "key": "ctrl+\\",
    "command": "workbench.action.terminal.split",
    "when": "terminalFocus"
}
```

## 语言

**TypeScript[实验性]**

IntelliSense 之类的功能要求 TypeScript 服务器在返回任何结果之前评估整个 JavaScript 或 TypeScript 项目，这对于较大的项目可能需要一些时间。
在进行此处理时，服务器无法处理任何其他请求，包括对代码折叠等简单功能的请求，只需要对当前文件有基本的语义理解。如果您在代码折叠或文档大纲可用之前发现延迟，则可能已经看到过此问题。

为了让您更快地开始使用代码，我们添加了一个新的实验选项，VS Code 使用两个 TypeScript 服务器：一个只处理简单的基于语法的操作，一个完整的处理项目处理，IntelliSense，错误报告和其他高级语言功能。要启用此行为，请设置 `"typescript.experimental.useSeparateSyntaxServer": true`。此设置需要在工作区中使用 TypeScript 3.4 或更高版本。

![20190715105826.png](http://resources.ffstone.top/resource/image/20190715105826.png)

## 调试

新的调试命令 `Jump to Cursor`

它允许您将程序执行移动到新位置，而无需执行其间的任何代码。

![jump to cursor](https://code.visualstudio.com/assets/updates/1_36/jump-to-cursor.gif)

**禁用控制台自动换行**

`debug.console.wordWrap` 控制是否在控制台中进行换行
