//Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

//add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById("book-list");

  //Create tr element
  const row = document.createElement("tr");
  //insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="delete" href=""> X <a></td>
  `;

  list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(msg, className){
  //Create div
  const div = document.createElement("div");
  //add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  //getParent
  const constainer = document.querySelector(".container");
  //get form
  const form = document.querySelector("#book-form");

  //insert alert
  constainer.insertBefore(div, form);

  //timeout after 3 second
  setTimeout(function(){
    document.querySelector(".alert").remove();
  }, 3000);
}

//delete book
UI.prototype.deleteBook = function(target){
  if(target.className === "delete"){
    target.parentElement.parentElement.remove();
  }
}

//Clear Form
UI.prototype.clearForm = function(){
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}

//Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function(e){
  //Get form values
  const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //Validate form is filled
  if(title === "" || author === "" || isbn === ""){
    //Error alert
    ui.showAlert("Please fill in all fields", "error");
  }else{
    //add book to list
    ui.addBookToList(book);

    //Show success
    ui.showAlert("Book Added!", "success");

    //clear form
    ui.clearForm();
  }

  e.preventDefault();
});

//Event Listner for Delete
document.getElementById("book-list").addEventListener("click", function(e){
  //instantiate UI
  const ui = new UI();
  
  if(e.target.className === "delete"){
    ui.deleteBook(e.target);
    ui.showAlert("Book removed!", "success");
  }

  e.preventDefault();
});