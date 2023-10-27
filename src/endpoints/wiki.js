const tformatter = require("../template_formatter");
const fs = require("fs");
const path = require("path");

module.exports = {
    endpoint_path: "/wiki/:pageid",
    endpoint_type: "GET",
    endpoint_run: function(req, res) {
        res.status(200);
        var wikiHTML = tformatter.getTemplateFilled;
        if(fs.existsSync(path.join(__dirname, "../wiki/wikipages/" + req.params.pageid))) {
            res.send(
                tformatter.getTemplateFilled(
                    req.params.pageid,
                    tformatter.markdownToHTML(
                        fs.readFileSync(
                            path.join(__dirname,
                                "../wiki/wikipages/" + req.params.pageid
                            )
                        ).toString()
                    )
                )
            );
        } else {
            res.sendStatus(404);
        }
    }
}