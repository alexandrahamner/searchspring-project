const baseUrl = "https://api.searchspring.net/api/search/search.json"

//Making a call to the Searchspring API and fetching data.
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

$(document).ready(function(){
    let searchTerm = $("#search-term").attr("value");

    $("#search-btn").click((e) => {
        e.preventDefault();
        let result = queryFetch(searchTerm);
        console.log(result);
    })
})