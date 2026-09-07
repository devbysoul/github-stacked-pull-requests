const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url
  );

  const ext = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
  };

  const contentType = contentTypes[ext] || "text/plain";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - File not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
    });

    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`BuildBoard running at http://localhost:${PORT}`);
});