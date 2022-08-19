const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9bed4c38cbmsh83afba90d54a49bp11db7bjsn79f39ea5353e',
        'X-RapidAPI-Host': 'cocktails3.p.rapidapi.com'
    }
};

var base = document.getElementById("starter-input");
var musicGenre = document.getElementById("music-input");

var resultBtn = document.getElementById("result");
resultBtn.addEventListener("click", function (event) {
    event.preventDefault;
    fetch(`https://cocktails3.p.rapidapi.com/search/byingredient/${base.value}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            randomDrinks(response)
        })
        .catch(err => console.error(err));

    recentSearchs();
    

})



function recentSearchs() {
    var baseIngredient = base.value;
    var musicSelection = musicGenre.value;
    var userRecents = JSON.parse(localStorage.getItem("user-recent")) || [];
    var recents = {
        alcohol: baseIngredient,
        genre: musicSelection
    }

    userRecents.push(recents)

    localStorage.setItem("user-recent", JSON.stringify(userRecents));

};

function printRecentSearch() {
    var userRecents = JSON.parse(localStorage.getItem("user-recent")) || [];
    var reverseUserRecents = userRecents.reverse();
    if (reverseUserRecents.length === 0) {
        return
    } else {
        for (var i = 0; i < 4; i++) {
            var collectionEl = document.querySelector(".collection")
            var aEl = document.createElement("a");
            aEl.className = "collection-item";
            aEl.textContent = reverseUserRecents[i].alcohol + " with " + reverseUserRecents[i].genre;
            collectionEl.appendChild(aEl)
        }
    }
}

printRecentSearch();

function getRandom(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    var randomBase = arr[randomIndex];
    return randomBase;
}

function randomDrinks (data) {
    var drink = getRandom(data.body[0]); 
    console.log(drink)
    displayIngredients(drink)
};



function displayIngredients (drink) { 
        for (var i = 0; i < drink.ingredients.length; i++) {
            var liEl = document.createElement("li");
            liEl.textContent = drink.ingredients[i]; 
            document.getElementById("ingredients-list").appendChild(liEl); 
        } 
}; 



const token = '';
fetch('https://api.spotify.com/v1/browse/categories', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: 'false'
})
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
