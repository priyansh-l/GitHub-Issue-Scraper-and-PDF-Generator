const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const p_repo = require("./particular_repo");
function open_8_topics(particular_anchor, name_topic) {
  request(particular_anchor, (err, resp, html) => {
    if (err) console.log("error");
    else if (resp.statusCode == 404) {
      console.log("No page found");
    } else {
      getting_8_topics(html, name_topic);
    }
  });
}
function getting_8_topics(html, name_topic) {
  const $ = cheerio.load(html);
  const heading = $(".f3.color-fg-muted.text-normal.lh-condensed ");
  const issues_section = $(".tabnav-tabs");
  // console.log(name_topic);
  for (let i = 0; i < Math.min(heading.length, 8); i++) {
    const issues = issues_section.eq(i).find("li");
    let anchor_for_issue = issues.eq(1).find("a");
    anchor_for_issue = "https://github.com" + anchor_for_issue.attr("href");
    const name_repo =
      heading.eq(i).find("a").eq(0).text().trim() +
      "_" +
      heading.eq(i).find("a").eq(1).text().trim();
    // console.log(name_repo);
    // console.log(anchor_for_issue);
    p_repo(name_topic, name_repo, anchor_for_issue);
  }
  console.log("----------------------");
}
module.exports = open_8_topics;
