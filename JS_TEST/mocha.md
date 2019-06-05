# 使用 Mocha 进行测试

时间：2019-05-29 Wed
知识点：

-   Mocha 的安装以及使用
-   断言
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

    在 `it` 中，会向回调函数中传入函数（done），当该函数执行的时候，将会触发断言的执行的回调。通过这种方式我们就可以来调试异步的函数。
    done -- 可以接受一个 Error 实例

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

## 断言

断言就是在设置的条件下，告诉你执行的结果和预期的结果是否相同 (上述的示例中，使用的是 Node 自带的断言 assert)。常用的断言库有：

| column0       | column1                                |
| ------------- | -------------------------------------- |
| should.js     | BDD 风格贯穿始终                       |
| expect.js     | expect()样式断言                       |
| chai          | expect()，assert()和 should 风格的断言 |
| better-assert | C 风格的自文档化的 assert()            |
| unexpected    | “可扩展的 BDD 断言工具”                |

## TDD/BDD

### TDD

TDD 指的是 Test Drive Development (测试驱动开发)

是指我们可以从测试的角度来检验整个项目。大概的流程是先针对每个功能点抽象出接口代码，然后编写单元测试代码，接下来实现接口，运行单元测试代码，循环此过程，直到整个单元测试都通过。这一点和敏捷开发有类似之处。

TDD 的好处自然不用多说，它能让你减少程序逻辑方面的错误，尽可能的减少项目中的 bug，开始接触编程的时候我们大都有过这样的体验，可能你觉得完成得很完美，自我感觉良好，但是实际测试或者应用的时候才发现里面可能存在一堆 bug，或者存在设计问题，或者更严重的逻辑问题，而 TDD 正好可以帮助我们尽量减少类似事件的发生。而且现在大行其道的一些模式对 TDD 的支持都非常不错，比如 MVC 和 MVP 等。

但是并不是所有的项目都适合 TDD 这种模式的，我觉得必须具备以下几个条件。

首先，项目的需求必须足够清晰，而且程序员对整个需求有足够的了解，如果这个条件不满足，那么执行的过程中难免失控。当然，要达到这个目标也是需要做一定功课的，这要求我们前期的需求分析以及 HLD 和 LLD 都要做得足够的细致和完善。

其次，取决于项目的复杂度和依赖性，对于一个业务模型及其复杂、内部模块之间的相互依赖性非常强的项目，采用 TDD 反而会得不尝失，这会导致程序员在拆分接口和写测试代码的时候工作量非常大。另外，由于模块之间的依赖性太强，我们在写测试代码的时候可能不采取一些桥接模式来实现，这样势必加大了程序员的工作量。

### BDD

BDD 指的是 Behavior Drive Development (行为驱动开发)

这里的 B 并非指的是 Business，实际上 BDD 可以看作是对 TDD 的一种补充，当然你也可以把它看作 TDD 的一个分支。因为在 TDD 中，我们并不能完全保证根据设计所编写的测试就是用户所期望的功能。BDD 将这一部分简单和自然化，用自然语言来描述，让开发、测试、BA 以及客户都能在这个基础上达成一致。因为测试优先的概念并不是每个人都能接受的，可能有人觉得系统太复杂而难以测试，有人认为不存在的东西无法测试。所以，我们在这里试图转换一种观念，那便是考虑它的行为，也就是说它应该如何运行，然后抽象出能达成共识的规范。如果你用过 JBehave 之类的 BDD 框架，你将会更好的理解其中具体的流程。这里我推荐一篇具体阐述的文章。亲身体验行为驱动开发。

### Mocha 测试钩子

Mocha 默认支持 BDD 式接口，Mocha 提供了一些钩子：

```js
describe("hooks", function() {
    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });

    // test cases
});
```

> 这些应该用于设置前置条件并在测试后进行清理。

