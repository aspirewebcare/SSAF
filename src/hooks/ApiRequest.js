



export const ApiRequest = (countryCode = '', type = '') => {
    var headers = new Headers();
    let API_KEY = "NWZBaWhOdmVlSzJ1V0N5TTg1ZlZvbm5ORkU0TmJFcUI1QkFLc2k0Yw=="
    headers.append("X-CSCAPI-KEY", API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    if (type === 'states') {
        return fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions).then(response => response.json())
    }
    if (type === 'cities') {
        return fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/cities`, requestOptions).then(response => response.json())
    }


}