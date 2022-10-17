document.querySelector('#btn').addEventListener('click', getRecipe)

//This uses event delegation to target each anchor text when clicked
document.querySelector('#recipeContainer').addEventListener('click', event => {
    if (event.target.className === 'recipeTitles') {
        showRecipe(event.target.id);
  }
});

//Including missingIngredientsArray here because at the moment the I need access to 'data' and it ceases to exist after getRecipe to run, so I'm making it global 
let missingIngredientsArray = [];
// This will be pushed to from the  showRecipe() function
let recipeArray = [];

function getRecipe(){
    let ingredients = document.querySelector('#ingredient').value

    let numberOfMissingIngredients = document.querySelector('#missingIngredients').value

    //Url of spoonacular api, with authentication key(got by making an account). Type in ingredients to get an Array of Recipe titles
    let url =`https://api.spoonacular.com/recipes/findByIngredients?apiKey=2d7e0ded8af74b1897224317ce6c662c&ingredients=${ingredients}&addRecipeInformation=true&instructionsRequired=true`

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data) //get the response(array) of the api
            console.log(data[0].title) //title of the first recipe

            data = data.filter(el => el.missedIngredientCount <= numberOfMissingIngredients || 0); //The array is filtered for recipe that have the selected
            missingIngredientsArray = data
            console.log(data)
            //The function below is to wrap each recipe title in <a> and <h2> tags to be input into the html and to add the recipe id 
            //as the anchor id so that formulas can be run on it when it is clicked
            let recipeTitles = function(){
                return data.map((el, i) => `<div><h2><a href="#" class="recipeTitles" id="${el.id}">${el.title}</a></h2><button class='addFav'>Add to Favorites</button></div>`).join('')
            }
            
            document.querySelector('#recipeContainer').innerHTML = recipeTitles()
            //data.map(el => el === `<p>${el.title}</p>`)

            
            
        

            getClickedFav()    
                
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
}


function showRecipe(id) {
    console.log(missingIngredientsArray)
    console.log(id)
    let targetRecipe = missingIngredientsArray.find(item => item.id == id)
    console.log(targetRecipe)
    document.querySelector('img').src = targetRecipe.image;
    let missingIngedientsList = targetRecipe.missedIngredients.map(el => el = `<li>${el.name}</li>`).join('');
    //
    console.log(missingIngedientsList)
    document.querySelector('#missingIngredientsList').innerHTML = missingIngedientsList
    
    let recipeURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=2d7e0ded8af74b1897224317ce6c662c&includeNutrition=false&instructionsRequired=true`
    fetch(recipeURL)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
            console.log(data.analyzedInstructions[0].steps)
            let recipeInstructions = data.analyzedInstructions[0].steps.map(el => `<li>${el.number}: ${el.step}</li>`).join('')
            document.querySelector('#recipeInstructions').innerHTML = recipeInstructions
        })

}



// function getPrice(){ //To use the fetch in getPrice function switch out getRecipe for the getPrice function in the Eventlistener










    
//     //We get additional information from the ingredient search in the getRecipe function. Each recipe has a unique ID. we can grab that and do alot with it.
//     //Here are two examples with step by step instructions and PriceBreakdown:


//     //Step by step Instructions:
//     //Instructions come with separate ingredients you need per Step
//     fetch(`https://api.spoonacular.com/recipes/${661447}/analyzedInstructions?apiKey=2d7e0ded8af74b1897224317ce6c662c`) // url link for cooking instruction
    
    
//     //Price Breakdown:
//     //price breakdown has prices for units bought. Blueberries for example "cost" 25$ roughly, that should be per Kilogramm or similar. 
//     //We also get price per serving of the meal. That number was more realistic.
//     //commeted out for now so we can use the instruction fetch:
    
//     // fetch(`https://api.spoonacular.com/recipes/${661447}/priceBreakdownWidget.json?apiKey=2d7e0ded8af74b1897224317ce6c662c`) 
    
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {          
//         console.log(data)    // Here we get the data from the api and can analyze it
        
            
            
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         });
// }




// Create a button for each recipe 
// If button is clicked run add to fav function

// Favs container containing saved recipes
// Option to clear all
// Clear individual

//Fetch favourites on page load

// Check there are favs in local storage

// Add event listener to all add to fav buttons


// When the recipe list is populated from getRecipe() a 'Add to favs' button is added to each element
// Depending on which recipe 'add to fav' button was clicked the recipeId and recipeName are stored in variables
// addFavRecipe() function is run with id and name as arguements
function getClickedFav(){
    const addFavButtons = document.querySelectorAll('.addFav')
        addFavButtons.forEach(favBtn => {
            favBtn.addEventListener('click', function handleClick(event) {
                let recipeId = event.target.previousElementSibling.firstChild.id
                let recipeName = event.target.previousElementSibling.firstChild.textContent
                addFavRecipe(recipeId, recipeName)
         })
    });
}

// recipeId and recipeName are pushed into a new array of favorite recipes
function addFavRecipe(recipeId, recipeName) {
    console.log('clicked')
    console.log(recipeId, recipeName)
    let recipeArray = []
    recipeArray.push([recipeId, recipeName])
    console.log(recipeArray)
    localStorage.setItem('favRecipe', JSON.stringify(recipeArray))
}


// // Fetch recipes from local storage
// function getFavRecipe() {
//     let getFav = JSON.parse(localStorage.getItem('fav1'))
//     document.querySelector('#favList').textContent = getFav
//     return getFav
// }

// // Clear favourite recipes from local storage
// function clearFavRecipe() {
//     localStorage.clear()
//     document.querySelector('#favList').textContent = "No favourites selected"
// }

// Check if there are any favourites held in local storage
// function checkFavs(){
//     if (localStorage.getItem('fav1') === null) {
//         const favArr = []
//         return favArr
//     } else {
//         getFavLocal()
//         const favArr = getFavLocal()
//         return favArr
//     }
// }