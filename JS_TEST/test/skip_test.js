it("should only test in the correct environment", function() {
    if (false) {
        console.log("make assertions");
    } else {
        this.skip();
    }
});
