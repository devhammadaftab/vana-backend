const { container } = require('../comos-client');
const { calculateHandicap } = require('../helper');

module.exports = async function (context, req) {
    const body = req.body;

    const name = body.name;
    const score = body.score;
    let current = {};

    const { resource: currentItem } = await container.item(name).read();

    if(currentItem) {
        let scores = [...currentItem.scores, score];
        current = await container.item(name).replace({
            id: name,
            scores,
            handicap: calculateHandicap(scores),
            average: Number((scores.reduce((a, b) => a + b) / scores.length).toFixed(2))
        });
    }
    else {
        current = await container.items.create({
            id: name,
            scores: [score],
            handicap: 0,
            average: 0
        });
    }
    current = current.resource;
    let scoreCount = current.scores.length;

    if(scoreCount > 10) {
        current.scores = current.scores.slice(scoreCount - 10, scoreCount);
    }
    
    context.res = {
        body: current
    };
}