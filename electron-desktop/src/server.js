const express = require("express");
const cors = require("cors");
const path = require("path");

const server = express();
  
server.get("/api/heart-beat", (request, response) => { 
  response.setHeader("Content-Type", "application/json");
  response.status(200);
  response.send(JSON.stringify({
    server: "electron-desktop.express-js"
  }));
});

const startServer = function(PORT, done) {
  server.use(express.json({ limit: "100mb" }));
  server.use(cors());
  server.use(express.static(path.join(__dirname, "../build")));

  server.listen(PORT, async () => {
    console.log("Server started on PORT", PORT);
    if (done) {
      done();
    }
  });
};

module.exports.startServer = startServer;
