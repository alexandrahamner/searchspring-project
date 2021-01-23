const baseUrl = "https://api.searchspring.net/api/search/search.json"

//Making a call to the Searchspring API and fetching data.
const queryFetch = (searchTerm, pageNumber) => {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + '?' + new URLSearchParams({
            q: searchTerm,
            resultsFormat: 'native',
            page: pageNumber,
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

const createResultObject= (result) => {
    let formattedObjects = [];
    result.then(data => {
        console.log(data);
        for(let i = 0; i < data.results.length; i++) {
            const resultObject = {
                resultNumber: i + 1,
                name: data.results[i].title,
                price: data.results[i].price,
                msrp: data.results[i].msrp ?? "data unavailable",
                imageUrl: data.results[i].thumbnailImageUrl,
            }
    
            formattedObjects.push(resultObject);
        }
        console.log(formattedObjects);
    })
}

$(document).ready(function(){
    $("#search-btn").click((e) => {
        e.preventDefault();
        let searchTerm = $("#search-term").val();
        console.log(searchTerm)
        let result = queryFetch(searchTerm, 1);
        console.log(result)
        createResultObject(result);
    })

    $("#search-term").keypress((e) => {
        if(e.which == 13){//Enter key pressed
            $('#search-btn').click();//Trigger search button click event
        }
    })
})