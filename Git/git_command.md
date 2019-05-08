# Git 常用命令收集

## Git 命令

### 比较相关

1. 使用场景：git diff 文件，需要忽略空格，换行符的变化

    ```shell
    # 忽略空格对比文件系统中给定的两个文件
    git diff --no-index --word-diff-regex=[^[:space:]] <file1> <file2>
    ```

    注：
    
    - `--no-index` 表示不在 Git 控制的工作树中运行命令，如果忽略该项，只输入一个文件路径就行，结果是该文件对比上次提交时的差异
    - `--word-diff-regex=<regex>` 可以决定将检测哪些字符，例如：`[^[:space:]]` 就是将会检测非空格的字符
    

### 撤销相关

1. 使用场景：git 撤销 commit 中单个文件的修改

    ```shell
    # 查询这个文件的 Log 信息
    git log <fileName>
    # 其次查找到这个文件的上次commit id xxx，并对其进行reset操作
    git reset <commit-id> <fileName>
    #再撤销对此文件的修改
    git checkout <fileName>
    #最后amend一下
    git commit --amend
    ```


## 其它

1. 设置命令行编码格式：https://blog.csdn.net/chy555chy/article/details/78355985 `chcp 65001` 将编码格式设置为中文
