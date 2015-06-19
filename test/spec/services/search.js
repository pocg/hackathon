'use strict';

describe('Service: search', function () {

  // load the service's module
  beforeEach(module('hackathon2015App'));

  // instantiate service
  var search;
  beforeEach(inject(function (_search_) {
    search = _search_;
  }));

  it('should do something', function () {
    expect(!!search).toBe(true);
  });

});
