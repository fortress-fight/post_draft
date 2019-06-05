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
