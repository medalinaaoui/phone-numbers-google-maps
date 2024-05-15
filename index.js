import puppeteer from "puppeteer";

const getTargetInfo = async (url) => {
  const browser = await puppeteer.launch({ timeout: 90000 });
  const page = await browser.newPage();
  await page.goto(url);
  const target = await page.evaluate(() => {
    const phoneElement = document.querySelector(
      "button[data-item-id^='phone:tel']"
    );
    const name = document.querySelector(".bJzME .k7jAl h1.DUwDvf");
    if (phoneElement && name) {
      return {
        name: name.textContent,
        phone: phoneElement.textContent.substring(1),
      };
    } else {
      return null;
    }
  });

  await browser.close();
  console.log(target);
  return target;
};

// getTargetInfo("");

import fs from "fs";
import rl from "readline";

const targets = [];

// Function to process CSV file
async function processCSV(filename) {
  try {
    // Open the CSV file
    const fileStream = fs.createReadStream(filename);

    // Create an interface to read line by line
    const readline = rl.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    // Read each line and process it
    for await (const line of readline) {
      // Split the line by comma
      const record = line.split(",");

      // Extract the Google Maps link from the record
      const googleMapsLink = record[7].replace(/^"(.*)"$/, "$1");

      // perform further actions with the link here

      if (isValidUrl(googleMapsLink)) {
        const result = await getTargetInfo(googleMapsLink);
        targets.push(result);
      }
    }

    // console.log("CSV file successfully processed");
    console.log(targets);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function with the CSV file name
processCSV("google-maps-data.csv");

function isValidUrl(url) {
  const trimmedUrl = url.trim(); // Remove surrounding double quotes
  return trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://");
}
