const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const get_request_repo = require("./get_request_repo");
request(url, cb);

function cb(err, resp, html) {
  if (err) {
    console.log("Error:", err);
  } else if (resp.statusCode == 404) {
    console.log("No page found");
  } else {
    open_3_topics(html);
  }
}

function open_3_topics(html) {
  const $ = cheerio.load(html);
  const anchor_array = $(
    ".no-underline.d-flex.flex-column.flex-justify-center"
  );
  const name_array = $(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");

  for (let i = 0; i < anchor_array.length; i++) {
    const particular_anchor =
      "https://github.com" + anchor_array.eq(i).attr("href");
    let name_topic = name_array.eq(i).text().trim();
    // console.log(particular_anchor);
    const send_path = path.join(__dirname, name_topic);
    // console.log(send_path);
    if (fs.existsSync(send_path) == false) {
      // fs.mkdirSync(send_path);
      get_request_repo(particular_anchor, name_topic);
    }
  }
}
