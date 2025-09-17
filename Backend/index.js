import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello everyone!");
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
