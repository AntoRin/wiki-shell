const fetch = require("node-fetch");

const version = "1.0.5";

const API_SNIPPET = `https://wikisnippets.herokuapp.com/api/wikisnippet/`;
const API_FULL = `https://wikisnippets.herokuapp.com/api/wikipage/`;

const commonFlags = ["-h", "--help", "-v", "--version", "-a"];

function handleError(error) {
   console.error(error);
   process.exit(1);
}

function showHelp() {
   console.log(
      "\nUse command wiki (or) wiki-shell followed by a search query to get a Wikipedia snippet\n"
   );

   console.log("\nArguments: [-a, -l=<number>, --length=<number>]\n");

   console.log(
      "Pass in an argument before your search query to have control over how much content you receive"
   );
}

function parseFlag(flag) {
   let length;
   if (flag.startsWith("-l") || flag.startsWith("--length")) {
      length =
         flag.indexOf("=") === -1
            ? null
            : parseInt(flag.slice(flag.indexOf("=") + 1));
      flag = "lengthConstrained";
   }

   if (!commonFlags.includes(flag) && !length)
      return handleError("Unknown argument");

   switch (flag) {
      case "-v":
      case "--version":
         console.log(version);
         process.exit(0);
      case "-h":
      case "--help":
         showHelp();
         process.exit(0);
      case "-a":
         return -1;
      case "lengthConstrained":
         return length;
      default:
         return -1;
   }
}

async function getWikiSnippet() {
   let possibleFlag = process.argv[2];
   let url;
   let searchTerm;
   let moreData = false;
   let moreDataLength = -1;

   if (possibleFlag.startsWith("--") || possibleFlag.startsWith("-")) {
      searchTerm = process.argv.slice(3).join(" ").trim();
      url = API_FULL + searchTerm;
      moreData = true;
      moreDataLength = parseFlag(possibleFlag);
   } else {
      searchTerm = process.argv.slice(2).join(" ").trim();
      url = API_SNIPPET + searchTerm;
   }
   console.log("Loading...");

   try {
      let result = await fetch(url);
      let snippet = await result.json();

      if (snippet.status === "error") throw snippet.data;
      if (snippet.status === "ok") {
         if (!moreData) console.log(snippet.data);
         else {
            moreDataLength === -1
               ? snippet.data.forEach(data => console.log(data))
               : (() => {
                    for (
                       let i = 0;
                       i < moreDataLength && i < snippet.data.length;
                       i++
                    ) {
                       console.log(snippet.data[i]);
                    }
                 })();
         }
      }

      process.exit(0);
   } catch (error) {
      console.error(error);
      process.exit(1);
   }
}

module.exports = { getWikiSnippet };
