const { Client } = require("@notionhq/client");
const fs = require("fs");

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = "623dfa60b8e64eeca34b06d2207a0aff";
const PAGE_ID = "8b07763d79ed45bebbdeecae10128ec4";

async function makeMeAJSON(input) {
  // convert JSON object to a string
  const data = JSON.stringify(input, null, 4);

  // write file to disk
  fs.writeFile("./output.json", data, "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully!`);
    }
  });
}

// Initializing a client
const notion = new Client({
  auth: NOTION_TOKEN,
});

async function readDatabase() {
  console.log("Reading database...");
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
    });
    console.log(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
}

async function readPage(page_id) {
  try {
    const page = await notion.pages.retrieve({
      page_id,
    });
    return page;
  } catch (error) {
    console.log(error);
  }
}

async function readProperty(page_id, property_id) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id,
      property_id,
    });
    return sanitizeProperty(response, response.type);

  } catch (error) {
    console.log(error);
  }
}

function sanitizeProperty(response, property_type) {
  switch (property_type) {
    case "created_time":
      return response.created_time;
    case "multi_select":
      return response.multi_select;
    case "property_item":
      return sanitizePropertyItem(response, response.property_item.type);
  }
}

function sanitizePropertyItem(response, propertyItem_type) {
  switch (propertyItem_type) {
    case "title":
      return response.results[0].title.plain_text;
    case "rich_text":
      return response.results[0].rich_text.plain_text;
    case "relation":
      return response.results;
    default:
      return response;
  }
}

async function readPageExtended(page_id) {
  let page = await readPage(page_id);
  let { properties } = page;
  let extended_page = {};
  for (let key in properties) {
    let property = await readProperty(PAGE_ID, properties[key].id);
    extended_page[key] = property;
  }
  makeMeAJSON(extended_page);
  return extended_page;
}
readPageExtended(PAGE_ID);
