let opened = false;

function showContact(){
  if(!opened){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('contact-modal').style.display = 'block';
    opened = true;
  }
  else {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('contact-modal').style.display = 'none';
    opened = false;
  }
}

const cancelButton = document.querySelector('.cancel-button');
cancelButton.addEventListener('click', () => {
  opened = true;
  showContact();
});


// const url = 'https://www.fulek.com/mvc/supit/project-contact-form';
// const form = document.getElementById('contact-form');
// const FullName = document.getElementById('FullName');
// const Email = document.getElementById('Email');
// const Importance = document.getElementById('Importance');
// const Message = document.getElementById('Message');
// const ReceiveNewsletter = document.getElementById('ReceiveNewsletter');

// // Event listener za submit forme
// form.addEventListener('submit', (event) => {
//   event.preventDefault();  // Sprečava da se forma automatski pošalje

//   // Kreiramo podatke za slanje
//   const data = {
//     FullName: FullName.value,
//     Email: Email.value,
//     Importance: Importance.value,
//     Message: Message.value,
//     ReceiveNewsletter: ReceiveNewsletter.checked ? 'true' : 'false'  // Ako je checkbox označen, šalje 'true'
//   };

//   // Slanje podataka putem fetch-a u JSON formatu
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',  // Postavljamo da šaljemo JSON
//     },
//     body: JSON.stringify(data)  // Pretvaramo podatke u JSON
//   })
//     .then((response)  => {
//       console.log(response);  // Proverite šta server vraća
//       return response.json();
//     })// Pretvaramo odgovor u JSON
//     .then((data) => {
//       if (data.isSuccess) {
//         // Ako je uspešno, sačuvaj podatke u sessionStorage
//         sessionStorage.setItem('FullName', data.FullName);
//         sessionStorage.setItem('Email', data.Email);
//         sessionStorage.setItem('Importance', data.Importance);
//         sessionStorage.setItem('Message', data.Message);
//         sessionStorage.setItem('ReceiveNewsletter', data.ReceiveNewsletter);
//         form.reset();  // Resetuje formu
//         alert('Forma uspešno poslata!');
//       } else {
//         alert('Greška kod slanja forme.');
//         form.reset();
//       }
//     })
//     .catch((error) => {
//       console.error('Greška kod slanja na server:', error);
//       alert('Greška kod servera');
//       form.reset();
//     });
// });

