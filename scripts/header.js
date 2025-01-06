document.addEventListener('DOMContentLoaded', () => {
const updateHeader = () => {
    const isLogged = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const loginSectionHeader = document.querySelector('.link-section:first-child');
    const curriculum = document.querySelector('.curriculum');

    if(isLogged){
      document.querySelector('.header').classList.add('logged'); // radi responzive
      loginSectionHeader.innerHTML = '';

      const imgLoggedIn = document.createElement('img');
      imgLoggedIn.className = 'img-logged-in';
      imgLoggedIn.src = 'pictures/logout.png';

      const logoutElement = document.createElement('a');
      logoutElement.className = 'logout';
      logoutElement.textContent = 'Odjavi ';

      const usernameText = document.createElement('p');
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
