document.addEventListener('DOMContentLoaded', function () {
    const token = 'BQC5ON-KMyoQpvYQOCTFEznsjTDjfQdPMVOIo9gqDfTg5ENvmELyAetjhXZi8PpUrjHC7_imv8vOR_b3gxqRjbrR-Y95dpbl9vpRmaqLBj9qcC0nFGecpTRZq0CXJd5KegoZe0W3Hebl95CMAbqdZaHVnsSelErXPNrciEj4ipXKyamShCdAvT0pdfBPCf_G-xqiHSxmBICLislYQ-2XI3A';

    fetch('https://api.spotify.com/v1/browse/categories', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response.categories.items);
            var selectMusicEl = document.querySelector('#music-input');

            for (var i = 0; i < response.categories.items.length; i++) {
                console.log('Line 18');
                var optionEl = document.createElement('option');
                optionEl.value = response.categories.items[i].id;
                optionEl.textContent = response.categories.items[i].name;

                selectMusicEl.appendChild(optionEl);
            }

            var elems = document.querySelectorAll('#music-input');
            var instances = M.FormSelect.init(elems);
        })
        .catch(err => console.error(err));





    var base = document.getElementById("starter-input");
    var musicGenre = document.getElementById("music-input");

    var resultBtn = document.getElementById("result");
    resultBtn.addEventListener("click", function (event) {
        console.log(event.target);
        event.preventDefault();

        var musicCategoryId = document.querySelector('#music-input').value;
        console.log(musicCategoryId);


        fetch(`https://api.spotify.com/v1/browse/categories/${musicCategoryId}/playlists`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.playlists.items[0].name);
                var playlistId = response.playlists.items[0].id;

                document.querySelector('#spot').src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;

                recentSearchs(response.playlists.items[0].name);
                
            })
            .catch(err => console.error(err));

        fetch(`https://cocktails3.p.rapidapi.com/search/byingredient/${base.value}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9bed4c38cbmsh83afba90d54a49bp11db7bjsn79f39ea5353e',
                'X-RapidAPI-Host': 'cocktails3.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                randomDrinks(response);
                printRecentSearch();
            })
            .catch(err => console.error(err));



        


    })








    function recentSearchs(name) {
        var baseIngredient = base.value;
        var musicSelection = name;
        var userRecents = JSON.parse(localStorage.getItem("user-recent")) || [];
        var recents = {
            alcohol: baseIngredient,
            genre: musicSelection
        }

        userRecents.push(recents)

        localStorage.setItem("user-recent", JSON.stringify(userRecents));
    };

    function printRecentSearch() {
        // create logic to clear all elements in current .collection
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

    function randomDrinks(data) {
        var drink = getRandom(data.body[0]);

        displayIngredients(drink)
    };



    function displayIngredients(drink) {
        for (var i = 0; i < drink.ingredients.length; i++) {
            var liEl = document.createElement("li");
            liEl.textContent = drink.ingredients[i];
            document.getElementById("ingredients-list").appendChild(liEl);
        }
    };



    // const token = 'BQDznNcAU__fLCxJ75_CaIlBgluBBeWpMC8oLlTlYRBuBS2dQjxVyweh_YlyYQu66ooS7g1PgxyIWoFV6gnUyFsdZYiOIkxfGzFr5Zvt-b8hdqLQREDnRDabGumLPLbMUT-VIZScjTaDVIDQi1LBiHExZEuScb24IVmHe-rXNlC2e86nZfthhQ1NPh-dSS6Ep8ReRdM2iGMx6ehbRfMm3Jk';
    // fetch('https://api.spotify.com/v1/browse/categories', {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json'
    //     },
    //     body: 'false'
    // })
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

});