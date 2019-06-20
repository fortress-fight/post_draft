fetch("./test.js")
    .then(res => {
        console.log(res);
        return res.text();
    })
    .then(res => {
        console.log(res);
        // {name: "fetch"}
    })
    .catch(err => {
        console.log(err);
    });
