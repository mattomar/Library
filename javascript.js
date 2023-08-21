const myLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

function toggleForm() {
    const form = document.getElementById("bookForm");
    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

document.getElementById("showFormButton").addEventListener("click", toggleForm);

document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addBookToLibrary();
    toggleForm();
});

function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    const newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = "";

    console.log(myLibrary);
}