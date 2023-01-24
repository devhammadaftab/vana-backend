const { container } = require("../comos-client");

module.exports = async function (context, req) {
    const name = req.query.name;
    
    const query = `SELECT c.id FROM c WHERE UPPER(c.id) LIKE UPPER('${name}%')`;
    const { resources } = await container.items.query(query).fetchAll();

    const ids = resources.map(item => item.id);

    context.res = {
        body: ids
    };
}