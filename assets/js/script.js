const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9bed4c38cbmsh83afba90d54a49bp11db7bjsn79f39ea5353e',
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
    }
};

var base = document.getElementById("starter-input");
var musicGenre = document.getElementById("music-input");

var resultBtn = document.getElementById("result");
resultBtn.addEventListener("click", function (event) {
    event.preventDefault;
    fetch(`https://the-cocktail-db.p.rapidapi.com/filter.php?i=${base.value}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    // saveRecentBase();
    // saveRecentMusic(); 
    // printRecent(); 

    recentSearchs(); 
    
})

 
// function saveRecentBase() {
//     var recentBaseEl = JSON.parse(localStorage.getItem("base")) || [];
//     var baseIngredient = document.getElementById("starter-input").value; 
//     recentBaseEl.push(baseIngredient);
//     localStorage.setItem("base", JSON.stringify(recentBaseEl)); 
    
// };

// function saveRecentMusic() {
//     var recentMusicEl = JSON.parse(localStorage.getItem("music")) || [];
//     var musicSelection = document.getElementById("music-input").value; 
//     recentMusicEl.push(musicSelection);
//     localStorage.setItem("music", JSON.stringify(recentMusicEl)); 
    
// };

// function printRecent () {
//     baseRecent = localStorage.getItem("base")
//     console.log(baseRecent)
// };


function recentSearchs () {
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

function printRecentSearch () {
    var userRecents = JSON.parse(localStorage.getItem("user-recent")) || [];
    if (userRecents.length === 0) {
        return
    } else {
    for (var i=0; i < 4; i++) {
        var collectionEl = document.querySelector(".collection")
        var aEl = document.createElement("a");
        aEl.className = "collection-item";
        aEl.textContent = userRecents[i].alcohol + " with " + userRecents[i].genre;
        collectionEl.appendChild(aEl)
    }
    }}

    printRecentSearch(); 


// request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var token = body.access_token;
//     }
// });


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
