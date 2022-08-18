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

    saveRecentBase();
    saveRecentMusic(); 
})

 
function saveRecentBase() {
    var recentBaseEl = JSON.parse(localStorage.getItem("base")) || [];
    var baseIngredient = document.getElementById("starter-input").value; 
    recentBaseEl.push(baseIngredient);
    localStorage.setItem("base", JSON.stringify(recentBaseEl)); 
    
};

function saveRecentMusic() {
    var recentMusicEl = JSON.parse(localStorage.getItem("music")) || [];
    var musicSelection = document.getElementById("music-input").value; 
    recentMusicEl.push(musicSelection);
    localStorage.setItem("music", JSON.stringify(recentMusicEl)); 
    
};



