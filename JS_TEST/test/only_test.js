describe("Array", function() {
    describe("#indexOf()", function() {
        it.only("should return -1 unless present", function() {
            console.log("this test will be run");
        });

        it.only("should return the index when present", function() {
            console.log("this test will also be run");
        });

        it("should return -1 if called with a non-Array context", function() {
            console.log("this test will not be run");
        });
    });
});
