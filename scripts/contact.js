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