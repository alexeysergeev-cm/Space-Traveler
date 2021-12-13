import express from "express";
const app = express();
import path from "path";
import fetch from "node-fetch";
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static("./"));

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// create route to get single book by its isbn
app.get("/loadPlanets", (request, response) => {
  fetch(
    `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,sy_dist,sy_pnum,pl_orbper,rowupdate,pl_massj,disc_facility,pl_masse,pl_bmasse,ra,dec+from+ps+where+sy_dist+<+5+order+by+sy_dist&format=json`
  )
    .then((response) => {
      return response.text();
    })
    .then((body) => {
      let results = JSON.parse(body);
      console.log(results); // logs to server
      response.send(results); // sends to frontend
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  // console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
