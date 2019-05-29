var assert = require("assert");
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
