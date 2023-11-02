const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");
function particular_repo(topic_name, repo_name, url) {
  request(url, (err, resp, html) => {
    if (err) {
      console.log("error");
    } else if (resp.statusCode == 404) {
      console.log("No page found");
    } else {
      game_start(topic_name, repo_name, html);
    }
  });
}
function game_start(topic_name, repo_name, html) {
  const $ = cheerio.load(html);
  const issues_started = $(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
  let arr = [];
  for (let i = 0; i < issues_started.length; i++) {
    const issues_started_href =
      "https://github.com" + issues_started.eq(i).find("a").attr("href");
    arr.push(issues_started_href);
    // console.log(issues_started_href);
  }
  let dir_path = path.join(__dirname, topic_name);
  dirCreator(dir_path);
  let filepath = path.join(dir_path, repo_name + ".pdf");
  // fs.writeFileSync(filepath, JSON.stringify(arr));
  let pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream(filepath));
  pdfDoc.text(JSON.stringify(arr));
  pdfDoc.end();
}
function dirCreator(dir_path) {
  if (fs.existsSync(dir_path) == false) {
    fs.mkdirSync(dir_path);
  }
}
module.exports = particular_repo;
