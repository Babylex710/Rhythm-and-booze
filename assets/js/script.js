const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9bed4c38cbmsh83afba90d54a49bp11db7bjsn79f39ea5353e',
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
    }
};

var base = document.getElementById("starter-input").value

var resultBtn = document.getElementById("result")
resultBtn.addEventListener("click", function (event) {
    event.preventDefault;
    console.log(base)
})

fetch('https://the-cocktail-db.p.rapidapi.com/filter.php?i=${base}', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


var client_id = '38d4f68f7ce6463c8dc8b2f535d166fd';
var client_secret = '3f3067d5f53b49e89e4f417617dfeb88';

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
});

request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var token = body.access_token;
    }
});