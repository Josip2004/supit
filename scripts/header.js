document.addEventListener('DOMContentLoaded', () => {
const updateHeader = () => {
    const isLogged = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const loginSectionHeader = document.querySelector('.link-section:first-child'); //da postavimo na pocetak
    const curriculum = document.querySelector('.curriculum');

    //ako je korisnik ulogiran (provjeravamo tokenom)
    if(isLogged){
      document.querySelector('.header').classList.add('logged'); // radi responzive
      loginSectionHeader.innerHTML = ''; //Makne Prijavi se tekst

      const imgLoggedIn = document.createElement('img'); // kreiram ikonu za odjavu
      imgLoggedIn.className = 'img-logged-in';
      imgLoggedIn.src = 'pictures/logout.png';

      const logoutElement = document.createElement('a'); // kreiram <a> za Odjavi
      logoutElement.className = 'logout';
      logoutElement.textContent = 'Odjavi ';

      const usernameText = document.createElement('p'); //ime username napisano
      usernameText.className = 'username-text';
      usernameText.textContent = username;

      logoutElement.addEventListener('click', () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        location.reload(); //za refresh, ponovno ucita url
      });

      //dodaj elemente u header
      loginSectionHeader.appendChild(imgLoggedIn);
      loginSectionHeader.appendChild(logoutElement);
      loginSectionHeader.appendChild(usernameText);

      curriculum.style.display = 'flex';//prikazi Nastavni plan u headeru
    }
    else { //kada nismo prijavljeni
      //vec je napisan html kod u headeru kada nismo ulogirani
      document.querySelector('.header').classList.remove('logged');
    }
  }

  updateHeader();
});


function toggleMenu() {
  const menu = document.querySelector('.left-section');
  menu.classList.toggle('active'); //toggle dodaje ako ne postoji ili ne dodaje ako postoji
}

const hamburgerMenu = document.querySelector('.hamburger-menu');
hamburgerMenu.addEventListener('click', () => {
  toggleMenu();

  document.querySelector('.header').classList.toggle('expanded');
});
