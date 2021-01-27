describe('queryFecth', function() {
	beforeEach(function() {
		spyOn(window, 'fetch').and.callThrough();
		queryFetch("dress", 1);
    });
  // checking for defined function
  it('should be a defined function', function() {
      expect(typeof queryFetch).toBe('function');
  });
   // testing to see if the query fetch is successful
	it('fetches from the Searchspring API', function() {
		expect(window.fetch).toHaveBeenCalledWith('https://api.searchspring.net/api/search/search.json?q=dress&resultsFormat=native&page=1&siteId=' + siteId);
	});
});

describe('createResultObjects', function() {
  // checking for defined function
    it('should be a defined function', function() {
        expect(typeof createResultObjects).toBe('function');
      });
})

describe('createResultCard', function() {
  // checking for defined function
      it('should be a defined function', function() {
        expect(typeof createResultCard).toBe('function');
      });
})


describe('displayResultObjects', function() {
  // checking for defined function
    it('should be a defined function', function() {
        expect(typeof displayResultObjects).toBe('function');
      });
})

describe('paginationData', function() {
  // checking for defined function
    it('should be a defined function', function() {
        expect(typeof paginationData).toBe('function');
      });
})