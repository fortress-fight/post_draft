# ES7

## ES7 特性

ES7 中只新增了两个特性：

1. `Array.prototype.include()`
2. 指数运算符

## 特性介绍

1. `Array.prototype.includes()`

    - 判断数据中是否包含某项数据，类似于 `indexOf`，但是会返回布尔值，更易使用

        ```js
        [1, 2, 3, 4, 5].indexOf(1);
        [1, 2, 3, 4, 5].includes(1);
        ```

        ![20190614110427.png](http://resources.ffstone.top/resource/image/20190614110427.png)

    - `includes` 可以找到 NaN

        ![20190614111610.png](http://resources.ffstone.top/resource/image/20190614111610.png)

    - `includes` 不会区分 `+0` 与 `-0`

        ![20190614111500.png](http://resources.ffstone.top/resource/image/20190614111500.png)

    - 类数组也可以使用 `includes` 方法

2. `指数运算符`

    - 使用运算符 `**` 替换了 `Math.pow(x,y)`

        ```js
        2 ** 3;
        // 8
        ```
