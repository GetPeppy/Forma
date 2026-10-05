// Minimal static file server for Railway (no dependencies).
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "public");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

function send(res, status, file) {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Page not found");
    }
    res.writeHead(status, {
      "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(data);
  });
}

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/health") { res.writeHead(200); return res.end("ok"); }
  if (urlPath.endsWith("/")) urlPath += "index.html";
  if (!path.extname(urlPath)) urlPath += ".html";          // /training -> training.html
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.access(file, fs.constants.R_OK, (err) =>
    err ? send(res, 404, path.join(ROOT, "index.html")) : send(res, 200, file)
  );
}).listen(PORT, "0.0.0.0", () => console.log(`Forma Hub running on port ${PORT}`));
