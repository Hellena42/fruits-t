const axios = require('axios');

const getData = async () => {
  const resp = await axios.get('https://api.appery.io/rest/1/db/collections/testCollection/', {
    headers: {
      'X-Appery-Database-Id': '58226eeee4b0a696f3532f3d'
    }
  });
  return resp;
}

const postData = async (newItem) => {
  try {
    const resp = await axios({
      method: 'POST',
      url: 'https://api.appery.io/rest/1/db/collections/testCollection/',
      headers: {
      'X-Appery-Database-Id': '58226eeee4b0a696f3532f3d'
      },
      data:newItem
  });

  console.log('resp', resp);
  return resp;

  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  getData,
  postData
}