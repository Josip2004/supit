const historyParagraphs = document.querySelectorAll('.history-text'); //skupi sve elemente sa .history-text klasom
const groupParagraphs = document.querySelectorAll('.algebra-group-text');

//za Algebra grupa
document.addEventListener('scroll', () => {
  groupParagraphs.forEach(paragraph => {
    if(IsVisible(paragraph)) {
      paragraph.classList.add('algebra-group-text-visible');
    }
  });
});

document.addEventListener('click', () => {
  groupParagraphs.forEach(paragraph => {
    if(IsVisible(paragraph)){
      paragraph.classList.add('algebra-group-text-visible');
    }
  });
});


//za Povijest
document.addEventListener('scroll', () => {
  historyParagraphs.forEach(paragraph => {
    if(IsVisible(paragraph)) {
      paragraph.classList.add('history-text-visible');
    }
  });
});

const clickButton = document.querySelector('.history-link');

clickButton.addEventListener('click', () => {
  historyParagraphs.forEach(paragraph => {
    if(IsVisible(paragraph)) {
      paragraph.classList.add('history-text-visible');
    }
  });
});

function IsVisible(element){
  const view = element.getBoundingClientRect(); //vraca objekt sa top, right, bottom, left
  return (
    view.bottom > 0 && view.top < 
      (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  ); // ako je unutar viewporta -> true
}



