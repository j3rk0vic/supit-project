// preusmjeri ako nije prijavljen
const token = localStorage.getItem("token");
if (!token) {
  alert("Niste prijavljeni.");
  window.location.href = "prijava.html";
}


const input = document.getElementById('subject-input');
const list = document.getElementById('autocomplete-list');
const tableBody = document.querySelector('#subjects-table tbody');

const totals = {
  ects: 0,
  sati: 0,
  predavanja: 0,
  vjezbe: 0
};

let allSubjects = [];

const updateTotals = () => {
  document.getElementById('total-ects').textContent = totals.ects;
  document.getElementById('total-sati').textContent = totals.sati;
  document.getElementById('total-predavanja').textContent = totals.predavanja;
  document.getElementById('total-vjezbe').textContent = totals.vjezbe;
};

const addSubjectToTable = subject => {
  const existingRows = [...tableBody.querySelectorAll("tr")];
  if (existingRows.some(row => row.children[0].textContent === subject.name)) {
    return; // već dodan
  }

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${subject.kolegij}</td>
    <td>${subject.ects}</td>
    <td>${subject.sati}</td>
    <td>${subject.predavanja}</td>
    <td>${subject.vjezbe}</td>
    <td>${subject.tip}</td>
    <td><button class="btn btn-danger btn-sm">Delete</button></td>
  `;

  tr.querySelector('button').addEventListener('click', () => {
    tr.remove();
    totals.ects -= subject.ects;
    // totals.sati -= subject.predavanja + subject.vjezbe;
    totals.sati -= subject.sati;
    totals.predavanja -= subject.predavanja;
    totals.vjezbe -= subject.vjezbe;
    updateTotals();
  });

  tableBody.appendChild(tr);

  totals.ects += subject.ects;
  // totals.sati += subject.predavanja + subject.vjezbe;
  totals.sati += subject.sati;
  totals.predavanja += subject.predavanja;
  totals.vjezbe += subject.vjezbe;
  updateTotals();
};

input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  if (query.length < 2) {
    list.innerHTML = '';
    return;
  }

  const matches = allSubjects.filter(s =>
  typeof s.name === 'string' && s.name.toLowerCase().includes(query));

  list.innerHTML = '';

  matches.forEach(subject => {
    const li = document.createElement('li');
    li.textContent = subject.name;
    li.dataset.id = subject.id;
    list.appendChild(li);
  });
});

list.addEventListener('click', function (e) {
  if (e.target.tagName !== 'LI') return;
  const id = e.target.dataset.id;

  fetch(`https://www.fulek.com/data/api/supit/get-curriculum/${id}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(subject => {
    addSubjectToTable(subject.data);
    input.value = '';
    list.innerHTML = '';
  })
  .catch(err => console.error("Greška kod dohvaćanja detalja predmeta:", err));
});

fetch('https://www.fulek.com/data/api/supit/curriculum-list/hr', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    // samo da vidin sta vraca:
    console.log("Dovaceni predmeti: ", data); // vaca dobro 

    // mapiranje jer su mi imena kriva bila:
    allSubjects = data.data
    .filter(s => s && s.kolegij)
    .map(s => ({
      id: s.id,
      name: s.kolegij
    }));
  })
  .catch(err => console.error("Greška kod dohvaćanja liste predmeta:", err));