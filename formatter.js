function parseToHTML(markdown = "") {
    var finishedHTML = "";

    var markdownLines = markdown.split("\n");

    markdownLines.forEach((i) => {
        if(i.startsWith("! ")) {
            finishedHTML += `<h1>${i.slice(2)}</h1>`;
        }
        if(i.startsWith("!! ")) {
            finishedHTML += `<h2>${i.slice(3)}</h2>`;
        }
        if(i.startsWith("!!! ")) {
            finishedHTML += `<h3>${i.slice(4)}</h3>`;
        }
    });

    return finishedHTML;
}

const exampleMD = require("fs").readFileSync("./src/wiki/wikipages/Main Page").toString();

console.log(parseToHTML(exampleMD));