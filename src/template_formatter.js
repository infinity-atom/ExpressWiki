const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(path.join(__dirname, "./wiki/pagetemplate/pagetemplate.html"));
const templateString = template.toString();

module.exports = {
    getTemplateFilled: function(articleName = "Article Name", articleHTML = "") {
        var filledTemplate = templateString;
        filledTemplate = replaceAll(filledTemplate, "{{ArticleName}}", articleName);
        filledTemplate = replaceAll(filledTemplate, "{{ArticleContents}}", articleHTML);

        return filledTemplate;
    },
    markdownToHTML: function(markdown = "") {
        
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}