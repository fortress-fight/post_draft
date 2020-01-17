# 使用 IntersectionObserver 检测 DOM 的可见性

`Intersection Observer API` 提供了一种异步观察目标元素与祖先元素或顶级文档视口交叉的方法。

## 介绍

历史上，检测元素的可见性或两个元素相对于彼此的相对可见性一直是难以解决的问题, 其中解决方案不可靠并且易于导致浏览器和用户访问的站点变得迟缓。

过去的解决方案主要是检测涉及事件处理程序和循环调用方法，如 `Element.getBoundingClientRect()` 为每个受影响的元素构建所需的信息。由于所有这些代码都在**主线程上运行**，因此即使其中一个代码也会导致性能问题。当一个站点加载这些测试时，事情就会变得非常丑陋。

`Intersection Observer API` 允许代码注册一个回调函数，该函数在他们希望监视的元素进入或退出另一个元素（或视口）时执行，或者当两者相交的数量按请求的数量变化时执行。这样，站点不再需要在主线程上执行任何操作来观察这种元素交集，并且浏览器可以自由地优化交叉点的管理。

> 交点观察者 API 无法告诉您一件事：重叠的具体像素数或具体的像素数; 然而，它涵盖了更常见的用例 “如果它们在 N％附近相交，我需要做点什么。”

## Intersection Observer API

key:

-   目标元素
-   目标元素与设备视口或者指定元素相交时调用的回调
-   目标与其根之间的的交叉度, 是目标元素的百分比

设备视口或者指定元素在这里我们称为根元素或者根, 如果元素不是可滚动元素的后代, 则视口需要指定为 `null`

**创建交叉点观察者**

`new IntersectionObserver(callback, options)`

**Options**

-   `root` 用作视口的元素，用于检查目标的可见性。必须是目标的祖先。如果未指定，则默认为浏览器视口 null。
-   `rootMargin` 根部附近的检测偏移。可以具有与 CSS margin 属性类似的值，例如 “10px 20px 30px 40px"（top，right，bottom，left）。值可以是百分比。这组值用于在计算交叉点之前增大或缩小根元素的边界框的每一边。默认为全零。
-   `threshold` Array | Number，表示目标可见性的百分比, 用于观察者判断是否需要指定回调行为。如果您只想检测可见性何时超过 50％标记，则可以使用值 0.5。如果希望每次可见性再次传递 25％时运行回调，则应指定数组[0,0.25,0.5,0.75,1]。默认值为 0（意味着只要一个像素可见，就会运行回调）。值 1.0 表示在每个像素可见之前不会考虑阈值。

示例:

```js
var options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 1.0
};

var observer = new IntersectionObserver(callback, options);
```

**观察目标**

在建立了观察者之后, 我们需要对观察者添加观察目标

示例:

```js
observer.observe(document.querySelector("#listItem"));
```

只要目标满足为其指定的阈值，就会调用回调。回调接收 IntersectionObserverEntry 对象列表和观察者：

```js
var callback = function(entries, observer) {
    entries.forEach(entry => {
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
    });
};
```

| column0            | column1                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| time               | 可见性发生变化的时间，是一个高精度时间戳，单位为毫秒                                                             |
| target             | 被观察的目标元素，是一个 DOM 节点对象                                                                            |
| rootBounds         | 根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null |
| boundingClientRect | 目标元素的矩形区域的信息                                                                                         |
| intersectionRect   | 目标元素与视口（或根元素）的交叉区域的信息                                                                       |
| intersectionRatio  | 目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0     |

## 参考

[intersection-observer-polyfill](https://www.npmjs.com/package/intersection-observer-polyfill)
