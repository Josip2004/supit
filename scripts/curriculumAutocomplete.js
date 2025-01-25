jQuery(document).ready(function () {
  const token = sessionStorage.getItem('token');
  let count = 0; // da provjerim postoji li container-header
  //za Ukupno sekciju
  let sumEcts = 0;
  let sumSati = 0;
  let sumPredavanja = 0;
  let sumVjezbe = 0;
  jQuery('.container-header').addClass('no-border');

  jQuery(".subject-input").autocomplete({
    source: (request, response) => {
      jQuery.ajax({
        url: "https://www.fulek.com/data/api/supit/curriculum-list/hr",
        data: { term: request.term }, // Term je ono što korisnik upisuje
        headers: {
          Authorization: `Bearer ${token}`,//ima vazeci token
        },
        success: (data) => {
          console.log("Dohvaćeni podaci:", data);

         if (Array.isArray(data.data)) { 
            // Kreiraj listu s nazivima kolegija za prikaz, a ID za interno korištenje
            const kolegiji = data.data.filter(item => item.kolegij.toLowerCase().includes(request.term.toLowerCase()))  // Dodatno filtriranje na temelju unosa
              .map(item => ({
                label: item.kolegij, // Naziv kolegija 
                value: item.id       // ID kolegija (koristi se za dohvat podataka)
              }));

            response(kolegiji); // Popuni autocomplete
          } else {
            console.error("Krivi format:", data);
          }
        },
        error: (xhr, status, error) => {
          console.error("Greska:", error);
        },
      });
    },
    focus: (e, ui) => {
      e.preventDefault();
    },
    select: (e, ui) => {
      e.preventDefault();
      const kolegijSelected = ui.item.label;
      const kolegijID = ui.item.value;

      jQuery(".subject-input").val(kolegijSelected);

      jQuery.ajax({
        url: `https://www.fulek.com/data/api/supit/get-curriculum/${kolegijID}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        success: (data) => {   

          if(jQuery('.container-header').length === 0 || count === 0){
            const containerHeader = `
          <div class="container-info subject-info">Kolegij</div>
          <div class="container-info">ECTS</div>
          <div class="container-info">Sati</div>
          <div class="container-info">Predavanja</div>
          <div class="container-info">Vježbe</div>
          <div class="container-info">Tip</div>
          `;

          jQuery('.container-header').removeClass('no-border');
          jQuery('.container-header').append(containerHeader); 
          }

          
          

          if(data.data.kolegij){
            const oneRow = `
            <div class="row">
              <div class="row-cell row-cell-subject">${data.data.kolegij}</div>
              <div class="row-cell">${data.data.ects}</div>
              <div class="row-cell">${data.data.sati}</div>
              <div class="row-cell">${data.data.predavanja}</div> 
              <div class="row-cell">${data.data.vjezbe}</div>
              <div class="row-cell">
                <div class="row-with-button">${data.data.tip}
                <button class="remove-button">Delete</button ></div>
              </div>            
            </div>
            `
            jQuery('#subjects-row').append(oneRow);


            sumEcts += parseFloat(data.data.ects);
            sumSati += parseFloat(data.data.sati);
            sumPredavanja += parseFloat(data.data.predavanja);
            sumVjezbe += parseFloat(data.data.vjezbe);
            updateTotalRow();
            count++;
          }
          else{
            console.log('error');
          }
        },
      })
    },
  });

  jQuery('#subjects-row').on('click', '.remove-button', function(){ //vezemo uz div subject-row
    const row = jQuery(this).closest('.row'); //najbliz parent row

    const ects = parseFloat(row.find('.row-cell').eq(1).text());
    const sati = parseFloat(row.find('.row-cell').eq(2).text());
    const predavanja = parseFloat(row.find('.row-cell').eq(3).text());
    const vjezbe = parseFloat(row.find('.row-cell').eq(4).text());
         
     sumEcts -= ects;
     sumSati -= sati;
     sumPredavanja -= predavanja;
     sumVjezbe -= vjezbe;

     row.remove();

     if(jQuery('#subjects-row .row').length === 0){ //provjerava postoji li koji redak jos
       count = 0;
       jQuery('.container-header').empty();
       jQuery('.container-header').addClass('no-border');
       jQuery('.total-row').remove();
     }
     updateTotalRow();
     
  });

  function updateTotalRow() {
    // Ako redak za ukupno već postoji, ažuriraj ga
    let totalRow = jQuery('.total-row');
    if (totalRow.length) {
      totalRow.find('.row-cell').eq(1).text(sumEcts);
      totalRow.find('.row-cell').eq(2).text(sumSati);
      totalRow.find('.row-cell').eq(3).text(sumPredavanja);
      totalRow.find('.row-cell').eq(4).text(sumVjezbe);
    } else {
      // Ako redak za ukupno ne postoji, dodaj ga
      const ukupnoRow = `
        <div class="total-row">
          <div class="row-cell row-cell-sum-label">Ukupno:</div>
          <div class="row-cell">${sumEcts}</div>
          <div class="row-cell">${sumSati}</div>
          <div class="row-cell">${sumPredavanja}</div> 
          <div class="row-cell">${sumVjezbe}</div>
          <div class="row-cell"></div> 
        </div>
      `;
      jQuery('#subjects-row').append(ukupnoRow); // dodaje ukupno
    }
    //uvijek mora biti na dnu
    jQuery('#subjects-row .total-row').appendTo('#subjects-row');
  }

});
