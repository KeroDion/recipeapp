document.querySelector('#btn').addEventListener('click',getRecipe)

function getRecipe(){
    let ingredients = document.querySelector('#ingredient').value
    // let numberOfMissingIngredients = document.querySelector('#missingIngredients').value
    let numberOfRecipes = document.querySelector('#numberOfRecipes').value
    //Url of spoonacular api, with authentication key(got by making an account). Type in ingredients to get an Array of Recipe titles
    let url =`https://api.spoonacular.com/recipes/findByIngredients?apiKey=2d7e0ded8af74b1897224317ce6c662c&ingredients=${ingredients}&addRecipeInformation=true&number=${numberOfRecipes}`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data) //get the response(array) of the api
            console.log(data[0].title) //title of the first recipe
            
        //    document.querySelector('#recipeTitle').innerHTML = data[0].title // implement title into DOM
        //     document.querySelector('img').src = data[0].image // get the image of the first recipe
            for(let title in data){
                if(data.hasOwnProperty(title)){
                    console.log(data[title].title)
                    console.log(data[title].image)
                    // created an li and img tag for the title of the meal and image being returned
                    const li = document.createElement('li')
                    const img = document.createElement('img')
                    // Added text and image to the li
                    li.textContent = data[title].title
                    img.src = data[title].image
                    // append to the ul
                    document.querySelector('ul').appendChild(li)
                    document.querySelector('ul').appendChild (img)
                    // make each object property returned a relative link, so when clicked on, it gives the full information needed from the request.
                    
                }
            }
                
                
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
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
