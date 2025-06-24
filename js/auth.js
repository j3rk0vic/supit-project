window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email"); // spremimo pri loginu

  const nav = document.querySelector(".nav-left ul");

  // Makni "Prijavi se" ako postoji
  const prijavaLink = nav.querySelector("a[href='prijava.html']");
  if (prijavaLink) prijavaLink.parentElement.remove();

  if (token) {
    // Dodaj Nastavni plan
    const nastavni = document.createElement("li");
    nastavni.innerHTML = `<a href="nastavni-plan.html"><i class="fas fa-info-circle" style="color: orange;"></i> Nastavni plan</a>`;
    nav.insertBefore(nastavni, nav.children[4] || null); // ubaci prije Kontakta

    // ovi dio di mi je button za odjavu + korisnik (nisan jos rjesija da bude mail od korisnika tu)
    // rjesen mail od korisnika :)
    const odjava = document.createElement("li");
    odjava.innerHTML = `<a href="#" id="logout"><i class="fas fa-sign-out-alt"></i> Odjava (${email || "Korisnik"})</a>`;
    nav.appendChild(odjava);

    // handleanje odjave
    odjava.addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      window.location.href = "index.html";
    });
  } else {
    
    // vrati mi prijavu ako nije prijavljen: 
    const login = document.createElement("li");
    login.innerHTML = `<a href="prijava.html"><i class="fas fa-user"></i> Prijavi se</a>`;
    nav.prepend(login);
  }
});
