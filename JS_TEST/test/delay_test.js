var result;

let async_callback = async function() {
    result = await create_promise_fn();
    run();
};
async_callback();
describe("some callback", function() {
    it("shoule do", () => {
        console.log("result：", result);
    });
});

function create_promise_fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("do something");
        }, 1000);
    });
}
