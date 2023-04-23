const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.json({ success: true });
});

app.post("/login", function (req, res) {
    const success =
        req.body.username === "admin" && req.body.password === "1234";
    if (success) {
        res.status(200);
    } else {
        res.status(401);
    }
    res.send();
});

app.post("/register", function (req, res) {
    res.json({ id: "new-generated-id" });
});

app.listen(5050, function () {
    console.log("starting wbox-forms test server");
});

app.post("/file", async function (req, res) {
    
    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    await sleep(3000);

    const fileName =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    res.json({ fileName });
});
