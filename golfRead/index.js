const { container } = require("../comos-client");
const { golfCalculation } = require("../helper");

module.exports = async function (context, req) {
    const name = req.query.name;

    const { resource } = await container.item(name).read();

    context.res = {
        body: {
            ...resource,
            ...golfCalculation(resource.scores)
        }
    };
}