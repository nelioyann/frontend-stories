require("dotenv").config();
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");

// Retrieve tokens necessary for linking with the notion DB
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.DATABASE_ID;

async function createFile(data, path = "./pages.json") {
  // write file to disk
  fs.writeFile(path, data, "utf8", (err) => {
    if (err) {
      throw Error(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully! to ${path}`);
    }
  });
}

// Initialize a notion client passing notion client to the option
const notion = new Client({
  auth: NOTION_TOKEN,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Query a notion database
 * @param string database_id
 * @returns  A list of page ids
 */
async function getDatabasePagesId(database_id) {
  try {
    const response = await notion.databases.query({
      database_id,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "Slugs",
            rich_text: {
              is_not_empty: true,
            },
          },
        ],
      },
    });
    return response.results.map((result) => result.id);
  } catch (error) {
    throw Error(
      `Unable to retrieve ids from database.\n db_id: ${database_id}`
    );
  }
}

async function readPage(page_id) {
  try {
    const page = await notion.pages.retrieve({
      page_id,
    });
    return page;
  } catch (error) {
    throw Error(`Unable to retrieve notion page.\n page_id: ${page_id}`);
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
    throw Error(`Unable to read property property_id:${property_id}`);
  }
}

async function sanitizeProperty(response, property_type) {
  // https://developers.notion.com/reference/property-object
  // TODO: Add remaining property types
  // TODO: Turn into cycle to handle all property types
  switch (property_type) {
    case "created_time":
      return response.created_time;
    case "last_edited_time":
      return response.last_edited_time;
    case "multi_select":
      return response.multi_select;
    case "select":
      return response.select;
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
        let page = await getPageProperties(pageId, "MINIMIZE");
        relation_pages.push(page);
      }
      return relation_pages;
    default:
      return "something went wrong";
  }
}

async function getPageProperties(page_id, scope = "MAXIMIZE") {
  try {
    let page = await readPage(page_id);
    let { properties, url, cover, icon } = page;
    let page_properties = {};
    let ignoreThese = [
      "Description",
      "Summary",
      "Type",
      "Tags",
      "Topics",
      "Cite",
      "Created time",
    ];

    if (scope === "MAXIMIZE") {
      page_properties = {
        id: page_id,
        cover: cover?.external.url?.split("?")[0],
        notion_url: url,
        icon: icon?.emoji,
      };
      ignoreThese = ["Topics", "Status", "Type"];
    }
    // console.log(properties)
    // console.log(Object.keys(properties).filter(p => ignoreThese.includes(p)))
    for (let key in properties) {
      if (!ignoreThese.includes(key)) {
        let property = await readProperty(page_id, properties[key].id);
        page_properties[key.toLowerCase()] = property;
      }
    }
    // console.log("Properties", page_properties)
    return page_properties;
  } catch (error) {
    console.log(error);
  }
}

function propertiesToFrontmatter(properties) {
  // 1. Destructure all properties
  const { id, cover, notion_url, icon, edited, created, slugs, name } =
      properties,
    tags = "findings",
    category = properties.category.name,
    source_citations = properties.references.map((r) => r.citation),
    source_urls = properties.references.map((r) => r.url),
    source_names = properties.references.map((r) => r.name),
    simpleProps = {
      id,
      cover,
      notion_url,
      icon,
      edited,
      created,
      slugs,
      name,
      category,
      tags,
    },
    arrayProps = { source_citations, source_names, source_urls };
  // 2. Turn properties into frontmatter properties
  // -- spaces matter
  const simplePropsMd = Object.keys(simpleProps).reduce(
    (final, current) => final + `${current}: '${simpleProps[current]}' \n`,
    ""
  );
  const arrayPropsMd = Object.keys(arrayProps).reduce(
    (final, current) =>
      final +
      arrayProps[current].reduce((f, c) => f + `- '${c}' \n`, `${current}:\n`),
    ""
  );
  // 3. Return properties wrapped between frontmatter decorators
  return ["---", simplePropsMd, arrayPropsMd, "---"].join("\n");
}

async function main(database_id) {
  try {
    let pages_Id = await getDatabasePagesId(database_id);
    // console.log(pages_Id)
    let pages = [];
    for (let page_id of pages_Id) {
      let page_properties = await getPageProperties(page_id);
      // let page_data = await readPageExtended(pageId);

      // This folder must exist in your project.
      // let parentDirectory = "./src/_data"; "./src/_data/stories.json"
      const pageContentBlocks = await n2m.pageToMarkdown(page_id);
      const pageContentMd = n2m.toMarkdownString(pageContentBlocks);
      let page = { ...page_properties, markdownContent: pageContentMd };
      // console.log(page_id)
      pages.push(page);
      // const pagePropertiesMd = propertiesToFrontmatter(page_properties);
      // const pageMd = [pagePropertiesMd, pageContentMd].join("\n");
    }
    let filepath = "./src/_data/stories.json";
    let pagesJSON = JSON.stringify(pages, null, 4);
    createFile(pagesJSON, filepath);
    // console.log(pagesJSON)
  } catch (error) {
    console.log(error);
  }
}
main(DATABASE_ID);
