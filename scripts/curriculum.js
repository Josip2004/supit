const login = async (username, password) => {
  try {
    // Pošaljemo POST zahtjev za prijavu
    const response = await fetch("https://www.fulek.com/data/api/user/login", {
      method: "POST", // Metoda je POST jer šaljemo podatke za prijavu
      headers: {
        "Content-Type": "application/json", // Specifikacija formata podataka
      },
      body: JSON.stringify({ username, password }), // Poslali smo korisničke podatke
    });

    // Ako prijava nije uspješna (status nije 200 OK)
    if (!response.ok) {
      throw new Error(`Greška pri prijavi: ${response.status}`);
    }

    // Pretvori odgovor u JSON format
    const data = await response.json();
    
    // Provjeri postoji li token u odgovoru pod data.token
    if (data && data.data && data.data.token) {
      // Pohrani token u sessionStorage ili localStorage
      sessionStorage.setItem("token", data.data.token);
      return data.data.token; // Vraća JWT token
    } else {
      throw new Error("Token nije pronađen u odgovoru.");
    }
  } catch (error) {
    console.error("Došlo je do greške: ", error);
  }
};



const getAllKolegij = async () => {
  try {
    const token = sessionStorage.getItem("token"); // Uzmi token iz sessionStorage

    // Ako nema tokena, preusmjeri korisnika na stranicu za prijavu
    if (!token) {
      console.log('Nema tokena1')
    }

    const response = await fetch(
      "https://www.fulek.com/data/api/supit/curriculum-list/hr",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Postavljanje JWT tokena u header
          "Content-Type": "application/json",
        },
      }
    );


    const dataJson = await response.json();
    console.log(dataJson); // Ispisuje cijeli JSON odgovor

    return dataJson.data; // Pretpostavljamo da je 'data' niz kolegija
  } catch (error) {
    console.error("Došlo je do pogreške:", error);
  }
};

function autocomplete(input, array) {
  $(input).on("input", function () {
    let val = this.value;
    CloseList();
    if (!val) return false;
    let itemsList = document.createElement("DIV");
    itemsList.setAttribute("id", this.id + "-list");
    itemsList.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(itemsList);
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].kolegij.substr(0, val.length).toUpperCase() ==
        val.toUpperCase()
      ) {
        let item = document.createElement("DIV");
        item.innerHTML =
          "<strong>" + array[i].kolegij.substr(0, val.length) + "</strong>";
        item.innerHTML += array[i].kolegij.substr(val.length);
        item.innerHTML +=
          "<input type='hidden' value='" + array[i].kolegij + "'>";
        $(item).on("click", function (e) {
          input.value = this.getElementsByTagName("input")[0].value;
          CloseList();
        });
        itemsList.appendChild(item);
      }
    }
  })};

login("proba@2", "123");
console.log(sessionStorage.getItem('token'))
getAllKolegij();
