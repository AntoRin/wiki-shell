const fetch = require("node-fetch");

const api = `https://wikisnippets.herokuapp.com/api/wikisnippet/`;

async function getWikiSnippet() {
   let searchTerm = process.argv.slice(2).join(" ").trim();
   console.log("Loading...");
   try {
      let url = api + searchTerm;

      let result = await fetch(url);
      let snippet = await result.json();

      if (snippet.status === "error") throw snippet.data;
      if (snippet.status === "ok") console.log(snippet.data);

      process.exit(0);
   } catch (error) {
      console.error(error);
      process.exit(1);
   }
}

module.exports = { getWikiSnippet };
