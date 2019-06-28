# VSCode 使用小技巧

**强制可折叠区域**

使用

```md
// #region
这里的内容可以被折叠
// #endregion
```

**Promise 转换 async**

```js
let timePromise = new Promise(res => {
    setTimeout(() => {
        res({ name: "小明" });
    }, 1000);
});

function example() {
    return timePromise
        .then((res: { name: string }) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}

example();
```

![20190621114314.png](http://resources.ffstone.top/resource/image/20190621114314.png)

输出：

```js
let timePromise = new Promise(res => {
    setTimeout(() => {
        res({ name: "小明" });
    }, 1000);
});

async function example() {
    try {
        const res = await timePromise;
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

example();
```

**Refactor To ES6**

```js
function test() {
    this.name = test;
}
test.prototype.sayHi = function() {
    console.log("hi");
};

let aTest = new test();
aTest.sayHi();
```

![20190621120507.png](http://resources.ffstone.top/resource/image/20190621120507.png)

输出：

```js
class test {
    constructor() {
        this.name = test;
    }
    sayHi() {
        console.log("hi");
    }
}

let aTest = new test();
aTest.sayHi();
```

## 参考

[VS Code 能做到 35 件事情](https://www.vscodecandothat.com/)
