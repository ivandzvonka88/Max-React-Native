import axios from 'axios';
import { Auth } from 'aws-amplify';
export const dayOptionsTranslations = {
  一周3练: 3,
  一周4练: 4,
  一周5练: 5,
  一周6练: 6
};

const getStripeURL = `https://xrtvbvduxl.execute-api.us-west-2.amazonaws.com/${process.env.REACT_APP_API_VER}/getStripe`;
const usersURL = `https://rtazrn3d21.execute-api.ap-northeast-1.amazonaws.com/dev/api/users/`


var config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// GET
export const makeRequest = async (cognito_id) => {
  console.log('makeRequest:', cognito_id)
  var authToken = await (await Auth.currentSession()).idToken.jwtToken;
  var specialConfig = config
  specialConfig.headers.Authorization = authToken
  return axios
    .get(usersURL.concat(cognito_id), specialConfig)
    .then(data => data.data)
    .catch(error => console.log(error));
};

// POST
export const updateUser = payload => {
  return axios
    .put(usersURL.concat(`${payload.cognito_id}`), payload, config)
    .then(data => { return data.data })
    .catch(error => console.log(error));
};

export const getStripeLink = pl => {
  var dates = String(pl.date_start).split(' ');
  var date = new Date(Date.parse(`${dates[1]} ${dates[2]} ${dates[3]} `))
    .toISOString()
    .split('T')[0];

  const q = {
    cognito_id: pl.cognito_id,
    program: pl.program_type,
    frequency: dayOptionsTranslations[pl.frequency],
    start_date: date
  };

  const data = JSON.stringify(q);

  return axios
    .put(getStripeURL, data, config)
    .then(data => window.open(data.data))
    .catch(error => console.log(error));
};
