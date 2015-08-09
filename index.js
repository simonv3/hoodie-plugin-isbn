var request = require('request');

module.exports = function(hoodie, doneCallback) {

  hoodie.task.on('searchbooks:add', searchBooks);

  function searchBooks(dbName, search) {
    console.log('Going on a search for %s', search.query);

    var isbn_db_key = hoodie.config.get('isbn_db_key');
    var url = 'http://isbndb.com/api/v2/json/' + isbn_db_key +
              '/books?q=' + search.query;

    var requestCallback = function(error, response, body) {

      if (error) {
        hoodie.task.error(dbName,
                          search,
                          { error: 'ISBNError',
                            message: 'Unknown problem occurred.'
                          });
      } if (body.error) {
        hoodie.task.error(dbName,
                          search,
                          { error: 'ISBNError',
                            message: body.error
                          });
      } else {
        search.result = body;
        search.response = response;
        hoodie.task.success(dbName, search);
      }
    };

    request(url, { 'json': true }, requestCallback);

  }

  doneCallback();
};
