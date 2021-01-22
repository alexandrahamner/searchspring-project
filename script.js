const baseUrl = "https://api.searchspring.net/api/search/search.json"

const queryFetch = (searchTerm) => {
    return new Promise((resolve) => {
        fetch(baseUrl + '?' + new URLSearchParams({
            q: searchTerm,
            resultsFormat: 'native',
            page: 1,
            siteId: siteId
        }))
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.log(error);
            })
    })
}

console.log(queryFetch("dress"));