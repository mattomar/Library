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
        form.style.opacity = "0";
        form.style.transition = "opacity 0.3s ease-in-out";
        form.style.width = "30%";
        form.style.backgroundColor = "rgba(185, 179, 179, 0.8)";
        form.style.padding = "20px";
        form.style.textAlign = "center";
        form.style.height = "400px";
        form.style.position = "absolute";
        form.style.top = "50%";
        form.style.left = "50%";
        form.style.transform = "translate(-50%, -50%)";

        const inputs = form.querySelectorAll("input[type='text'], input[type='number'], select");
        inputs.forEach(input => {
            input.style.width = "90%";
            input.style.padding = "10px";
            input.style.marginBottom = "10px";
            input.style.border = "1px solid #ccc";
            input.style.borderRadius = "5px";
            input.style.fontSize = "14px";
        });

        const labels = form.querySelectorAll("label");
        labels.forEach(label => {
            label.style.display = "block";
            label.style.fontWeight = "bold";
        });

        const submitButton = form.querySelector("button[type='submit']");
        submitButton.style.backgroundColor = "#3498db";
        submitButton.style.color = "white";
        submitButton.style.padding = "8px 16px";
        submitButton.style.border = "none";
        submitButton.style.borderRadius = "5px";
        submitButton.style.fontSize = "16px";
        submitButton.style.cursor = "pointer";
        submitButton.style.transition = "background-color 0.3s ease";
        submitButton.addEventListener("mouseenter", () => {
            submitButton.style.backgroundColor = "#2980b9";
        });
        submitButton.addEventListener("mouseleave", () => {
            submitButton.style.backgroundColor = "#3498db";
        });

        setTimeout(() => {
            form.style.opacity = "1";
        }, 10);
    } else {
        form.style.opacity = "0";
        setTimeout(() => {
            form.style.display = "none";
        }, 300);
    }
}


document.getElementById("showFormButton").addEventListener("click", toggleForm);

document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
    toggleForm();
});




function createBookCard(book, index) {
    const card = document.createElement("div");
    card.classList.add("book");
    card.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: <span id="read-status-${index}">${book.read}</span></p>
        <div class="button-container">
        <button class="toggle-read-button" data-index="${index}"></button>
        <button class="remove-button" data-index="${index}"></button>
        </div>
    `;

    const toggleReadButton = card.querySelector(".toggle-read-button");
    toggleReadButton.addEventListener("click", function () {
        toggleReadStatus(index);
    });

    card.style.margin = "20px";

    const removeButton = card.querySelector(".remove-button");
    removeButton.addEventListener("click", function () {
        removeBook(index);
    });

    return card;
}





function toggleReadStatus(index) {
    const readStatusElement = document.getElementById(`read-status-${index}`);
    const currentStatus = readStatusElement.innerText;

    const newStatus = currentStatus === "Yes" ? "No" : "Yes";
    readStatusElement.innerText = newStatus;

    myLibrary[index].read = newStatus;
}




function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    const newBook = new book(title, author, pages, read);

    const card = createBookCard(newBook, myLibrary.length);

    const libraryContainer = document.querySelector(".library");
    libraryContainer.appendChild(card);

    myLibrary.push(newBook);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = "";
}


function removeBook(index) {
    myLibrary.splice(index, 1);

    const libraryContainer = document.querySelector(".library");
    const removedBook = libraryContainer.children[index];
    libraryContainer.removeChild(removedBook);

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button, i) => {
        const dataIndex = parseInt(button.getAttribute("data-index"));
        if (dataIndex > index) {
            button.setAttribute("data-index", dataIndex - 1);
        }
    });
}
