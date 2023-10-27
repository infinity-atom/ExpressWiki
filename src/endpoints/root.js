module.exports = {
    endpoint_path: "/",
    endpoint_type: "GET",
    endpoint_run: function(req, res) {
        res.status(200);
        res.send(`<meta http-equiv="refresh" content="0;URL='/wiki/Main Page'"> `);
    }
}