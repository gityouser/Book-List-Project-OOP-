class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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

  showAlert(message, className) {
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

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

//Local storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI;
      ui.addBookToList(book);
    })


  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if ( isbn === book.isbn ) {
        books.splice(index, 1);
      }
    })
      localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event listeners

//DOM LOAD
document.addEventListener('DOMContentLoaded', Store.displayBooks);
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
    Store.addBook(book);

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
    //Show message
    ui.showAlert('Book Removed!', 'success')
    //Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  }
})
