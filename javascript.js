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
        // Show the form
        form.style.display = "block";
        form.style.maxWidth = "400px"; // Set a maximum width for the form
        form.style.backgroundColor = "#b9b3b3"; // Set background color
        form.style.padding = "20px"; // Set padding
        form.style.textAlign = "center"; // Center-align text
        form.style.height = "400px";
        form.style.position = "absolute";
        form.style.top = "50%"; // Center vertically
        form.style.left = "50%"; // Center horizontally
        form.style.transform = "translate(-50%, -50%)"; // Center the form


        // Style input fields
        const inputs = form.querySelectorAll("input[type='text'], input[type='number']");
        inputs.forEach(input => {
            input.style.width = "90%"; // Reduce input field width to prevent overflow
            input.style.padding = "10px"; // Input field padding
            input.style.marginBottom = "10px"; // Spacing between input fields
            input.style.border = "1px solid #ccc"; // Add a border to input fields
            input.style.borderRadius = "5px"; // Add some border radius for rounded corners
            input.style.fontSize = "14px"; // Set the font size for input fields
        });

        // Style labels
        const labels = form.querySelectorAll("label");
        labels.forEach(label => {
            label.style.display = "block"; // Make labels display as blocks (one below the other)
            label.style.fontWeight = "bold"; // Make labels bold for emphasis
        });

        // Style the submit button
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.style.backgroundColor = "#3498db"; // Button background color
        submitButton.style.color = "white"; // Button text color
        submitButton.style.padding = "8px 16px"; // Button padding
        submitButton.style.border = "none"; // Remove button border
        submitButton.style.borderRadius = "5px"; // Add some border radius for rounded corners
        submitButton.style.fontSize = "16px"; // Set the font size for the button
    } else {
        // Hide the form
        form.style.display = "none";
    }
}
document.getElementById("showFormButton").addEventListener("click", toggleForm);

document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addBookToLibrary();
    toggleForm();
});

function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("book");
    card.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read}</p>
    `;
    return card;
}
function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    // Create a new book first
    const newBook = new book(title, author, pages, read);

    // Create a card for the new book
    const card = createBookCard(newBook);

    // Append the card to the library container
    const libraryContainer = document.querySelector(".library");
    libraryContainer.appendChild(card);

    // Push the new book to the library array
    myLibrary.push(newBook);

    // Clear the form input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = "";

    console.log(myLibrary);
}