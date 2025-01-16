document.addEventListener('DOMContentLoaded', function() {
  // button sa kojim cemo otvoriti
  const openButton = document.querySelector('.contact-button');


  openButton.addEventListener('click', function(e) {
    e.preventDefault();
    openContactForm();
  });


  function openContactForm() {
    // Ako je vec otvoreno ne otvaramo ponovo
    if (document.querySelector('#overlay')) {
      return;
    }

    // Ucitavamo sve iz contact.html
    fetch('contact.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ne ucitava se contact.html');
        }
        return response.text();
      })
      .then(data => {
        // Kreiramo novi div koji sadrzi modal
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = data;
        document.body.appendChild(modalDiv);

        // Dohvatimo modal
        const modal = modalDiv.querySelector('#overlay');

        // Ako ne posotji ispisi gresku
        if (!modal) {
          console.error('Modal nije pronađen!');
          return;
        }

        // Prikazujemo modal
        modal.style.display = 'block';

        // Zatvaranje 
        const closeModal = modalDiv.querySelector('.cancel-button');
        closeModal.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.removeChild(modalDiv);
        });

        // Zatvaranje ako kliknes negdje sa strane
        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modalDiv);
          }
        });

        // Zatvaranje ako ponovno kliknes Kontakt
        if(modal.style.display = 'block'){
          openButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.removeChild(modalDiv);
          })
        }
      })
      .catch(error => {
        console.error('Greška prilikom učitavanja kontakt forme:', error);
      });
  }
});



