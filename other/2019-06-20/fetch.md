# 使用 Fetch

Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的部分，例如请求和响应。

这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。Fetch 还提供了单个逻辑位置来定义其他 HTTP 相关概念，例如 CORS 和 HTTP 的扩展。

请注意，fetch 规范与 jQuery.ajax()主要有两种方式的不同：

-   当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
-   默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。自从 2017 年 8 月 25 日后，默认的 credentials 政策变更为 same-originFirefox 也在 61.0b13 中改变默认值

## 使用细节

**语法**

> Promise<Response> fetch(input[, init]);

**简单使用**

```js
fetch("./data.json")
    .then(res => {
        // 1️⃣
        console.log(res);
        return res.json();
    })
    .then(res => {
        console.log(res);
        // {name: "fetch"}
    })
    .catch(err => {
        console.log(err);
    });
```

1️⃣
![20190620114014.png](http://resources.ffstone.top/resource/image/20190620114014.png)

可以看到请求的结果中，并不直接输出数据，而是一个 HTTP 响应，为了获取 JSON 的内容，我们需要使用 json() 方法

## Fetch 参数

fetch() 接受第二个可选参数，一个可以控制不同配置的 init 对象：

**init** --- 一个配置项对象，包括所有对请求的设置。可选的参数有：

-   method: 请求使用的方法，如 GET、POST。
-   headers: 请求的头信息，形式为 Headers 的对象或包含 ByteString 值的对象字面量。
-   body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
-   mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
-   credentials: 请求的 credentials，如 omit、same-origin 或者 include。为了在当前域名内自动发送 cookie ， 必须提供这个选项， 从 Chrome 50 开始， 这个属性也可以接受 FederatedCredential 实例或是一个 PasswordCredential 实例。
-   cache: 请求的 cache 模式: default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
-   redirect: 可用的 redirect 模式: follow (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误), 或者 manual (手动处理重定向). 在 Chrome 中，Chrome 47 之前的默认值是 follow，从 Chrome 47 开始是 manual。
-   referrer: 一个 USVString 可以是 no-referrer、client 或一个 URL。默认是 client。
-   referrerPolicy: Specifies the value of the referer HTTP header. May be one of no-referrer、 no-referrer-when-downgrade、 origin、 origin-when-cross-origin、 unsafe-url 。
-   integrity: 包括请求的 subresource integrity 值 （ 例如： sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。

### 使用示例

**发送带凭据的请求**

为了让浏览器发送包含凭据（cookie）的请求（即使是跨域源），要将 credentials: 'include'添加到传递给 fetch()方法的 init 对象。

```js
fetch("https://example.com", {
    credentials: "include"
});
```

-   credentials 可选值：
    -   `include` 包含凭据
    -   `same-origin` 同源时携带凭据
    -   `omit` 禁止携带凭据

**检测请求是否成功**

如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。类似以下代码：

```js
fetch("flowers.jpg")
    .then(function(response) {
        if (response.ok) {
            return response.blob();
        }
        throw new Error("Network response was not ok.");
    })
    .then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    })
    .catch(function(error) {
        console.log(
            "There has been a problem with your fetch operation: ",
            error.message
        );
    });
```

## Headers

使用 Headers 的接口，你可以通过 Headers() 构造函数来创建一个你自己的 headers 对象。一个 headers 对象是一个简单的多名值对：

```js
var content = "Hello World";
var myHeaders = new Headers({
    "Content-Type": "text/plain",
    "Content-Length": content.length.toString()
});
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
```

它的内容可以被获取 `has`, `set`, `append`, `get`, `getAll`, `delete：`:

```js
console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");

console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]

myHeaders.delete("X-Custom-Header");
console.log(myHeaders.getAll("X-Custom-Header")); // [ ]
```

如果使用了一个不合法的 HTTP Header 属性名，那么 Headers 的方法通常都抛出 TypeError 异常。最佳实践是在使用之前检查 content type 是否正确，比如：

## Response 对象

Response 实例是在 fetch() 处理完 promises 之后返回的。

-   Response.status — 整数(默认值为 200) 为 response 的状态码.
-   Response.statusText — 字符串(默认值为"OK"),该值与 HTTP 状态码消息对应.
-   Response.ok — 如上所示, 该属性是来检查 response 的状态是否在 200-299(包括 200,299)这个范围内.该属性返回一个 Boolean 值.

## Body

不管是请求还是响应都能够包含 body 对象. body 也可以是以下任意类型的实例.

-   ArrayBuffer
-   ArrayBufferView (Uint8Array 等)
-   Blob/File
-   string
-   URLSearchParams
-   FormData

Body 类定义了以下方法 (这些方法都被 Request 和 Response 所实现)以获取 body 内容. 这些方法都会返回一个被解析后的 Promise 对象和数据.

-   arrayBuffer()
-   blob()
-   json()
-   text()
-   formData()

request 和 response（包括 fetch() 方法）都会试着自动设置 Content-Type。如果没有设置 Content-Type 值，发送的请求也会自动设值。

## 其它

**特性检测**

Fetch API 的支持情况，可以通过检测 Headers, Request, Response 或 fetch()是否在 Window 或 Worker 域中。例如：

```js
if (self.fetch) {
    // run my fetch request here
} else {
    // do something with XMLHttpRequest?
}
```

**Polyfill**

要在不支持的浏览器中使用 Fetch，可以使用 [Fetch Polyfill](https://github.com/github/fetch)。

## 参考

[使用 fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
