import puppeteer from "puppeteer";
import clipboardy from "clipboardy";

const getTargetInfo = async (url) => {
  const browser = await puppeteer.launch({ timeout: 90000 });
  const page = await browser.newPage();
  await page.goto(url);
  const target = await page.evaluate(() => {
    const html = document.querySelector(".XltNde.tTVLSc [jstcache='3']");
    // const name = document.querySelector(".bJzME .k7jAl h1.DUwDvf");
    if (html) {
      return html.outerHTML;
    } else {
      return null;
    }
  });

  await browser.close();
  console.log(target);

  if (target) {
    // Copy the HTML content to clipboard
    clipboardy.writeSync(target);
    console.log("HTML copied to clipboard.");
  } else {
    console.log("No target found to copy.");
  }

  return target;
};

getTargetInfo(
  "https://www.google.com/maps/place/Le+Petit+Olivier/data=!4m7!3m6!1s0xdafefaaa7f7ab57:0x297221e4167dfd7c!8m2!3d31.6383825!4d-8.0159909!16s%2Fg%2F11fsk48crf!19sChIJV6v3p6rvrw0RfP19FuQhcik?authuser=0&hl=fr&rclk=1"
);
