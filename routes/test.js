// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

// The text to analyze
// const text = 'Hello, world!';
const text = '오늘의 일기. 날이 너무 춥다. 해커톤은 2박 3일이다. 큰일이다. 너무 춥고 발이 시렵다.';

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