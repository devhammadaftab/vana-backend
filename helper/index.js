function calculateHandicap(sc) {
    let scores = [...sc];
    let handicap = 0;

    if(scores.length > 10) {
        scores = scores.slice(scores.length - 10, scores.length);
    }

    if(scores.length > 3) {
        scores.sort((a, b) => a - b);
        if (scores.length >= 6) {
            scores.pop();
            scores.shift();
        }
        let handicapAverage = Number((scores.reduce((a, b) => a + b) / scores.length).toFixed(2));
        handicap = Math.round((handicapAverage - 72) * 0.9);
        if(handicap > 36 || handicap < 0) {
            handicap = 0;
        }
    }

    return handicap;
}

module.exports = { calculateHandicap }