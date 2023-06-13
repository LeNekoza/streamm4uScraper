const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const PORT = process.env.PORT || 5000;

const app = express();
const url = "https://ww1.streamm4u.net/home";
const headers = { "User-Agent": "customUserAgent" };
//initialize
axios("https://ww1.streamm4u.net/home", { headers })
  .then((res) => {
    const htmlData = res.data;
    const $ = cheerio.load(htmlData);
    const movieObj = {};
    /* const urlObj = {};
    const descObj = {};
    const rateObj = {}; */
    const movieData = [];
    const movieURL = [];
    const movieDesc = [];
    const movieRating = [];
    //console.log($(".tiptitle p").text());
    //for movie title
    $(".tiptitle p", htmlData).each((index, element) => {
      const title = $(element).text();
      movieData.push({ title });
    });
    //for movie url
    $(".imagecover a", htmlData).each((index, element) => {
      const link = "https://ww1.streamm4u.net/" + $(element).attr("href");
      movieURL.push({ link });
    });

    //for movie description
    $(".f-desc", htmlData).each((index, element) => {
      const desc = $(element).text();
      movieDesc.push({ description: desc });
    });

    //for movie rating
    $(".quality", htmlData).each((index, element) => {
      const rate = $(element).text();
      movieRating.push({ rating: rate });
    });

    for (let i = 0; i < movieData.length; i++) {
      movieData[i][`link`] = movieURL[i].link;
      movieData[i][`description`] = movieDesc[i].description;
      movieData[i][`rating`] = movieRating[i].rating;
    }

    console.log(movieData);
  })

  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
