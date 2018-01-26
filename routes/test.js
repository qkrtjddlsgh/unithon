// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

// The text to analyze
// const text = 'Hello, world!';
const text = '오늘은 날이 정말 좋았다. 그래서 재밌게 돌아다닐수 있어서 좋았다.오늘은 날이 정말 좋았다. 그래서 재밌게 돌아다닐수 있어서 좋았다.오늘은 날이 정말 좋았다. 그래서 재밌게 돌아다닐수 있어서 좋았다.오늘은 날이 정말 좋았다. 그래서 재밌게 돌아다닐수 있어서 좋았다.오늘은 날이 정말 좋았다. 그래서 재밌게 돌아다닐수 있어서 좋았다.오늘은 날이 정말 좋았다. 그래서 재밌게 돌아다닐수 있어서 좋았다.';

const document = {
    content: text,
    type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
client
    .analyzeSentiment({document: document})
    .then(results => {
    const sentiment = results[0].documentSentiment;

console.log(`Text: ${text}`);
console.log(`Sentiment score: ${sentiment.score}`);
console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
})
.catch(err => {
    console.error('ERROR:', err);
});