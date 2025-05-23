document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch('https://www.fulek.com/data/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Odgovor prijave:", data);

      if (!data.isSuccess || !data.data || !data.data.token) {
        alert("Neispravni podaci. Pokušajte ponovno.");
        return;
      }

      alert("Uspješna prijava!");
      localStorage.setItem("token", data.data.token); // token je u data.data.token
      window.location.href = "pocetna_sa_prijavon.html";
    })
    .catch(err => {
      console.error("Greška:", err);
      alert("Došlo je do pogreške pri prijavi.");
    });
});

localStorage.setItem("token", data.data.token);
localStorage.setItem("email", username);
