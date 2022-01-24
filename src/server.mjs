import express from "express";
const app = express();
import path from "path";
import fetch from "node-fetch";
import cheerio from "cheerio";
const PORT = process.env.PORT || 8000;
import fs from "fs";
const pathToFile = "./data/planetSystemDescription.json";

app.use(express.static("./"));

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/loadPlanets", (request, response) => {
  const distance = request.query.distance;
  fetch(
    `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,sy_dist,sy_pnum,pl_orbper,rowupdate,pl_massj,pl_bmassj,disc_facility,pl_masse,pl_bmasse,pl_refname,ra,dec+from+ps+where+${distance}+order+by+sy_dist&format=json`
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

app.get("/getWebsiteText", async (request, response) => {
  const link = request.query.link;
  const plName = request.query.plName;

  const anyRecord = await readFile(plName);
  if (anyRecord) {
    response.send(anyRecord);
    return;
  }

  fetch(link)
    .then((response) => {
      // debugger =>>> TOO MANY REQUESTS!
      return response.text();
    })
    .then((body) => {
      // debugger
      const x = cheerio.load(body);
      const planetDesctiption = x("[name='description']")[0]?.attribs?.content;
      console.log(planetDesctiption); // logs to server
      response.send(planetDesctiption); // sends to frontend
      cacheData(planetDesctiption, plName);
    })
    .catch((err) => console.log(err));
});

async function cacheData(desc, plName) {
  const rawData = fs.readFileSync(pathToFile);
  const convertedData = JSON.parse(rawData);
  convertedData.planetarySysDescrip[plName] = desc;
  const json = JSON.stringify(convertedData);
  fs.writeFileSync(pathToFile, json);
  console.log("Caching data...");
}

async function readFile(plName) {
  if (!fs.existsSync(pathToFile)) {
    console.log("File not found");
    const data = { planetarySysDescrip: {} };
    const json = JSON.stringify(data);
    fs.writeFileSync(pathToFile, json);
    return undefined;
  } 

  const rawData = fs.readFileSync(pathToFile);
  const data = JSON.parse(rawData);
  if (!data?.planetarySysDescrip[plName]) {
    console.log("no data");
    return undefined;
  }

  return data?.planetarySysDescrip[plName];
}

app.listen(PORT, () => {
  // console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
