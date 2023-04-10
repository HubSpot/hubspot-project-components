// Require axios library to make API requests
const axios = require('axios');

// This function is executed when a request is made to the endpoint associated with this file in the serverless.json file
exports.main = ({ accountId }, sendResponse) => {
  // Use axios to make a GET request to the search API
  axios
    .get('https://api.hubapi.com/contentsearch/v2/search', {
      params: {
        portalId: accountId,
        term: 'searchTerm',
      },
    })
    .then(function(response) {
      // Handle success

      // The console.log statement will appear in the terminal when you run the hs logs CMS CLI command
      // For full documentation, see: developers.hubspot.com/docs/cms/developer-reference/local-development-cms-cli#logs
      console.log('Data received from the search API:', response.data);

      // sendResponse is what you will send back to services hitting your serverless function
      sendResponse({ body: { response: response.data }, statusCode: 200 });
    })
    .catch(function(error) {
      // Handle error

      // This is a simple example; error handling typically will be more complicated.
      // For more information on error handling with axios, see: https://github.com/axios/axios#handling-errors
      sendResponse({ body: { error: error.message }, statusCode: 500 });
    });
};
