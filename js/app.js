// Class Book
class Book {
    constructor(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
    }
}

// Class UI
class UI {
    addBookToList(book) {
        // Get book list
        const list = document.querySelector('.book-list tbody');
        // Create markup
        const tr = `
          <tr class="book-string">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.id}</td>
            <td>
                <button class="waves-effect waves-light btn del-btn red right" >Delete <i class="material-icons right">close</i></button>
            </td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', tr);
    }

    // ADD ALERT
    showAlert(message, type) {

        // Create markup
        const alert = `
          <div class="card alert ${type === 'error' ? 'red' : 'green'}">
            <div class="card-content white-text">
              <span class="card-title">${type === 'error' ? 'Error' : 'Success'}</span>
              <p>${message}</p>
            </div>
          </div>
        `;

        // Get title
        const cardTitle = document.querySelector('.card-title');
        // Get button
        const btn = document.querySelector('form button');
        // Disabled btn
        btn.disabled = true;

        // Insert alert
        cardTitle.insertAdjacentHTML('afterend', alert);

        setTimeout(function () {
            document.querySelector('.alert').remove();
            btn.disabled = false;
        }, 3000);
    }


    // REMOVE ALERT
    showRemoveAlert(message, type) {
        const alert = `
          <div class="card alert ${type === 'error' ? 'red' : 'green'}">
            <div class="card-content white-text">
              <span class="card-title">${type === 'error' ? 'Error' : 'Success'}</span>
              <p>${message}</p>
            </div>
          </div>
        `;

        // Get title
        const cardTitle = document.querySelector('.card-title');
        // Get button
        const btn = document.querySelector('form button');
        // Disabled btn
        btn.disabled = true;

        // Insert alert
        cardTitle.insertAdjacentHTML('afterend', alert);

        setTimeout(function () {
            document.querySelector('.alert').remove();
            btn.disabled = false;
        }, 3000);
    }
}

// Class Local Storage
class Store {

    // 1. get the book from local storage
    // 2. convert it from JSON to array 
    // 3. add a new book to array
    // 4. convert from array to JSON
    // 5. save it on local storage

    getBooks() {
        let books;
        if (!localStorage.getItem('books')) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); // convert from JSON to array 
        }

        return books;
    }

    addBook(book) {
        // Get books from localstorage
        const books = this.getBooks();
        // Add new book
        books.unshift(book);
        // Save localstorage
        localStorage.setItem('books', JSON.stringify(books));        
    }
    // HW remove book from localStorage
    removeBook(id) {
        const books = this.getBooks();
        books.splice(id, 1);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event DOMContentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
    // Create an instance of the class Store
    const store = new Store();
    // Create ui
    const ui = new UI();
    // Get all the book from local storage
    const books = store.getBooks();
    // Add the book from storage to HTML
    books.forEach(book => ui.addBookToList(book));
    removeBook();
});



// Event submit
document.forms['addBookForm'].addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const title = this.elements['book_title'].value,
        author = this.elements['book_author'].value,
        id = this.elements['book_id'].value;

    // Create book
    const book = new Book(title, author, id);
    // Create ui
    const ui = new UI();
    // Get Store
    const store = new Store();

    // Validate
    if (title === '' || author === '' || id === '') {
        // Show error
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to ui
        ui.addBookToList(book);
        // remove book from ui
        removeBook();
        document.getElementById('book_title').value = "";
        document.getElementById('book_author').value = "";
        document.getElementById('book_id').value = "";

        // Show success message
        ui.showAlert('Book added!', 'success');
        // Add book to localstorage
        store.addBook(book);
    }
    // e.target.reset();
});
// HW remove book from DOM
removeBook = function() {
    let buttonDel = document.getElementsByClassName('del-btn');
    let booksMarkup = document.getElementsByClassName('book-string');
    for (let i = 0; i < booksMarkup.length; i++) {
        buttonDel[i].addEventListener('click', function (e) {
            let ui = new UI();
            const store = new Store();
            if (confirm('Are you sure?')) {
                booksMarkup[i].style.display = 'none';
                ui.showRemoveAlert('Book Is Deleted Successfully ', 'success');
                store.removeBook(i);
            } else {
                ui.showRemoveAlert('Book Are Not Deleted', 'error');
            }
        })
    }
};
