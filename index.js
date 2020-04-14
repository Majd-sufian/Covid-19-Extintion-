window.onload = () => {
  	getData() ;
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
	let deaths = result.deaths
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

function sortCountriesByCasesNumber(country){
  	for (let j = 0; j < country.length - 1; j++) {
	    let max_obj = country[j];
	    let max_location = j;
	        for (let i = j; i < country.length; i++) {
	            // if you want to get elements form smaller to bigger just write (< instead >)
	            if (country[i].latest_data.confirmed > max_obj.latest_data.confirmed) {
	                max_obj = country[i]
	                max_location = i
	       	     }
	        }
	    country[max_location] = country[j]
	    country[j] = max_obj
		}
	var firstCountry = country[0].latest_data.confirmed
	var secondCountry = country[1].latest_data.confirmed
	var thirdCountry = country[2].latest_data.confirmed
	var fourthCountry = country[3].latest_data.confirmed
	console.log(firstCountry)

	// fillHtmlCountries(firstCountry, secondCountry, thirdCountry, fourthCountry)
}

const fillHtmlCountries = (firstCountry, secondCountry, thirdCountry, fourthCountry) => {
	HTML = `
		<p class="countries">1- USA: <span style="color: #F47027">${}</span> Cases</p>
		<p class="countries">2- Spain: <span style="color: #F47027">${}</span> Cases</p>
		<p class="countries">3- Italy: <span style="color: #F47027">${}</span> Cases</p>
		<p class="countries">43- France: <span style="color: #F47027">${}</span> Cases</p>
		<p class="countries">43- Germany: <span style="color: #F47027">${}</span> Cases</p>
		<a class="Map-link" href="https://majd-sufian.github.io/Covid-19-MAP">More Info</a>
	`

	document.getElementsByClassName('modal-icons').innerHTML = HTML
}