const path = require("path");
const fs = require("fs");

module.exports = {
    endpoint_path: "/content/assets/:assetid",
    endpoint_type: "GET",
    endpoint_run: function(req, res) {
        if(fs.existsSync(path.join(__dirname, "../wiki/assets/" + req.params.assetid))) {
            res.status(200);
            res.sendFile(path.join(__dirname, "../wiki/assets/" + req.params.assetid));
        } else {
            res.status(404);
            res.send("Error 404: Not Found");
        }
    }
}