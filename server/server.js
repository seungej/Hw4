require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/v1/airlines", async (req, res) => {
  try {
    const airlineRatingsData = await db.query(
      "select * from airlines left join (select airlines_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by airline_id) reviews on airlines.id = reviews.airline_id;"
    );

    res.status(200).json({
      status: "success",
      results: airlineRatingsData.rows.length,
      data: {
        airlines: airlineRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v1/airlines/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const airline = await db.query(
      "select * from airlines left join (select airline_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by airline_id) reviews on airlines.id = reviews.airline_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "select * from reviews where airline_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "success",
      data: {
        airline: airline.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a airline

app.post("/api/v1/airlines", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO airlines (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        airline: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update airline

app.put("/api/v1/airlines/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE airlines SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        airline: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete airline

app.delete("/api/v1/airlines/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM airlines where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/airlines/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (airline_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
