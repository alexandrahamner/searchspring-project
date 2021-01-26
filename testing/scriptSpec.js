describe('queryFecth', function() {
	beforeEach(function() {
		spyOn(window, 'fetch').and.callThrough();
		queryFetch("dress", 1);
    });
    it('should be a defined function', function() {
        expect(typeof queryFetch).toBe('function');
    });
	it('fetches from the Searchspring API', function() {
		expect(window.fetch).toHaveBeenCalledWith('https://api.searchspring.net/api/search/search.json?q=dress&resultsFormat=native&page=1&siteId=' + siteId);
	});
});

describe('createResultObjects', function() {
    it('should be a defined function', function() {
        expect(typeof createResultObjects).toBe('function');
      });
})

describe('createResultCard', function() {
      it('should be a defined function', function() {
        expect(typeof createResultCard).toBe('function');
      });
})

describe('createResultCard', function() {
    it('should be a defined function', function() {
        expect(typeof createResultCard).toBe('function');
      });
})

describe('displayResultObjects', function() {
    it('should be a defined function', function() {
        expect(typeof displayResultObjects).toBe('function');
      });
})

describe('paginationData', function() {
    it('should be a defined function', function() {
        expect(typeof paginationData).toBe('function');
      });
})