1. 描述钩子

    可以使用可选描述调用任何挂钩，从而更容易查明测试中的错误。如果为钩子指定了一个命名函数，则在没有提供描述的情况下将使用该名称。例如：

    ```js
    beforeEach(function() {
        // beforeEach hook
    });

    beforeEach(function namedFun() {
        // beforeEach:namedFun
    });

    beforeEach("some description", function() {
        // beforeEach:some description
    });
    ```

2. 根级挂钩

    如果将钩子放在 `describe()` 之外添加，这将导致在任何测试用例执行之前都会运行该钩子，例如：

    ```js
    var assert = require("assert");

    beforeEach(function() {
        console.log("before every test in every file");
    });

    describe("Test", function() {
        describe("判断 [1,2,3] 中是否存在 4", function() {
            it("[1,2,3] 中不存在 4", function() {
                assert.equal([1, 2, 3].indexOf(4), -1);
            });
        });
    });

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

    执行测试

    ![20190605102644.png](http://resources.ffstone.top/resource/image/20190605102644.png)

### 延时根套件

    使用场景：需要在一个异步回调之后，在执行测试。
    使用方法：使用 `--delay` 这将附加一个特殊的回调函数 `run()` 到全局的上下文

    ```js
    var result;

    let async_callback = async function() {
        result = await create_promise_fn();
        run();
    };
    async_callback();
    describe("some callback", function() {
        it("shoule do", () => {
            console.log("result：", result);
        });
    });

    function create_promise_fn() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("do something");
            }, 1000);
        });
    }
    ```

    输出：

    ![20190605110920.png](http://resources.ffstone.top/resource/image/20190605110920.png)

### 待测试

    待测试将包含在测试结果中，并标记为待定。待定测试不被视为失败测试。

    ```js
    describe("Array", function() {
        describe("#indexOf()", function() {
            // pending test below
            it("should return -1 when the value is not present");
        });
    });
    ```

    输出：

    ![20190605112612.png](http://resources.ffstone.top/resource/image/20190605112612.png)

### 单独测试与忽略测试

我们可以使用 `.only()` 来指定执行哪些测试，这种行为是具有排他性的

```js
describe("Array", function() {
    describe("#indexOf()", function() {
        it.only("should return -1 unless present", function() {
            console.log("this test will be run");
        });

        it.only("should return the index when present", function() {
            console.log("this test will also be run");
        });

        it("should return -1 if called with a non-Array context", function() {
            console.log("this test will not be run");
        });
    });
});
```

![20190605132244.png](http://resources.ffstone.top/resource/image/20190605132244.png)

> `.only()` 还可以使用在 describe 后

与 `.only()` 相似的还有 `.skip()` 测试，我们还可以在内部使用 `this` 调用 `skip`，这样我们可以制定测试的先行条件

```js
it("should only test in the correct environment", function() {
    if (false) {
        console.log("make assertions");
    } else {
        // 调用this.skip()将有效中止测试。
        this.skip();
    }
});
```

![20190605132850.png](http://resources.ffstone.top/resource/image/20190605132850.png)

### 测试持续时间

在 mocha 中存在默认的时间规定，超过一定的时间以后将会显示提示，表明运行事件是否比较缓慢。但有的时候我们想自己规定多慢是缓慢，我们可以使用 `this.slow(<time>)` 来设置，缓慢的限度

```js
describe("SyncTest", function() {
    this.slow(10000);
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

### 超时

在异步回调的情况下，我们希望不要一直等待回调执行，而是需要在一定时间后，异步还没有执行的话。就抛出错误提示

```js
describe("SyncTest", function() {
    this.timeout(100);
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

![20190605134341.png](http://resources.ffstone.top/resource/image/20190605134341.png)

> 如果写入 `this.timeout(0)` 将会取消时间上的限制

## 参考文章

-   [mocha](https://mochajs.cn/#installation)
-   [TDD/BDD](https://www.cnblogs.com/ustbwuyi/archive/2012/10/26/2741223.html)
