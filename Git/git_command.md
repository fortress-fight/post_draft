# Git 常用命令收集

## Git 命令

### 比较相关

1. 使用场景：git diff 文件，需要忽略空格，换行符的变化

    ```bash
    # 忽略空格对比文件系统中给定的两个文件
    git diff --no-index --word-diff-regex=[^[:space:]] <file1> <file2>
    ```

    注：
    
    - `--no-index` 表示不在 Git 控制的工作树中运行命令，如果忽略该项，只输入一个文件路径就行，结果是该文件对比上次提交时的差异
    - `--word-diff-regex=<regex>` 可以决定将检测哪些字符，例如：`[^[:space:]]` 就是将会检测非空格的字符

2. 比较两个不同提交下的文件差异

    ```bash
    git diff <hash> <hash>
    ```

    1. `--stat` 只显示修改的文件路径
    2. 在后面添加文件路径，可以只显示该文件的修改

### 撤销相关

1. 使用场景：git 撤销 commit 中单个文件的修改

    ```bash
    # 查询这个文件的 Log 信息
    git log <fileName>
    # 其次查找到这个文件的上次commit id xxx，并对其进行reset操作
    git reset <commit-id> <fileName>
    #再撤销对此文件的修改
    git checkout <fileName>
    #最后amend一下
    git commit --amend
    ```

### commit 相关

1. 删除无效的 commit

    通过 `git rebase` 我们可以做到编辑 commit

    ```bash
    git rebase -i <target_commit-hash> # 1️⃣
    ```

    然后会打开编辑器
    
    这里有多种操作方式：
    
    ```md
       - pick：简写p，启用该commit；
       - reword：简写r，使用该commit，但是修改提交信息，修改后可以继续编辑后面的提交信息；
       - edit：简写e，使用commit，停止合并该commit；
       - squash：简写s，使用该commit，并将该commit并入前一commit；
       - drop：简写d，移除该commit；
    ```
    
    1. 将文件中不需要的提交删除，或者修改为 `drop` 保存文件退出 这个时候将会把 target_commit-hash 1️⃣ 和当前文件进行合并，然后提交。在这两个之间的修改将会被移除
    2. 将不需要的提交信息前修改为 `squash` 这样将会保留这次提交的内容，并最终生成一次提交信息，在提交之前允许修改一次提交信息（倒数第二个）

    1️⃣ `target_commit-hash`：要变基的目标提交

    > 建议使用第二种

### 删除相关

1. 从版本控制里移除文件

    ```bash
    git rm -r -n --cached <path>
    git rm -r --cached <path>
    ```

    执行完后，给定目录下的文件状态将会变为 untracked ，然后将目录添加到 .gitignore 文件中，最后提交
    
    1️⃣ -n 不会真删除文件，只是展示此命令将会删除的文件列表的预览
    2️⃣ -r 允许递归的删除给定的目录
    3️⃣ --cached 仅从索引中取消对该路径下的版本控制并且无论修改与否，工作区的文件都将保留。
   

## 其它

1. 设置命令行编码格式：https://blog.csdn.net/chy555chy/article/details/78355985 `chcp 65001` 将编码格式设置为中文
2. [Git 客户端设置 Windows 下的字符编码](https://www.playpi.org/2019031901.html)
3. `git config --global core.quotepath false`