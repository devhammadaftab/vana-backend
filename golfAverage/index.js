const { golfCalculation } = require("../helper");

module.exports = async function (context, req) {
    let body = req.body;
    const golf = {
        id: body && body.name ? body.name : "",
    }

    if(body) {
        if(body.scores && body.scores.length) {
            golf = {
                ...golf,
                ...golfCalculation(body.scores)
            }
        }
    }

    context.res = {
        body: golf
    };
}