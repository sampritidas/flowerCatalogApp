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

  xhr.open('POST', '/addcomment');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(body);
  xhr.onload = () => displayNewComment(formdata);
  return;
};

const addComment = () => {
  const submitElement = document.getElementById('submit-button');
  submitElement.addEventListener('click', submitForm);
};

window.onload = addComment;
