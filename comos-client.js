const CosmosClient = require("@azure/cosmos").CosmosClient;
const cosmosClient = new CosmosClient({
    endpoint: process.env.CosmosDBConnection,
    key: process.env.CosmosDBKey
});

const container = cosmosClient.database("vana-golf").container("golf");
module.exports = { container };