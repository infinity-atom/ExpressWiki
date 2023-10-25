const app = require("express")();
const fs = require("fs");
const path = require("path");

// Load endpoints

fs.readdirSync(path.resolve(__dirname, "./endpoints")).forEach((file) => {
    console.log("Loading endpoint: " + file);
    const currentLoadingEndpoint = require(path.resolve(__dirname, "./endpoints/" + file));

    if(currentLoadingEndpoint.endpoint_type == "GET") {
        app.get(currentLoadingEndpoint.endpoint_path, (req, res) => currentLoadingEndpoint.endpoint_run(req, res));
    } else if(currentLoadingEndpoint.endpoint_type == "POST") {
        app.post(currentLoadingEndpoint.endpoint_path, (req, res) => currentLoadingEndpoint.endpoint_run(req, res));
    } else {
        console.log("Error loading endpoint because endpoint type incorrect: " + file)
    }

});

app.listen(80, () => {
    console.log("App listening on port 80");
});