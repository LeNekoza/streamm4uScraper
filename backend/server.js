const express = require("express");
const fs = require("fs");
const app = express();

// Define a route that returns the contents of the JSON file
app.get("/data", (req, res) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync("../scraper/movieData.json");
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    // Send the JSON data as the response
    res.json(jsonData);
    console.log(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
