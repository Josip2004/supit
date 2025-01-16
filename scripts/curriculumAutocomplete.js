jQuery(document).ready(function () {
  const token = sessionStorage.getItem('token');
  // Postavi autocomplete
  jQuery(".subject-input").autocomplete({
    source: (request, response) => {
      jQuery.ajax({
        url: "https://www.fulek.com/data/api/supit/curriculum-list/hr",
        data: { term: request.term }, // Term je ono što korisnik upisuje
        headers: {
          Authorization: `Bearer ${token}`,
        },
        success: (data) => {
          console.log("Dohvaćeni podaci:", data);

          if (data && data.data && Array.isArray(data.data)) {
            const filteredKolegiji = data.data.filter(item => {
              return item.kolegij.toLowerCase().includes(request.term.toLowerCase());
            });
            
            // Vraćamo samo nazive kolegija
            const kolegiji = filteredKolegiji.map(item => item.kolegij);
            
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
      const kolegijSelected = ui.item.value;

      jQuery(".subject-input").val(kolegijSelected);
    },
  });
});
