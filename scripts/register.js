const formForRegister = document.getElementById('form-for-register'); //dohvati cijelu formu
const username = document.getElementById('username'); //dohvati unos korisnika za username
const password = document.getElementById('password'); //dohvati unos korisnika za password

const register = (data) => {
  $.ajax({
    url: 'https://www.fulek.com/data/api/user/register', //url na koji saljemo post
    method: 'POST', 
    contentType: 'application/json', //znaci da saljemo podatke u JSON formatu
    data: JSON.stringify(data), // pretvaramo u string
    success(response){
      if(response.isSuccess) {
        location.replace('login.html');
      }
      else{
        alert('Pogreška pri registraciji.');
      }
    },
    error() {
      alert('Greška kod slanja podataka.');
    }
  })
}

formForRegister.addEventListener('submit', (event) => {
  event.preventDefault(); //sprijeci refreshanje stranice

  const userData = {
    username: username.value,
    password: password.value
  }
  register(userData);
});

