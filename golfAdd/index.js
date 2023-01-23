const { container } = require('../comos-client');
const { golfCalculation } = require('../helper');

module.exports = async function (context, req) {
    const body = req.body;

    const name = body.name;
    const score = body.score;
    let current = {};

    const { resource: currentItem } = await container.item(name).read();

    if(currentItem) {
        current = await container.item(name).replace({
            id: name,
            scores: [...currentItem.scores, score]
        });
    }
    else {
        current = await container.items.create({
            id: name,
            scores: [score]
        });
    }
    current = current.resource;
    let numscores = current.scores.length;

    current = {
        ...current,
        ...golfCalculation(current.scores)
    }

    if(numscores > 10) {
        current.scores = current.scores.slice(numscores - 10, numscores);
    }
    
    context.res = {
        body: current
    };
}