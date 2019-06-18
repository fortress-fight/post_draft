# ES9

-   reset/spreed 属性
-

## reset/spreed 属性

**spreed 运算符**

在 ES6 中，提供了新的运算符 `...` (spreed 运算符)，在 ES9 中，加强了该运算符的能力，使其可以在对象中使用。

示例:

```js
const people = {
    name: "小明",
    age: "20"
};

const student = {
    ...people,
    job: "student"
};

console.log(student);
// { name: '小明', age: '20', job: 'student' }
```

特点

1. 在使用 spreed 实现对象的复制的时候，只复制可枚举属性;

    ```js
    const car = {
        color: "blue"
    };

    Object.defineProperty(car, "type", {
        value: "coupe",
        enumerable: false
    });

    console.log(Object.assign({}, car).type);
    // undefined

    console.log({ ...car }.type);
    // undefined
    ```

2. 在使用 spreed 实现对象的复制的时候，不会继承原有对象上的 set 属性

    ```js
    const car = {
        color: ""
    };

    Object.defineProperty(car, "color", {
        set() {
            console.log("type set called");
        },
        get() {
            return "blue";
        }
    });

    car.color = "green";
    // type set called

    console.log((Object.assign({}, car).color = "red"));
    // red

    console.log(({ ...car }.color = "red"));
    // red
    ```

3. 将会忽略继承属性

    ```js
    const car = {
        color: "blue"
    };

    const coupeCar = Object.create(car, {
        type: {
            value: "coupe",
            enumerable: true
        }
    });

    console.log(coupeCar.color);
    // blue

    console.log({ ...coupeCar }.color);
    // undefined
    ```

**reset 参数**

在 ES9 中对对象实现了类似于 ES6 中数组解构赋值的功能

```js
const car = {
    name: "blueCar",
    color: "blue",
    type: "coupe",
    sit: "four"
};

const { name, ...blueCarAttr } = car;
console.log(blueCarAttr);
// { color: 'blue', type: 'coupe', sit: 'four' }
```

## 异步迭代

在 ES6 中提供了迭代器：`[Symbol.iterator]` (具有正确的 \[Symbol.iterator\] 属性，则它可变为可迭代对象) 示例：

```js
const car = {
    name: "blueCar",
    color: "blue",
    type: "coupe",
    sit: "four",
    [Symbol.iterator]: function*() {
        for (const attr in car) {
            if (car.hasOwnProperty(attr)) {
                yield "car-" + attr + ":" + this[attr];
            }
        }
    }
};

for (const attr of car) {
    console.log(attr);
}

/**
    car-name:blueCar
    car-color:blue
    car-type:coupe
    car-sit:four
 */
```

迭代器的缺点是不适合异步数据源，在 ES9 中提供了异步迭代器和异步迭代对象。和 ES6 中的迭代器不同点在于，ES6 返回的是 {value, done} 形式的普通对象，而是返回一个完成的 Promise 对象。

ES9 提供了配合使用异步迭代器实现循环调用的方法 -- `for...await...of`:

`for...await...of` 语句隐式调用集合对象上的 `Symbol.asyncIterator` 方法以获取异步迭代器。 每次循环时，都会调用迭代器的 next() 方法，该方法返回一个 promise. 一旦 promise 完成，就会将结果对象的 value 属性读取到 x 变量。 循环继续，直到返回对象的 done 属性值为 true.

```js
const car = {
    name: "blueCar",
    color: "blue",
    type: "coupe",
    sit: "four",
    [Symbol.asyncIterator]: function() {
        let i = 0;
        return {
            next: () => {
                let result = this[Object.keys(this)[i++]];
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        res({
                            value: result,
                            done: i >= Object.keys(this).length
                        });
                    }, 1000);
                });
            }
        };
    }
};

(async function() {
    try {
        for await (const v of car) {
            console.log(v);
        }
    } catch (err) {
        console.log(err);
    }
})();
```

我们还可以配合迭代器使用

```js
const car = {
    name: "blueCar",
    color: "blue",
    type: "coupe",
    sit: "four",
    [Symbol.asyncIterator]: async function*() {
        let i = 0;
        while (i < Object.keys(this).length) {
            yield await new Promise((res, rej) => {
                let result = this[Object.keys(this)[i++]];
                setTimeout(() => {
                    res(result);
                }, 1000);
            });
        }
    }
};

(async function() {
    try {
        for await (const v of car) {
            console.log(v);
        }
    } catch (err) {
        console.log(err);
    }
})();
```

> next() 方法可能会返回 rejected promise. 为了优雅地处理被 reject 的 promise,你可以使用 try...catch 语句包裹 for...await...of 语句，如下所示：

## Promise.prototype.finally

与 then() 和 catch() 相同，finally() 方法总是返回一个 promise，因此你可以链接更多的方法。 一般来说，我们会将 finally() 作为最后一环。但某些情况，例如在创建 HTTP 请求时，在 finally() 之后链接另一个 catch(),以处理请求中可能发生的错误是不错的实践。

示例：

```js
fetch("http://www.baidu.com/")
    .then(res => console.log(res))
    .catch(err => console.log("ERR:" + err))
    .finally(() => alert("运行结束"));
```

## RegExp 新特性

**s（dotAll）标志**

之前的 `.` 能够匹配的是除换行符之外的任何字符，使用了 s 标志标明 `.` 可以匹配包含换行符的任何字符；

