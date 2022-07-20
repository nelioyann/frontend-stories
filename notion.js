require("dotenv").config();
const { Client } = require("@notionhq/client");
const fs = require("fs");

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.DATABASE_ID;

async function makeMeAJSON(input, path = "./pages.json") {
  // convert JSON object to a string
  const data = JSON.stringify(input, null, 4);

  // write file to disk
  fs.writeFile(path, data, "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully! to ${path}`);
    }
  });
}

// Initializing a client
const notion = new Client({
  auth: NOTION_TOKEN,
});
notion;

async function readDatabase(database_id) {
  console.log("Reading database...");
  try {
    const response = await notion.databases.query({
      database_id,
    });
    console.log(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  }
}

async function readDatabasePagesId(database_id) {
  console.log("Reading database...");
  try {
    const response = await notion.databases.query({
      database_id,
    });
    return response.results.map((result) => result.id);
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
    return await sanitizeProperty(response, response.type);
  } catch (error) {
    console.log(error);
  }
}

async function sanitizeProperty(response, property_type) {
  switch (property_type) {
    case "created_time":
      return response.created_time;
    case "multi_select":
      return response.multi_select;
    case "url":
      return response.url;
    case "property_item":
      return await sanitizePropertyItem(response, response.property_item.type);
  }
}

async function sanitizePropertyItem(response, propertyItem_type) {
  switch (propertyItem_type) {
    case "title":
      return response.results[0].title.plain_text;
    case "rich_text":
      if (response.results.length > 0) {
        return response.results[0].rich_text.plain_text;
      } else {
        return "";
      }
    case "relation":
      let relation_pageIds = response.results.map(
        (reference) => reference.relation.id
      );
      // let properties_id = ["title"];
      let relation_pages = [];
      for (let pageId of relation_pageIds) {
        let name = await readProperty(pageId, "title");
        let url = await readProperty(pageId, "URL");
        let summary = await readProperty(pageId, "Summary");
        let page = { name, url, summary };
        relation_pages.push(page);
      }
      console.log({relation_pages});
      return relation_pages;
      // return relation_pages;
    default:
      return "something went wrong";
  }
}

async function readPageExtended(page_id) {
  try {
    let page = await readPage(page_id);
    let { properties, url } = page;
    console.log(url);
    let extended_page = { id: page_id };
    for (let key in properties) {
      let property = await readProperty(page_id, properties[key].id);
      extended_page[key.toLowerCase()] = property;
    }
    return extended_page;
  } catch (error) {
    console.log(error);
  }
}

async function fetchDatabase(database_id) {
  try {
    let database_data = [];
    let pagesId = await readDatabasePagesId(database_id);
    for (let pageId of pagesId) {
      let page_data = await readPageExtended(pageId);
      database_data.push(page_data);
    }
    makeMeAJSON(database_data, "./src/_data/stories.json");
  } catch (error) {
    console.log(error);
  }
}

fetchDatabase(DATABASE_ID);
