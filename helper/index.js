function golfCalculation(sc) {
    let scores = [...sc];
    const golf = {
        average: 0,
        handicap: 0
    }

    scores.sort((a, b) => a - b);

    if (scores.length >= 6) {
        scores.pop();
        scores.shift();
    }
    golf.average = Number((scores.reduce((a, b) => a + b) / scores.length).toFixed(2));
    golf.handicap = Math.round((golf.average - 72) * 0.9);

    return golf;
}

module.exports = { golfCalculation }