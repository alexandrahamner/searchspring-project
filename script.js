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


// This function takes the result from the queryFetch and stores the necessary data for each result as objects, they are then pushed to an array.
// Once data is stored, the array is passed through the displayResultObjects function.
const createResultObjects= (result) => {
    let formattedObjects = [];
    result.then(data => {
        for(let i = 0; i < data.results.length; i++) {
            const resultObject = {
                //custom id to keep track of the results on a page
                resultNumber: i + 1,
                name: data.results[i].title,
                price: data.results[i].price,
                // Taking care of undefined errors in case there is no MSRP value
                msrp: data.results[i].msrp ?? "data unavailable",
                imageUrl: data.results[i].thumbnailImageUrl,
            }
    
            formattedObjects.push(resultObject);
        }
        displayResultObjects(formattedObjects);
    })
}

//This function creates a result card (in HTML) for each formatted result object.
const createResultCard = (formattedObj) => {
    let finalHTML;
    finalHTML = 
        `<div class="result-card">
            <div class="result-img-container">
                <img src="${formattedObj.imageUrl}" class="result-thumbnail" alt="Image for ${formattedObj.name}" />
            </div>
            <div class="result-name-container">
                <p class="result-name">${formattedObj.name}</p>
            </div>
            <div class="book-card book-info">
                <p class="result-msrp>${formattedObj.msrp}</p>
                <p class="result-price">${formattedObj.price}</p>
            </div>
            <div class="add-cart-container">
                <button class="add-cart-btn">Add to Cart</button>
            </div>
        </div>`
    console.log(finalHTML);
    return finalHTML;
}

// This function displays the data as HTML elements.
const displayResultObjects = (formattedObjects) => {
    console.log(formattedObjects.length);
    let resultsHTML;
    formattedObjects.forEach(obj => {
        resultsHTML += createResultCard(obj);
    })

    $("#search-results").append(resultsHTML);
}

// Using jQuery for DOM events
$(document).ready(function(){
    // User input taken from the search bar, passed through the query fetch function and create object function, for now.
    $("#search-btn").click((e) => {
        e.preventDefault();
        let searchTerm = $("#search-term").val();
        console.log(searchTerm)
        let result = queryFetch(searchTerm, 1);
        let resultObjects = createResultObjects(result)
    
    })
    // In case a user presses 'Enter' instead of clicking the search button.
    $("#search-term").keypress((e) => {
        if(e.which == 13){//Enter key pressed
            $('#search-btn').click();//Trigger search button click event
        }
    })
})