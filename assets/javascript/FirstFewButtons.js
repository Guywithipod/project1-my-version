
const getIngredients = obj => {
    const re = 'strIngredient';

    const keys = Object.keys(obj).filter(key => key.indexOf(re) > -1);
    return keys.map(key => obj[key]).filter(ingred => ingred !== '');

}
document.querySelectorAll("button").forEach(function (node) {

    node.addEventListener("click", function () {

        const drink = event.target.id;

        const cockTailQueryUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink;

        fetch(cockTailQueryUrl).then(function (response) {
            return response.json()
        }).then(function (responseJson) {

            const results = responseJson;
            document.getElementById("drink-names").innerHTML = '';
        
            let wrapper;
            for (let i = 0; i < 3; i++) {
                const ingredients = getIngredients(results.drinks[i]);
                console.log(ingredients);
                wrapper = document.createElement('div');
                wrapper.classList.add('drink-wrapper');
                const cockTail = results.drinks[i].strDrink;
                const recipeInstructions = results.drinks[i].strInstructions;
                const imgURL = responseJson.drinks[i].strDrinkThumb;
                const nameRecipeWrapper = document.createElement('div');
                nameRecipeWrapper.classList.add('name-recipe-wrapper');
                const cockTailDiv = document.createElement("p");
                cockTailDiv.setAttribute("id", "name");
                cockTailDiv.innerHTML = cockTail;
                
                const imageDiv = document.createElement("img");
                imageDiv.setAttribute("src", imgURL);
                imageDiv.innerHTML = imgURL;
                
                const recipeDiv = document.createElement("p");
                recipeDiv.setAttribute("id", "instructions");
                recipeDiv.innerHTML = recipeInstructions;
                nameRecipeWrapper.append(cockTailDiv)
                nameRecipeWrapper.append(recipeDiv)
                wrapper.append(nameRecipeWrapper)
                //wrapper.append(recipeDiv)
                wrapper.append(imageDiv);
                
                document.getElementById("drink-names").prepend(wrapper);            
            }
        });
    });
});