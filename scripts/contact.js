jQuery(document).ready(function() {
  jQuery("#contact-form").submit(function(e) {

    var form = jQuery(this);
  
    // Provjerava jeli je checkbox označen i postavlja vrijednost
    var receiveNewsletter = jQuery("#receiveNewsletter").prop("checked") ? "true" : "false";
    
    // Sakupljanje svih podataka sa forme i dodavanje ReceiveNewsletter
    var formData = form.serializeArray(); // Koristimo serializeArray da dobijemo podatke u objektima
    formData.push({ name: "ReceiveNewsletter", value: receiveNewsletter }); // Dodajemo checkbox vrijednost

   

    var actionUrl = form.attr('action'); // Uzimamo URL na koji šaljemo podatke

    jQuery.ajax({
        type: "POST",
        url: actionUrl,
        data: formData, // Šaljemo podatke
        success: function(data) {
          console.log('Uspjeh');
          console.log(data);
        },
        error: function(data) {
          console.log('Greška');
          console.log(data);
        }
    });
    
  });
});




