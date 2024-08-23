const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World"
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});