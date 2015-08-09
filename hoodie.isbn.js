Hoodie.extend(function(hoodie) {
  hoodie.isbn = {};
  hoodie.isbn.searchbooks = hoodie.task('searchbooks').start;
});
