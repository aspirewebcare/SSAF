
export const BASE_URL_AUTH = 'https://development.ssaflogistics.com/auth';
export const BASE_URL = 'https://development.ssaflogistics.com/cms/v1';

const BASE_URL_COUNTRY = 'https://api.countrystatecity.in/v1/countries';


export default function ApiRequest(Method = 'GET', Path, Token = '', Body = {}, isAuth = false) {


  var myHeaders = new Headers();
  if (Token) {
    myHeaders.append("Authorization", `Bearer ${Token}`);
  }
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(Body);

  var requestOptions = {
    method: Method,
    headers: myHeaders,
    redirect: 'follow'
  };

  if (Method === 'POST' || Method === 'PATCH') {
    requestOptions.body = raw;
  }

  if (isAuth) return fetch(`${BASE_URL_AUTH}${Path}`, requestOptions).then((res) => res.json());
  
  return fetch(`${BASE_URL}${Path}`, requestOptions).then((res) => res.json());
}

export const CountryApiReq = (countryCode = '', type = '', states = '') => {
  var headers = new Headers();
  let API_KEY = "NWZBaWhOdmVlSzJ1V0N5TTg1ZlZvbm5ORkU0TmJFcUI1QkFLc2k0Yw=="
  headers.append("X-CSCAPI-KEY", API_KEY);

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  if (type === 'states') {
    return fetch(`${BASE_URL_COUNTRY}/${countryCode}/states`, requestOptions).then(response => response.json())
  }
  if (type === 'cities') {
    return fetch(`${BASE_URL_COUNTRY}/${countryCode}/states/${states}/cities`, requestOptions).then(response => response.json())
  }


}