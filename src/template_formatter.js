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
        var finishedHTML = markdown;

        finishedHTML = convertHeaders(finishedHTML);
        finishedHTML = convertCodeBlocks(finishedHTML);
        finishedHTML = convertFormatting(finishedHTML);
        finishedHTML = handleReferences(finishedHTML);
        finishedHTML = convertLinks(finishedHTML);

        return finishedHTML;
    }
}

function convertHeaders(markdown) {
    return markdown.replace(/!{1,3} (.+)/g, (match, header) => {
        const level = match.length - 9;
        return `<h${level}>${header}</h${level}>`;
    });
}

function convertCodeBlocks(markdown) {
    return markdown.replace(/```([^`]+)```/g, '<pre>$1</pre>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function convertFormatting(markdown) {
    return markdown.replace(/~{1}([^~]+)~{1}/g, '<del>$1</del>')
                  .replace(/_{1}([^_]+)_{1}/g, '<em>$1</em>')
                  .replace(/\*{1}([^*]+)\*{1}/g, '<strong>$1</strong>');
}

function handleReferences(markdown) {
    let refCount = 0;
    return markdown.replace(/\(https?:\/\/[^\s)]+\)/g, match => {
        refCount++;
        return `<sup>[${refCount}]</sup>`;
    });
}

function convertLinks(markdown) {
    // Handle [https://link.com](Text) format
    markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$1">$2</a>');

    // Handle [https://link.com] format
    markdown = markdown.replace(/\[([^\]]+)\]/g, '<a href="$1">$1</a>');

    return markdown;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}