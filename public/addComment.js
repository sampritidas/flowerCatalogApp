const generateTableRow = (name, comment) => {
  const date = (new Date() + '').slice(0, 15);
  const time = (new Date() + '').slice(16, 21);
  return `
  <td>${date}</td>
  <td>${time}</td>
  <td>${name}</td>
  <td>${comment}</td>`;
}

const resetForm = () => {
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';
};

const displayNewComment = (formdata) => {
  const tableElement = document.getElementById('table');
  const name = formdata.get('name');
  const comment = formdata.get('comment');

  const trElement = document.createElement('tr');
  const tableData = generateTableRow(name, comment);

  trElement.innerHTML = tableData;
  tableElement.append(trElement);
  resetForm();
};

const submitForm = () => {
  const form = document.getElementsByTagName('form')[0];
  const formdata = new FormData(form);

  const body = new URLSearchParams(formdata).toString();
  const xhr = new XMLHttpRequest();

  // if (xhr.status === 200) {
  xhr.open('POST', '/addcomment');
  xhr.send(body);
  xhr.onload = () => displayNewComment(formdata);
  return;
  // }
  // alert('Request failed. on status ' + xhr.status);
};

const addComment = () => {
  const submitElement = document.getElementById('submit-button');
  submitElement.addEventListener('click', submitForm);
};

window.onload = addComment;
