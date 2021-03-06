
//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.querySelector('#book-list');
  // Create a tr element
  const row = document.createElement('tr');
  // Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a href="#" class="delete">X</a> </td>
  `;

  list.appendChild(row);
}

//Get book for LS
UI.prototype.getBook = function() {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}


//Display books from LS
UI.prototype.displayBooks = function() {
  const ui = new UI();
  const books = ui.getBook();
  books.forEach(function(book) {
    ui.addBookToList((book));
  })
}

//Add book to LS
UI.prototype.addBookLS = function(book) {
  let ui = new UI();
  const books = ui.getBook();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

//Remove book from LS
UI.prototype.removeBookLS = function(isbn) {
  const ui = new UI();
  let books = ui.getBook();
  books.forEach(function(book, index) {
    if(isbn === book.isbn) {
      books.splice(index, 1)
    }
  books = localStorage.setItem('books', JSON.stringify(books));
  })

}

//Show alert
UI.prototype.showAlert = function(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.append(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}


//Clear the fields after submit
UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

//Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Event listeners
document.querySelector('#book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate the UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Add book to LS
    ui.addBookLS(book);

    //Show success
    ui.showAlert('Book Added!', 'success');

    //Clear fields after submit
    ui.clearFields();
  }

  e.preventDefault();
})

document.querySelector('#book-list').addEventListener('click', function(e) {
  if(e.target.className === 'delete') {
    const ui = new UI();
    ui.deleteBook(e.target);

    //Remove book from LS
    ui.removeBookLS(e.target.parentElement.previousElementSibling.textContent)


    //Show message
    ui.showAlert('Book Removed!', 'success')
  }

})

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI;
  ui.displayBooks();
})
