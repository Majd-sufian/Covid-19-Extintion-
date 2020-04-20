window.onload = () => {
  	getData() 
  	getUserCountry()
}

const getUserCountry = () => {
	fetch('http://ip-api.com/json/')
	.then( res => res.json())
	.then(response => {
		userCountry(response.country);
		// console.log(response.country);

	 })
	 .catch((data, status) => {
	    console.log('Request failed');
	})
}	 

const userCountry = (user) => {
	document.getElementById("user-country").innerHTML = user
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://corona.lmao.ninja/all", requestOptions)
  .then(response => response.json())
  .then(result => globalCases(result))
  .catch(error => console.log('error', error));


const globalCases = (result) => {
	let cases = result.cases
	var number = document.getElementById("cases")
	number.innerHTML = cases
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

const getData = () => {
  fetch("https://corona-api.com/countries", requestOptions) 
  .then((response) => response.json())
  .then((result) => {
  	sortCountriesByCasesNumber(result.data)
  })
}

function sortCountriesByCasesNumber(countries){
  	for (let j = 0; j < countries.length - 1; j++) {
	    let max_obj = countries[j];
	    let max_location = j;
	        for (let i = j; i < countries.length; i++) {
	            // if you want to get elements form smaller to bigger just write (< instead >)
	            if (countries[i].latest_data.confirmed > max_obj.latest_data.confirmed) {
	                max_obj = countries[i]
	                max_location = i
	       	     }
	        }
	    countries[max_location] = countries[j]
	    countries[j] = max_obj
		}
	var countries
 
	fillHtmlCountries(countries)
}

const fillHtmlCountries = (countries) => {
	var firstCountry = countries[0]
	var secondCountry = countries[1]
	var thirdCountry = countries[2]
	var fourthCountry = countries[3]
	var userLocationCountry = document.getElementById("user-country").innerHTML
	const foundCountry = countries.find(country => country.name === userLocationCountry)
	const userCountryPostion = countries.indexOf(foundCountry)
	var userCountry = [userCountryPostion, foundCountry]
	let HTML = ''
	if (firstCountry && secondCountry && thirdCountry && fourthCountry){
		HTML += `
			<p class="countries">1- ${firstCountry.name}: <span style="color: #F47027">${firstCountry.latest_data.confirmed}</span> Cases</p>
			<p class="countries">2- ${secondCountry.name}: <span style="color: #F47027">${secondCountry.latest_data.confirmed}</span> Cases</p>
			<p class="countries">3- ${thirdCountry.name}: <span style="color: #F47027">${thirdCountry.latest_data.confirmed}</span> Cases</p>
			<p class="countries">4- ${fourthCountry.name}: <span style="color: #F47027">${fourthCountry.latest_data.confirmed}</span> Cases</p>
		`
	} if (typeof userCountry[1] === 'undefined') {
		console.log(userCountry)
	} else {
		HTML += `
			<p class="countries">${userCountry[0]+1}- <span id="user-country">${userCountry[1].name}</span>: <span style="color: #F47027">${userCountry[1].latest_data.confirmed}</span> Cases</p>
		`
	}
	HTML += `
		<a class="Map-link" href="https://majd-sufian.github.io/Covid-19-MAP" target="_blank">More Info</a>
	`
	document.getElementById("top-countries").innerHTML = HTML
}
