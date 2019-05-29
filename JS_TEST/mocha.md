# 使用 Mocha 进行测试

时间：2019-05-29 Wed
知识点：

-   Mocha 的安装以及使用
-   断言 Chia
-   TDD/BDD

## Mocha

(Mocha)[https://mochajs.cn/#installation] 是一个功能丰富的 javascript 测试框架，能够运行在 node.js 和浏览器中

### 安装

1. 全局安装 `npm install --global mocha`
2. 本地安装 `npm install --save-dev mocha`

### 使用

1. 基础使用

    目的：创建测试用例，测试 `[1,2,3]` 中没有 4

    - 在当前目录的根目录下，添加 test 文件夹，创建 test.js

        ```js ./test/test.js
        var assert = require("assert");
        describe("Test", function() {
            describe("判断 [1,2,3] 中是否存在 4", function() {
                it("[1,2,3] 中不存在 4", function() {
                    assert.equal([1, 2, 3].indexOf(4), -1);
                });
            });
        });
        ```

    - 运行 `mocha`

        ```bash
            Test
                判断 [1,2,3] 中是否存在 4
                √ [1,2,3] 中不存在 4
            1 passing (39ms)
        ```

2. 异步使用

    ```js
    describe("SyncTest", function() {
        describe("异步判断 [1,2,3] 中是否存在 4", function() {
            it("[1,2,3] 中不存在 4", function(done) {
                setTimeout(() => {
                    assert.equal([1, 2, 3].indexOf(4), -1);
                    done();
                }, 500);
            });
        });
    });
    ```

    - 运行 `mocha`

        ```bash
        SyncTest
            异步判断 [1,2,3] 中是否存在 4
            √ [1,2,3] 中不存在 4 (503ms)
        ```

    > 如果 done 进行了多次调用，将会抛出错误，这对于捕获以外的双重回调将会十分方便

## 参考文章

-   [mocha](https://mochajs.cn/#installation)
