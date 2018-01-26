// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage');

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/latest/guides/authentication
const storage = Storage({
    keyFilename: '/Users/park/Desktop/aws_key/b48ea5520913.json'
});

// Makes an authenticated API request.
storage
    .getBuckets()
    .then((results) => {
    const buckets = results[0];

console.log('Buckets:');
buckets.forEach((bucket) => {
    console.log(bucket.name);
});
})
.catch((err) => {
    console.error('ERROR:', err);
});