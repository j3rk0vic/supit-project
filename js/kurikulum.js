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
    <td>${subject.name}</td>
    <td>${subject.ects}</td>
    <td>${subject.numberOfLectures + subject.numberOfPracticals}</td>
    <td>${subject.numberOfLectures}</td>
    <td>${subject.numberOfPracticals}</td>
    <td>${subject.type}</td>
    <td><button class="btn btn-danger btn-sm">Delete</button></td>
  `;

  tr.querySelector('button').addEventListener('click', () => {
    tr.remove();
    totals.ects -= subject.ects;
    totals.sati -= subject.numberOfLectures + subject.numberOfPracticals;
    totals.predavanja -= subject.numberOfLectures;
    totals.vjezbe -= subject.numberOfPracticals;
    updateTotals();
  });

  tableBody.appendChild(tr);

  totals.ects += subject.ects;
  totals.sati += subject.numberOfLectures + subject.numberOfPracticals;
  totals.predavanja += subject.numberOfLectures;
  totals.vjezbe += subject.numberOfPracticals;
  updateTotals();
};

input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  if (query.length < 2) {
    list.innerHTML = '';
    return;
  }

  const matches = allSubjects.filter(s => s.name.toLowerCase().includes(query));
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

  fetch(`https://www.fulek.com/data/api/supit/get-curriculum/${id}`)
    .then(res => res.json())
    .then(subject => {
      addSubjectToTable(subject.data);
      input.value = '';
      list.innerHTML = '';
    });
});

fetch('https://www.fulek.com/data/api/supit/curriculum-list/hr')
  .then(res => res.json())
  .then(data => allSubjects = data.data);
