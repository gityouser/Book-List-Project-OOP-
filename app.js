//
// //Book constructor
// function Book(title, author, isbn) {
//   this.title = title;
//   this.author = author;
//   this.isbn = isbn;
// }
// //UI constructor
// function UI() {}
//
// UI.prototype.addBookToList = function(book) {
//   const list = document.querySelector('#book-list');
//   // Create a tr element
//   const row = document.createElement('tr');
//   // Insert columns
//   row.innerHTML = `
//     <td>${book.title}</td>
//     <td>${book.author}</td>
//     <td>${book.isbn}</td>
//     <td> <a href="#" class="delete">X</a> </td>
//   `;
//
//   list.appendChild(row);
// }
//
// //Show alert
// UI.prototype.showAlert = function(message, className) {
//   //Create div
//   const div = document.createElement('div');
//   //Add classes
//   div.className = 'alert ${className}';
//   //Add textNode and text inside
//   div.append(document.createTextNode(message));
//   //Get parent
//   const container = document.querySelector('continer');
//   //Get form
//   const form = document.querySelector('#book-form');
//   //Insert alert
//   container.insertBefore(div, form)
// }
//
//
// //Clear the fields after submit
// UI.prototype.clearFields = function(book) {
//   document.querySelector('#title').value = '';
//   document.querySelector('#author').value = '';
//   document.querySelector('#isbn').value = '';
// }
//
// //Event listeners
// document.querySelector('#book-form').addEventListener('submit', function (e) {
//   //Get form values
//   const title = document.querySelector('#title').value,
//         author = document.querySelector('#author').value,
//         isbn = document.querySelector('#isbn').value;
//
//   //Instantiate book
//   const book = new Book(title, author, isbn);
//
//   //Instantiate the UI
//   const ui = new UI();
//
//   // Validate
//   if(title === '' || author === '' || isbn || '') {
//     // Error alert
//     UI.showAlert('Please fill in all fields', 'error');
//   } else {
//     //Add book to list
//     ui.addBookToList(book);
//
//     //Clear fields after submit
//     ui.clearFields();
//   }
//
//   e.preventDefault();
// })

function CinevaAreMere(name, fruit) {
  this.name = name;
  this.fruit = fruit;
}

const ana = new CinevaAreMere('Ana', 'Mere');

function UI() {}

const ui = new UI();

UI.prototype.CineAreMere = function(ana) {
  console.log(`${ana.name} are ${ana.fruit}.`);
}

ui.CineAreMere(ana);
