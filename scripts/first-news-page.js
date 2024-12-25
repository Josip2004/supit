function FullView(link) {
  document.getElementById('full-screen-image').src = link;
  document.getElementById('full-screen').style.display = "flex";
}

function closeImage() {
  document.getElementById('full-screen-image').src = "";
  document.getElementById('full-screen').style.display = "none";
}

function changeImage(){
  const firstImg = document.querySelector('.js-first-img');
  const secondImg = document.querySelector('.js-second-img');


  if(firstImg){
    FullView(firstImg.src);
  }
  else{
    FullView(secondImg.src);
  }
}