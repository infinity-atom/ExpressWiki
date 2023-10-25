module.exports = {
    endpoint_path: "/apitest",
    endpoint_type: "GET",
    endpoint_run: function(req, res) {
        res.status(200);
        res.json({
            endpoint: "/apitest",
            error: "",
            body: {
                info: "API test accessed."
            }
        });
    }
}