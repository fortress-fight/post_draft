# Git 常用命令收集

## Git 命令

### 比较相关

1.  使用场景：git diff 文件，需要忽略空格，换行符的变化

    ```bash
    # 忽略空格对比文件系统中给定的两个文件
    git diff --no-index --word-diff-regex=[^[:space:]] <file1> <file2>
    ```

    注：

    -   `--no-index` 表示不在 Git 控制的工作树中运行命令，如果忽略该项，只输入一个文件路径就行，结果是该文件对比上次提交时的差异
    -   `--word-diff-regex=<regex>` 可以决定将检测哪些字符，例如：`[^[:space:]]` 就是将会检测非空格的字符

2.  比较两个不同提交下的文件差异

    ```bash
    git diff <hash> <hash>
    ```

    1. `--stat` 只显示修改的文件路径
    2. 在后面添加文件路径，可以只显示该文件的修改

3.  比较过滤

    `git diff <commit_id> --diff-filter=<type>`

    -   key: `--diff-filter=[ACDMRTUCB*]`
    -   options:
        -   A Added (只显示添加的修改)
        -   C Copied
        -   D Deleted (只显示删除的修改)
        -   M Modified
        -   R Renamed
        -   T have their type (mode) changed
        -   U Unmerged
        -   X Unknown
        -   B have had their pairing Broken
        -   \* All-or-none

4.  只显示具有差异的文件名

    `git diff <commit_id> --name-only`

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
    -   pick：简写 p，启用该 commit；
    -   reword：简写 r，使用该 commit，但是修改提交信息，修改后可以继续编辑后面的提交信息；
    -   edit：简写 e，使用 commit，停止合并该 commit；
    -   squash：简写 s，使用该 commit，并将该 commit 并入前一 commit；
    -   drop：简写 d，移除该 commit；
    ```

    1. 将文件中不需要的提交删除，或者修改为 `drop` 保存文件退出 这个时候将会把 target_commit-hash 1️⃣ 和当前文件进行合并，然后提交。在这两个之间的修改将会被移除
    2. 将不需要的提交信息前修改为 `squash` 这样将会保留这次提交的内容，并最终生成一次提交信息，在提交之前允许修改一次提交信息（倒数第二个）

    1️⃣ `target_commit-hash`：要变基的目标提交

    > 建议使用第二种

### 合并

1. 合并某个分支上的单个 commit

    key: `cherry-pick`

    ```bash
    git checkout <target_branch1️⃣>
    git cherry-pick <target_commit2️⃣>
    ```

    1️⃣ 要执行合并的分支
    2️⃣ 要被合并的提交

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

2. 删除远程分支

    - `git push origin :<remote_branch>`
    - `git push --delete <remote_branch>`

### 修改

1. 修改分支名称

    - 本地分支重命名 `git branch -m oldName newName`
    - 远程分支重命名
        - 先在本地修改分支名称
        - 删除远程分支 `git push --delete <remote_branch>`
        - 上传新的分支
        - 把修改后的本地分支和远程分支关联 `git branch --set-upstream-to origin/newName`

### 远程仓库相关

1. 从远程仓库获取所有分支

    ```bash
    git fetch --all
    git pull -all
    ```

2. 拉取远程分支并在本地创建对应分支

    ```bash
    git checkout -b <local_branch_name> <remote_branch_name>
    ```

## 其它

1. 设置命令行编码格式：https://blog.csdn.net/chy555chy/article/details/78355985 `chcp 65001` 将编码格式设置为中文
2. [Git 客户端设置 Windows 下的字符编码](https://www.playpi.org/2019031901.html)
3. `git config --global core.quotepath false`
