const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

const url = 'https://www.fulek.com/data/api/user/login';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    username: username.value,
    password: password.value
  } //prikupljam podatke koje je korisnik upisao

  const login = new XMLHttpRequest(); //kreira novi http zahtjev
  login.open('POST', url); //postavla zahtjev na POST
  login.setRequestHeader('Content-Type', 'application/json'); //tip sadrzaja json kako bi server ocekivo json
  login.responseType = 'json'; //odgovor mora biti konvertiran u json

  login.onload = () => { //nakon sto server odgovori
      if(login.status == 200 && login.readyState == 4) {
        const response = login.response; //odgovor je u json

        if(response.isSuccess){
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('token', response.data.token);
          location.replace('index.html');
        }
        else{
          alert('Greška kod prijave.')
        }

      }
      else {
        alert ('Server greska')
      }
  }

  login.send(JSON.stringify(data)); //pretvara data u json i salje ga kao POST
});

