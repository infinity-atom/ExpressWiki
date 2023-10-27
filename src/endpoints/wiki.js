const tformatter = require("../template_formatter");

module.exports = {
    endpoint_path: "/wiki/:pageid",
    endpoint_type: "GET",
    endpoint_run: function(req, res) {
        res.status(200);
        var wikiHTML = tformatter.getTemplateFilled;
        res.send(tformatter.getTemplateFilled("Test Article", "<h2>Test123</h2>"));
    }
}