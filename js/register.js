document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value.trim();

  fetch('https://www.fulek.com/data/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      // samo da vidin sta mi ne valja:
      console.log('Odgovor registracije: ', data);
      if (data.isSuccess === false) {
        alert('Registracija nije uspjela. Korisnik možda već postoji.');
        return;
      }

      alert('Uspješna registracija!');
      window.location.href = 'prijava.html';
    })
    .catch(err => {
      console.error('Greška:', err);
      alert('Došlo je do pogreške prilikom registracije.');
    });
});
