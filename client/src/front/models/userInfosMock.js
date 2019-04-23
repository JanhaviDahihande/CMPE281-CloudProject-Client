// @flow

let name = JSON.parse(localStorage.getItem('name'));
let lname = JSON.parse(localStorage.getItem('lname'));
let token = JSON.parse(localStorage.getItem('user_id'));

export const userInfosMockData = {
  login: name,
  firstname: name,
  lastname: lname,
  picture: require('../img/user.jpg'), // or from an url: 'https://placeimg.com/120/120/people', // or from a relative path (NOTE: this path like public/.. may not be availaible when in dev hot reload!) './public/img/user.jpg',
  showPicture: false,
  token: token,
};
export default userInfosMockData;
