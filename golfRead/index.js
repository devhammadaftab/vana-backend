const { container } = require("../comos-client");
const { calculateHandicap } = require("../helper");

module.exports = async function (context, req) {
    const name = req.query.name;

    const { resource } = await container.item(name).read();
    const { scores } = resource;

    context.res = {
        body: {
            ...resource,
            handicap: calculateHandicap(scores),
            average: Number((scores.reduce((a, b) => a + b) / scores.length).toFixed(2))
        }
    };
}