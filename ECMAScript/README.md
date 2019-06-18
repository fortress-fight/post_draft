# ECMAScript

[ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript#cite_note-ES2016-9) 是一种由 Ecma 国际（前身为欧洲计算机制造商协会）通过 ECMA-262 标准化的脚本程序设计语言。这种语言在万维网上应用广泛，它往往被称为 JavaScript 或 JScript，但实际上后两者是 ECMA-262 标准的实现和扩展

ECMAScript 是由 ECMA-262 标准化的脚本语言的名称。 尽管 JavaScript 和 JScript 与 ECMAScript 兼容，但包含超出 ECMAScript 的功能。

## ES 的版本更新

![20190614103105.png](http://resources.ffstone.top/resource/image/20190614103105.png)

[ES7](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-global-object)

可以通过 [ECMA262](https://github.com/tc39/ecma262/blob/master/README.md) 查看特性处于哪个阶段

## ES 新增特性流程

每个 ECMAScript 特性的建议将会从阶段 0 开始， 然后经过下列几个成熟阶段。其中从一个阶段到下一个阶段必须经过 TC39 的批准。

-   stage0: Strawman 初稿

    什么是 Strawman？一个推进 ECMAScript 发展的自由形式的想法。该想法必须由 TC39 的会员提交，如果是非会员则必须注册成为 TC39 贡献者才能提交。
    **条件**：文件必须在 TC39 的会议上通过审议（原文），然后才能加入阶段 0 的建议页面。

-   stage1: Proposal 建议

    什么是 Proposal？一份新特性的正式建议文档。
    **必备条件**：必须确定一位带头人来为负责这份建议。无论是带头人或者联合带头人都必须是 TC39 的会员（原文）。建议要解决的问题必须以简明的文字描述，而解决方案则要给出相应的实例和 API，并详细描述语义及算法。最后，必须指明此建议的潜在问题，例如与其他特性之间的关联，实现难点等。实现方式，polyfills 和 demo 也是需要的。
    **下一步**：通过一个阶段 1 的建议，表明 TC39 愿意研究、讨论并促成该建议。接下来，我们就可以期待该建议的重大改变了。

-   stage2: Draft 草案

    什么是 Draft？草案是规范的第一个版本。其与最终标准中包含的特性不会有太大差别。
    **必备条件**：建议此时必须要附加该特性的语法和语义的正式说明（使用 ECMAScript 标准的形式语言）。说明应该尽可能完善，但可以包含待办事项和占位符。该特性需要两个实验性的实现，其中一个**可以在类似 Babel 的转译器（transpiler）中实现**。
    **下一步**：从该阶段开始只接受增量调整。

-   stage3: Candidate 候选

    什么是 Candidate？候选阶段，建议基本完成，此时将从实现过程和用户使用两方面获取反馈来进一步完善建议。
    **必备条件**：规范文档必须是完整的。指定的评审人（由 TC39 而不是带头人指定）和 ECMAScript 规范的编辑须在规范上签字。还有至少要两个符合规范的实现（不必指定默认实现）。
    **下一步**：此后，只有在实现和使用过程中出现了重大问题才会修改建议。

-   stage4: Finished 完成

    什么是 Finished？建议已经准备就绪，可以添加到标准之中。
    **必备条件**：建议进入完成阶段之前需要满足以下几点：

    -   Test 262 的验收测试（基本上都是 JavaScript 写的用来验证语言特性的单元测试）。
    -   两个通过测试的符合规范的实现。
    -   特性实现相关的重要实践经验。
    -   ECMAScript 规范的编辑在规范文本上的签字。

    **下一步**： 建议将会尽快加入 ECMAScript 规范之中。当规范通过年度审核成为标准，该建议也正式成为标准的一部分。

## 图说 ECMAScript 新标准

![20190614104757.png](http://resources.ffstone.top/resource/image/20190614104757.png)
