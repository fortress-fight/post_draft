# VSCode_update 1.34

[vscode_update](https://code.visualstudio.com/updates/v1_34)

## 任务

1. 终止所有任务

    ```json 
    {
    "key": "ctrl+k t",
    "command": "workbench.action.tasks.terminate",
    "args": "terminateAll"
    }
    ```

2. 自动显示问题面板

    ```json
    {
        "version": "2.0.0",
        "tasks": [
            {
            "type": "npm",
            "script": "watch",
            "problemMatcher": "$tsc-watch",
            "isBackground": true,
            "presentation": {
                "reveal": "always",
                "revealProblems": "onProblem"
            }
            }
        ]
    }
    ```
    > 该属性值always，never和onProblem。

## 扩展

1. Vetur

    这个扩展提供语义诊断，悬停信息，跳转到定义，并找到 Vue JavaScript 的表达式引用：（通过右键可以跳转到定义位置或者快速查看定义信息）
