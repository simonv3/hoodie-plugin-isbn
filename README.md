Hoodie ISBN Plugin
======================

> A hood.ie plug-in that fetches data from isbndb.com. Needs a isbndb.com API key.

## Usage

```js
hoodie.isbn.searchbooks({
  query: val
}).fail(function(){
  // handle error
}).done(function(search){
  // handle search result
  results = search.result.data;
});
```
