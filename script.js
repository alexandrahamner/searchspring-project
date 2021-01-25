const baseUrl = "https://api.searchspring.net/api/search/search.json"

//Making a call to the Searchspring API and fetching data. 
//Calls the paginationData function to save page information for pagination on the web application.
const queryFetch = (searchTerm, pageNumber) => {
    return new Promise((resolve) => {
        fetch(baseUrl + '?' + new URLSearchParams({
            q: searchTerm,
            resultsFormat: 'native',
            page: pageNumber,
            siteId: siteId
        }))
            .then(response => response.json())
            .then(data => {
                resolve(data);
                console.log(data);
                let pageInfo = paginationData(data);
                displayPrevBtn(pageInfo);
                displayNextBtn(pageInfo);
                createResultObjects(data);
            })
            .catch(error => {
                console.log(error);
            })
    })
}

//PAGINATION

//Gathers the necessary pagination data and creates pageInfo object. Will be used for the pagination functionality.
const paginationData = (data) => {
    let pageInfo = {
        currentPage: data.pagination.currentPage,
        nextPage: data.pagination.nextPage ?? "data unavailable",
        currentPage: data.pagination.currentPage,
        defaultPerPage: data.pagination.defaultPerPage,
        previousPage: data.pagination.previousPage,
        totalResults: data.pagination.totalResults
    }
    console.log(pageInfo);
    return pageInfo;
}

const displayPrevBtn = (pageInfo) => {
    if(pageInfo.previousPage != 0) {
        $(".prev-btn").val(pageInfo.previousPage);
        $(".prev-btn").css("display", "inline-block");
    } else {
        $(".prev-btn").css("display", "none");
    }
}

const displayNextBtn = (pageInfo) => {
    if(pageInfo.nextPage != 0) {
        $(".next-btn").val(pageInfo.nextPage);
        $(".next-btn").css("display", "inline-block");
    } else {
        $(".next-btn").css("display", "none");
    }
}

//RESULTS

// This function takes the result from the queryFetch and stores the necessary data for each result as objects, they are then pushed to an array.
// Once data is stored, the array is passed through the displayResultObjects function.
const createResultObjects= (data) => {
    let formattedObjects = [];
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
}

//This function creates a result card (in HTML) for each formatted result object.
const createResultCard = (formattedObj) => {
    let finalHTML = "";
    finalHTML += 
        `<div class="result-card">
            <div class="result-img-container">
                <img src="${formattedObj.imageUrl}" class="result-thumbnail" alt="Image for ${formattedObj.name}" />
            </div>
            <div class="result-name-container">
                <p class="result-name">${formattedObj.name}</p>
            </div>
            <div class="price-and-cart">
                <div class="result-price-container">
                    <p class="result-msrp">$${formattedObj.msrp}</p>
                    <p class="result-price">$${formattedObj.price}</p>
                </div>
                <div class="add-cart-container">
                    <i class="shopping cart large icon add-cart-btn"></i>
                </div>
            </div>    
        </div>`
    return finalHTML;
}

// This function displays the data as HTML elements.
const displayResultObjects = (formattedObjects) => {
    console.log(formattedObjects);
    let resultsHTML = "";
    formattedObjects.forEach(obj => {
        resultsHTML += createResultCard(obj);
    })
   
    $("#search-results").html(resultsHTML);
}
 


// Using jQuery for DOM events
$(document).ready(function(){
    // User input taken from the search bar, passed through the query fetch function and create object function, for now.
    $("#search-btn").click((e) => {
        e.preventDefault();
        $(".grid-container").css("display", "grid");
        $("main").css("display", "block");
        let searchTerm = $("#search-term").val();
        let element = document.querySelector("main");
        let searchTermHTML = `<h2 class="search-term-display">${searchTerm}</h2>`
        $(".searched-term-display-container").html(searchTermHTML);
        queryFetch(searchTerm, 1);
        element.scrollIntoView({behavior: "smooth"});
    });

    // In case a user presses 'Enter' instead of clicking the search button.
    $("#search-term").keypress((e) => {
        if(e.which == 13){//Enter key pressed
            $('#search-btn').click();//Trigger search button click event
        }
    });

    //Button to go to the previous page
    $(".prev-btn").click((e) => {
        e.preventDefault();
        let searchTerm = $("#search-term").val();
        let prevPage = $(".prev-btn").val();
        queryFetch(searchTerm, prevPage);
    });

    //Button to go to the next page
    $(".next-btn").click((e) => {
        e.preventDefault();
        let searchTerm = $("#search-term").val();
        let nextPage = $(".next-btn").val();
        queryFetch(searchTerm, nextPage);
    });

});