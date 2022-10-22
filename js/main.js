document.querySelector('#btn').addEventListener('click',() => {
    getRecipe();
    removeHidden();
});
//This uses event delegation to target each anchor text when clicked
document.querySelector('#recipeContainer').addEventListener('click', event => {
    if (event.target.className === 'recipeTitles') {
        showRecipe(event.target.id);
  }
  
});

//This event listener triggers when a select option is chosen and reorders the recipes
document.querySelector('#orderSelector').addEventListener('change', () => {
    changeRecipeOrder(event);
});

//Including missingIngredientsArray here because at the moment the I need access to 'data' and it ceases to exist after getRecipe to run, so I'm making it global 
let missingIngredientsArray = [];
// This will be pushed to from the  showRecipe() function
let recipeArray = [];

function getRecipe(){
    let ingredients = document.querySelector('#ingredient').value
    // let numberOfMissingIngredients = document.querySelector('#missingIngredients').value

    //Url of spoonacular api, with authentication key(got by making an account). Type in ingredients to get an Array of Recipe titles
    let url =`https://api.spoonacular.com/recipes/complexSearch?&apiKey=2d7e0ded8af74b1897224317ce6c662c&includeIngredients=${ingredients}&addRecipeInformation=true&instructionsRequired=true&number=20&fillIngredients=true&addRecipeNutrition=true`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data) //get the response(array) of the api
            console.log(data.results.length) //title of the first recipe
            //Add the the array of recipe objects to the global variable for access later
            recipeArray = data.results;
            console.log(`recipe array before ${recipeArray}`)
            //sort the recipes by least to most missing ingredients
            recipeArray = recipeArray.sort((a,b) => a.missedIngredientCount - b.missedIngredientCount)

            console.log(`recipe array after ${recipeArray}`)
            //This is a function that wraps the titles of the returned recipes in <h2> and <a> tags to input into the dom
            let recipeTitles = function(){
                return recipeArray.map((el, i) => `<h2><a href="#" class="recipeTitles" id="${el.id}">${el.title}</a> -- ${el.missedIngredientCount} ingredient${el.missedIngredientCount > 1 ? 's' : ''} missing</h2>`).join('')
            }
            
            document.querySelector('#recipeContainer').innerHTML = recipeTitles()
            //data.map(el => el === `<p>${el.title}</p>`)
            
        
                
                
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
}

function showRecipe(id) {
    //Remove the hiddenRecipe tag from the relevant h2s so they show in the DOM
    removeHiddenResponsive()
    console.log(id)

    //Extract the recipe object from the main array
    let targetRecipe = recipeArray.find(item => item.id == id)
    console.log(`targetRecipe ${targetRecipe}`)
    //Add the image of the target recipe to the DOM
    document.querySelector('img').src = targetRecipe.image;
    //Ectract the lise of missing ingredients form the target recipe and wrap them in li tags
    let ingredientsList = targetRecipe.extendedIngredients.map(el => el = `<li>${el.name}</li>`).join('');
    //
    console.log(`ingredientsList ${ingredientsList}`)
    //insert the missing ingredients into the DOM
    document.querySelector('#ingredientsList').innerHTML = ingredientsList;
    //Add the recipe title to the DOM
    document.querySelector('#recipeTitle').innerHTML = `${targetRecipe.title}`
    let recipeInstructions = targetRecipe.analyzedInstructions[0].steps.map(el => `<li>${el.number}: ${el.step}</li>`)
    document.querySelector('#recipeInstructions').innerHTML = recipeInstructions;
    
}



function getPrice(){ //To use the fetch in getPrice function switch out getRecipe for the getPrice function in the Eventlistener
    
    //We get additional information from the ingredient search in the getRecipe function. Each recipe has a unique ID. we can grab that and do alot with it.
    //Here are two examples with step by step instructions and PriceBreakdown:


    //Step by step Instructions:
    //Instructions come with separate ingredients you need per Step
    fetch(`https://api.spoonacular.com/recipes/${661447}/analyzedInstructions?apiKey=2d7e0ded8af74b1897224317ce6c662c`) // url link for cooking instruction
    
    
    //Price Breakdown:
    //price breakdown has prices for units bought. Blueberries for example "cost" 25$ roughly, that should be per Kilogramm or similar. 
    //We also get price per serving of the meal. That number was more realistic.
    //commeted out for now so we can use the instruction fetch:
    
    // fetch(`https://api.spoonacular.com/recipes/${661447}/priceBreakdownWidget.json?apiKey=2d7e0ded8af74b1897224317ce6c662c`) 
    
    .then(res => res.json()) // parse response as JSON
    .then(data => {          
        console.log(data)    // Here we get the data from the api and can analyze it
        
            
            

         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         });
 }
