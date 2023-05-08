
let sunriseTextbox = document.getElementById("sunrise-time")
let sunsetTextbox = document.getElementById("sunset-time")
let latInput = document.getElementById("lat")
let lngInput = document.getElementById("lng")
let dateInput = document.getElementById("date")
let errorMessage = "Помилка API запиту"

async function requestToSunriseAndSunsetOrg(link){
	for (var i = 0; i < 5; i++) {
		try {
			let response = await fetch(link);
			let data = await response.json()
			if (data.status = "OK"){
				let results = data.results;
				return [results.sunrise, results.sunset];
			}
			else {
				throw new Error(errorMessage)
			}
		}
		catch {
			console.log(errorMessage);
			await new Promise(resolve => setTimeout(resolve, 2000)); // pause for 1 second
		}
	}

	return [errorMessage, errorMessage];
}


function linkGenerator(){		
	let link = "https://api.sunrise-sunset.org/json";
	link += "?";
	let lat = latInput.value;
	let lng = lngInput.value;
	let date = dateInput.value;
	let params = [				
		{name: "lat", value: lat}, 
		{name: "lng", value: lng}, //input elements list
		{name: "date", value: date}];

	for (var i = 0; i <= params.length - 1; i++) {
		link += params[i].name + "=" + params[i].value + "&"
	}

	return link
}


function setSunriseAndSunset() {
	const link = linkGenerator();
	let results = requestToSunriseAndSunsetOrg(link);
	results.then(function(result) {
		sunriseTextbox.innerHTML = result[0];
		sunsetTextbox.innerHTML = result[1];
	});
}


document.getElementById("requestAPI").addEventListener("click", setSunriseAndSunset);