```js
let reg = /^.+$/;
let sReg = /^.+$/s;

console.log(reg.test("name\nage"));
// false

console.log(sReg.test("name\nage"));
// true
```

**可命名捕获组**

在一些正则表达式模式中，使用数字来引用捕获组可能会造成混淆

```js
const reg = /(\d{4})-(\d{2})-(\d{2})/;
const match = reg.exec("2019-01-10");

console.log(match[0]); // 2019-01-10
console.log(match[1]); // 2019
console.log(match[2]); // 01
console.log(match[3]); // 10
```

在 ES9 中提供了新的方式 `(?<name>...)` 来对捕获组进行命名，示例：

```js
const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = reg.exec("2019-01-10");

console.log(match.groups); // 2019-01-10
console.log(match.groups.year); // 2019
console.log(match.groups.month); // 01
console.log(match.groups.day); // 10
```

特征

1. 可用 `\k<name>` 语法在模式中再次调用命名捕获组。
2. 可以在 `replace` 中使用 `$<name>` 来对捕获组进行引用

    ```js
    const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    let str = "2019-01-10";

    str = str.replace(reg, "$<day>-$<month>-$<year>");

    console.log(str); // 10-01-2019
    ```

**Lookbehind 断言**

[正则表达式中的断言](https://blog.51cto.com/cnn237111/749047)

正则表达式的先行断言和后行断言一共有 4 种形式：

-   (?=pattern) 零宽正向先行断言(zero-width positive lookahead assertion)
-   (?!pattern) 零宽负向先行断言(zero-width negative lookahead assertion)
-   (?<=pattern) 零宽正向后行断言(zero-width positive lookbehind assertion)
-   (?<!pattern) 零宽负向后行断言(zero-width negative lookbehind assertion)

在匹配过程中，不占用字符，所以被称为“零宽”。

1. `(?=pattern)` 正向先行断言：代表字符串中的一个位置，紧接该位置之后的字符序列能够匹配 pattern。

    ```js
    let str = "a regular expression";
    let reg = /re(?=ssion)/g;
    console.log(reg.exec(str));
    // [ 're', index: 13, input: 'a regular expression', groups: undefined ]
    ```

    这里将会匹配后面跟着 `ssion` 的 `re`

2. `(?!pattern)` 负向先行断言：代表字符串中的一个位置，紧接该位置之后的字符序列不能匹配 pattern。

    ```js
    let str = "a regular expression";
    let reg = /re(?!ssion)/g;
    console.log(reg.exec(str));
    // [ 're', index: 2, input: 'a regular expression', groups: undefined ]
    ```

3. (?<=pattern) 正向后行断言：代表字符串中的一个位置，紧接该位置之前的字符序列能够匹配 pattern。

    ```js
    let str = "a regular expression";
    let reg = /(?<=\s)e/g;
    console.log(reg.exec(str));
    // [ 'e', index: 10, input: 'a regular expression', groups: undefined ]
    ```

4. (?<!pattern) 负向后行断言：代表字符串中的一个位置，紧接该位置之前的字符序列不能匹配 pattern。

    ```js
    let str = "a regular expression";
    let reg = /(?<!\s)e/g;
    console.log(reg.exec(str));
    // [ 'e', index: 3, input: 'a regular expression', groups: undefined ]
    ```

**Unicode 属性转义**

当需要匹配 Unicode 属性转移字符的时候，
可以使用 `\p{Number}` 匹配数字 例如：`㉛`，
可以使用 `\p{Alphabetic}` 匹配字符 例如：`اللغة العربية`，

## 模板字符串修订

当模板字符串紧跟在表达式之后时，它会被称为标记模板字符串。 当你想要使用函数解析模板字符串时，标记模板会派上用场。 看看这个例子：

```js
function fn(string, substitute) {
    console.log(arguments, string, substitute);
    // { '0': [ '', ' was a major update' ], '1': 'ES6' } [ '', ' was a major update' ] ES6
    let name = substitute === "ES6" ? "ES2015" : substitute;
    return name + " was a major update";
}
let version = "ES6";
let str = fn`${version} was a major update`;
console.log("str:", str);
//  ES2015 was a major update
```

在 ES9 之前，标记的模板字符串具有与转义序列相关的语法限制。 反斜杠后跟某些字符序列被视为特殊字符：\x 被解析为十六进制转义符，\u 被解析为 unicode 转义符，\_ 后跟一个数字被解析为八进制转义符。 因此，解释器将诸如 "C:\xxx\uuu" 或 "\ubuntu" 之类的字符串视为无效的转义序列，并将抛出 SyntaxError.

ES9 从标记模板中删除了这些限制，它会将无效转义序列表示为 undefined，而不是抛出错误：

```js
function fn(string, substitute) {
    let name = substitute === "ES6" ? "ES2015" : substitute;
    return name + " " + string[1];
}
let version = "ES6";
let str = fn`${version} \ubuntu c:\file`;
console.log("str:", str);
// str: ES2015 undefined
```

在常规模板字符串中使用非法转义序列仍会报错：

```js
let version = "ES6";
let str = `${version} \ubuntu c:\file`;
// SyntaxError: Invalid Unicode escape sequence
```

## 参考

-   https://juejin.im/post/5c45dffef265da61163a13e2
