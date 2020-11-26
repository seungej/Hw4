require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(express.json());
//Get all Restaurants
app.get("/api/vl/Restaurants", async (req, res) => {

    const results = await db.query("select * from restaurants")
    console.log(results);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["mcdonalds", "wendys"],
        },
    });
});

//get a Restaurant
app.get("/api/vl/restaurants/:id", (req, res) => {
    console.log(req.params);
});

//Create a Restaurant
app.post("/api/vl/restaurants", (req, res) => {
    console.log(req.body);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});