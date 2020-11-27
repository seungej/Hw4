require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(express.json());
//Get all Restaurants
app.get("/api/vl/Restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/vl/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);

        res.status(200).json({
            status:"success",
            data: {
                restaurant: result.row[0],
            },
        });
    } catch (err) {
        console.log(err)
    }

});

//get a Restaurant
app.post("/api/vl/restaurants/:id", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.row[0],
            },
        });
    } catch (err) {
        console.log(err)
    }
});

//Create a Restaurant
app.put("/api/vl/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);

        console.log(results)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
});

app.delete("/api/vl/restaurants/:id", async (req, res) => {
    try {
        const results = db.query("DELETE FROM restaurants where id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});