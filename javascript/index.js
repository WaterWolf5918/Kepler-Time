let socket = io('ws://192.168.1.22:3000');
var sockConnect = false;




function checkconnection(){
	console.log(`Connection status: ${sockConnect}`);
	setTimeout(checkconnection, 2000);
}
checkconnection();




// function test (){
//  if (socket.connected){
// 	console.log(`Requesting weather data from localAPI ${socket.connected()}`);
//  }else{
// 	console.log(`Requesting weather data from remoteAPI ${socket.connected()}`);
//  }
// 	console.log('Requesting weather data');
// 	setTimeout(test, 30000);

// }
// test()


socket.on('connect', () => {
	sockConnect = true;
})

socket.on('disconnect', () => {
	sockConnect = false;
})

socket.on('reconnect', () => {
	sockConnect = true;
})



function refreshWeather(){
	if (sockConnect === true){
		console.log('Requesting weather data from localAPI');
	}else{
		console.log('Requesting weather data from remoteAPI');
	}
	setTimeout(refreshWeather, 5000);
}
refreshWeather();





socket.on('weather', () => {

	getWeather((weather) => {
		console.log(weather)
		document.getElementById('temp').innerText = Math.round(weather.temperature.F) + 'F';
		document.getElementById('title').innerText = weather.textDescription;
		document.getElementById('high-low').innerText = 'Loading... | Loading...';
	})
	getMinMax((minMax) => {
		document.getElementById('high-low').innerText = `${minMax.min.F}F | ${minMax.max.F}F`;
		console.log(minMax)
	})
});


function degToCompass(num){
    const val =  Math.floor((num / 45) + 0.5);
    const arr = ["N","NE","E", "SE","S","SW","W","NW"];
    return arr[(val % 8)]
}



async function getMinMax(callback){
	$.get("https://api.weather.gov/gridpoints/CTP/37,28",(data) => {
		let cmin = Math.round(data.properties.minTemperature.values[0].value);
		let fMin = (cmin * 9/5) + 32;
		let cmax = Math.round(data.properties.maxTemperature.values[0].value);
		let fMax = (cmax * 9/5) + 32;
		callback({
			min: {
				C: cmin,
				F: fMin
			},
			max: {
				C: cmax,
				F: fMax
			}
		});
	})

}


async function getWeather(callback){
	$.get('https://api.weather.gov/stations/KUNV/observations/latest',(data) => {
		let cTemp = data.properties.temperature.value;
		let fTemp = (cTemp * 9/5) + 32;
		let windKmh = data.properties.windSpeed.value;
		let windMph = windKmh * 0.621371;
		let windDirDeg = data.properties.windDirection.value;
		let windDir = degToCompass(windDirDeg);
		let Cdewpoint = data.properties.dewpoint.value;
		let Fdewpoint = (Cdewpoint * 9/5) + 32;
		let textDescription = data.properties.textDescription;
	
	
		// console.log(`The current temperature is ${fTemp} degrees Fahrenheit.`);
		callback({
			temperature: {
				C: cTemp,
				F: fTemp
			},
			wind: {
				Kmh: windKmh,
				Mph: windMph,
				Direction: {
					Deg: windDirDeg,
					Dir: windDir
				}
			},
			dewpoint: {
				C: Cdewpoint,
				F: Fdewpoint
			},
			textDescription: textDescription
		});

	})

}


function createElement(args){
    let doc = document.getElementById('weather-info');
    let d = document.createElement('div');
    args.forEach(element => {
        d.innerHTML += `
        <p>${element}</p>
        `;
    });

    doc.appendChild(d);
}

function clearElement(id){
    let doc = document.getElementById('weather-info');
    doc.innerHTML = '';
}











// createElement(['Temperature:', 'Humidity:', 'Pressure:', 'Wind Speed:', 'Wind Direction:', 'Cloudiness:', 'Sunrise:', 'Sunset:']);


// createElement('Temperature: ');
// Document.body.background = 'https://i.redd.it/wbnn4jk6p9j31.jpg';
// document.body.style.backgroundImage = "url('https://i.redd.it/wbnn4jk6p9j31.jpg')"; 