document.querySelector('#imgSearch').addEventListener('click',analyzeImage)
let imageUrl = `https://cdn.discordapp.com/attachments/478331515093385237/1032250668322390036/unknown.png`
let imageUrlFetch = `https://api.spoonacular.com/food/images/analyze?apiKey=2d7e0ded8af74b1897224317ce6c662c&imageUrl=${imageUrl}`
 function analyzeImage(){
    fetch(imageUrlFetch)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data) //get the response(array) of the api
            

            
            
        

                
                
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
}

 

        
        


function removeHidden() {
    let hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => {
        el.classList.remove('hidden')
    });
}

function removeHiddenResponsive() {
    let hiddenElements = document.querySelectorAll('.hiddenResponsive');
    hiddenElements.forEach(el => {
        el.classList.remove('hiddenResponsive')
    });
}

function changeRecipeOrder(event) {
    //This reorders the recipes to go from least to most missing ingredients and adds the number of missing ingredients in the text
    if (event.target.value == 'sortMissingIngredients') {
        recipeArray = recipeArray.sort((a,b) => a.missedIngredientCount - b.missedIngredientCount)
        let recipeTitles = function(){
            
            return recipeArray.map((el, i) => `<h2><a href="#" class="recipeTitles" id="${el.id}">${el.title}</a> -- ${el.missedIngredientCount} ingredient${el.missedIngredientCount > 1 ? 's' : ''} missing</h2>`).join('')
            
        }
        document.querySelector('#recipeContainer').innerHTML = recipeTitles()
    //This reorders the recipes from least to most price per serving and adds text about the price per serving rounded to two digits
    } else if (event.target.value == 'sortPricePerServing'){
        recipeArray = recipeArray.sort((a,b) => a.pricePerServing - b.pricePerServing)
        let recipeTitles = function(){
            
            return recipeArray.map((el, i) => `<h2><a href="#" class="recipeTitles" id="${el.id}">${el.title}</a> -- Price Per Serving: $${(el.pricePerServing / 100).toFixed(2)}</h2>`).join('')
        }
        document.querySelector('#recipeContainer').innerHTML = recipeTitles()
    //THis reorders the recipes from most to least protein
    } else if (event.target.value == 'sortProtein') {
        
        recipeArray = recipeArray.sort((a,b) => b.nutrition.nutrients[8].amount - a.nutrition.nutrients[8].amount)
        let recipeTitles = function(){
            
            return recipeArray.map((el, i) => `<h2><a href="#" class="recipeTitles" id="${el.id}">${el.title}</a> -- Protein: ${(el.nutrition.nutrients[8].amount).toFixed(2)}g</h2>`).join('')
        }
        document.querySelector('#recipeContainer').innerHTML = recipeTitles()
    } else if (event.target.value == 'sortCarbs') {
        
        recipeArray = recipeArray.sort((a,b) => a.nutrition.nutrients[3].amount - b.nutrition.nutrients[3].amount)
        let recipeTitles = function(){
            
            return recipeArray.map((el, i) => `<h2><a href="#" class="recipeTitles" id="${el.id}">${el.title}</a> -- Carbohydrates: ${(el.nutrition.nutrients[3].amount).toFixed(2)}g</h2>`).join('')
        }
        document.querySelector('#recipeContainer').innerHTML = recipeTitles()
    } else if (event.target.value == 'sortCalories') {
        
        recipeArray = recipeArray.sort((a,b) => a.nutrition.nutrients[0].amount - b.nutrition.nutrients[0].amount)
        let recipeTitles = function(){
            
            return recipeArray.map((el, i) => `<h2><a href="#" class="recipeTitles" id="${el.id}">${el.title}</a> -- Calories: ${(el.nutrition.nutrients[0].amount).toFixed(0)}kcal</h2>`).join('')
        }
        document.querySelector('#recipeContainer').innerHTML = recipeTitles()
    }
}

