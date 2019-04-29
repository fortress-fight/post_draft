# Git 常用命令收集

## Git 命令

1. 使用场景：git 撤销 commit 中单个文件的修改

    ```git
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
