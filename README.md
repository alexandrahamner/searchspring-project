# Shopily


<p align="center"> This Searchspring project, called Shopily, is a simple search application implementing the Search API. Users can search for clothing and makeup items, and the results are displayed in a grid format. The app is also mobile responsive.<p>
  
<hr />

### Demo
[Shopily Demo](https://shopily.netlify.app/)

### Technologies
- HTML 5
- CSS 3
- Javascript

### Libraries and Utilities Applied
- Search API [link](https://searchspring.zendesk.com/hc/en-us/sections/115000119223-Search-API)
- Semantic UI [link](https://semantic-ui.com/)
- jQuery [link](https://jquery.com/)
- Jasmine [link](https://jasmine.github.io/pages/getting_started.html)
- CSS Grid [link](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- Canva (for svg and png images) [link](https://www.canva.com/)

### Features

- Implements the Search API.
- Uses Fetch API and Promises to make HTTP Requests to the Search API.
- Search bar with search button to allow for custom user input.
- A header is included with default search terms to add to the user experience.
- After a request has been made, results are shown using CSS Grid.
- Conditionals are put in place to: 
  - Prevent the previous buttons from displaying if previous page = 0 from the HTTP request.
  - Prevent the next buttons from displaying if there are no pages left in the result.
  - Handle searches with no results.
  - Include a default image if an image is throwing a 404 from the API.
  - Prevent MSRP from displaying if the MSRP is equal or less than the listed price.
- "Add to cart" functionality that mimics adding an item to a shopping cart.
- Implements a modern and colorful User Interface.  
- Responsive website.
- Utilizes jQuery for DOM events.
