# ES8

[ECMA-ES8](http://www.ecma-international.org/ecma-262/8.0/index.html)

## ES8 新增特性

1. 异步函数
2. `Object.entries()` 和 `Object.values()`
3. 字符串填充 `padStart` 和 `padEnd`
4. `Object.getOwnPropertyDescriptors()`
5. 函数参数列表与调用中的尾部逗号
6. 共享内存和原子（Shared memory and atomics）

## 特性介绍

### 异步函数

异步函数很好的解决了回调函数不断嵌套造成的异步回调的问题；

在 ES6 中，我们通过 Promise 将嵌套示的回调，改成了链式调用

```js
function sleep_100(callback) {
    setTimeout(() => {
        callback && callback();
        console.log("1000MS 后执行");
    }, 1000);
}

function sleep_200(callback) {
    setTimeout(() => {
        callback && callback();
        console.log("2000MS 后执行");
    }, 2000);
}

new Promise((res, rej) => {
    sleep_100(res);
})
    .then(res => {
        sleep_200(res);
    })
    .catch(err => {
        console.log(err);
    });
```

我们可以看到 Promise 的写法只是回调函数的改进，使用 then 方法，只是让异步任务的两段执行更清楚而已。Promise 的最大问题是代码冗余，请求任务多时，一堆的 then，也使得原来的语义变得很不清楚。此时我们引入了另外一种异步编程的机制：Async。

1. `Async`

    一个简单的例子用来说明它的用法：

    ```js
    setTimeout(() => {
        console.log("2500MS 后执行");
    }, 2500);

    const sleep_1000 = function() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(1000);
                console.log("1000MS 后执行");
            }, 1000);
        });
    };
    const sleep_2000 = function() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(2000);
                console.log("3000MS 后执行");
            }, 2000);
        });
    };

    const flow = async function() {
        console.log(await sleep_1000());
        console.log(await sleep_2000());
    };

    flow();
    ```

### `Object.entries()` 和 `Object.values()`

如果一个对象是具有键值对的数据结构，则每一个键值对都将会编译成一个具有两个元素的数组，这些数组最终会放到一个数组中，返回一个二维数组。简言之，该方法会将某个对象的可枚举属性与值按照二维数组的方式返回。若目标对象是数组时，则会将数组的下标作为键值返回。例如

```js
Object.entries({ one: 1, two: 2 });
// [['one', 1], ['two', 2]]

Object.entries([1, 2]);
//[['0', 1], ['1', 2]]
```

### 字符串填充：padStart 和 padEnd

ES8 提供了新的字符串方法-padStart 和 padEnd。padStart 函数通过填充字符串的首部来保证字符串达到固定的长度，反之，padEnd 是填充字符串的尾部来保证字符串的长度的。该方法提供了两个参数：字符串目标长度和填充字段，其中第二个参数可以不填，默认情况下使用空格填充。

```js
"Vue".padStart(10); //'       Vue'
"React".padStart(10); //'     React'
"JavaScript".padStart(10); //'JavaScript'
```

### Object.getOwnPropertyDescriptors()

顾名思义，该方法会返回目标对象中所有属性的属性描述符，该属性必须是对象自己定义的，不能是从原型链继承来的。先来看个它的基本用法：

```js
let obj = {
    id: 1,
    name: "test",
    get gender() {
        console.log("gender");
    },
    set grade(g) {
        console.log(g);
    }
};
Object.getOwnPropertyDescriptors(obj);

//输出结果为：
// {
//   gender: {
//     configurable: true,
//     enumerable: true,
//     get: f gender(),
//     set: undefined
//   },
//   grade: {
//     configurable: true,
//     enumerable: true,
//     get: undefined,
//     set: f grade(g)
//   },
//   id: {
//     configurable: true,
//     enumerable: true,
//     value: 1,
//     writable: true
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//     value: 'test',
//     writable: true
//   }
// }
```

方法还提供了第二个参数，用来获取指定属性的属性描述符。

`Object.getOwnPropertyDescriptors` 方法配合 `Object.defineProperties` 方法，就可以实现正确拷贝。

```js
let obj = {
    id: 1,
    name: "test",
    get gender() {
        console.log("gender");
    }
};
let obj1 = {};
Object.defineProperties(obj1, Object.getOwnPropertyDescriptors(obj));
```

### 函数参数列表与调用中的尾部逗号

该特性允许我们在定义或者调用函数时添加尾部逗号而不报错。

```js
let foo = function(a, b, c) {
    console.log("a:", a);
    console.log("b:", b);
    console.log("c:", c);
};
foo(1, 3, 4);
```

### 共享内存和原子（Shared memory and atomics）

这部分是讲述共享内存的管理，暂时没有搞懂，可以参考：

[「译」内存管理碰撞课程](https://segmentfault.com/a/1190000009878588)
