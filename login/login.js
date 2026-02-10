let name = document.querySelector('#name1');
let surname = document.querySelector('#surname');
let number = document.querySelector('#number');
let password = document.querySelector('#password');
let submit = document.querySelector('#submit');
let city = document.querySelector('#city');

let users = {};//осы жерде биздин барлык ползов сакталады

function User(name1, surname ,password, number, city) //каждый раз новый обьект создавать етеди с новым ползов и let userге салынады 
{
  this.name = name1; //создали обьекты
  this.surname = surname;
  this.password = password;
  this.number = number;
  this.city = city;
}

function createid(users){
  return Object.keys(users).length;
}
//обработчик событий
submit.addEventListener('click', () => {
  //поляга жазылган заттарды алу кк
  const name1User = name1.value;
  const surnameUser = surname.value;
  const passwordUser = password.value;
  const numberUser = number.value;
  const cityUser = city.value;

  //барлык алган затты 1-обьектка жинау
  const user = new User(name1User, surnameUser,  passwordUser, numberUser, cityUser)
  //poluchaem nash id
  const userId = 'User' + createid(users)

  //новый ползовательди обьектге добавить ету
  users[userId] = user;
  console.log(users);
})


