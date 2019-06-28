function test() {
    this.name = test;
}
test.prototype.sayHi = function() {
    console.log("hi");
};

let aTest = new test();
aTest.sayHi();
