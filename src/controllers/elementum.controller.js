const axios = require('axios');

let getList = async () => {
    const resp = await axios.get('https://jsonplaceholder.typicode.com/users');
    return resp;
}

const resFunc = async () => {
  let List = await getList();
  return List;
}

const postUser = async (newUser) => {
  const resp = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
  return resp;
};

module.exports = {
  resFunc,
  postUser
}