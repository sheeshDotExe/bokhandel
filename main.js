import bookContent from "./books.json" assert { type: "json" };

const cart = [];
let homeButton;
let cartButton;

let resetFunction = () => {};
let showBook = (book) => {};

function setCartTitle() {
  if (cart.length) {
    cartButton.innerHTML = `Handlevogn ${
      cart.length
    } bøker ${calculateSum()}kr Total`;
  } else {
    cartButton.innerHTML = "Handlevogn";
  }
}

function calculateSum() {
  let sum = 0;
  for (const book of cart) {
    sum += book.price;
  }
  return sum;
}

function addBookToCart(book) {
  cart.push(book);
  setCartTitle();
}

function createBook(book, addInfo) {
  const element = document.createElement("div");
  const title = document.createElement("h1");
  const cover = document.createElement("img");

  const footer = document.createElement("footer");
  const author = document.createElement("p");
  const price = document.createElement("p");
  const addToCart = document.createElement("button");

  const infoContainer = document.createElement("div");
  if (addInfo) {
    infoContainer.innerHTML = book.info;
  }

  title.innerHTML = book.name;
  author.innerHTML = book.author;

  cover.src = book.img;
  if (!addInfo) {
    cover.addEventListener("click", () => {
      showBook(book);
    });
  }

  price.innerHTML = `${book.price}kr`;

  addToCart.innerHTML = "Add to cart";
  addToCart.addEventListener("click", () => {
    addBookToCart(book);
  });

  footer.className = "book-footer";
  footer.appendChild(author);
  footer.appendChild(price);
  footer.appendChild(addToCart);

  element.className = "book";
  element.appendChild(title);
  element.appendChild(cover);
  element.appendChild(infoContainer);
  element.appendChild(footer);

  return element;
}

function createCart() {
  const element = document.createElement("div");

  const sum = document.createElement("p");
  sum.innerHTML = `The total of cost of your cart is ${calculateSum()}`;

  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Fjern alle bøker";
  resetButton.addEventListener("click", resetFunction);

  element.appendChild(sum);
  element.appendChild(resetButton);

  return element;
}

class Display {
  constructor() {}

  getDomElements() {
    this.booksContainer = document.getElementById("books-container");
    this.bookInfoContainer = document.getElementById("book-information");
    this.cart = document.getElementById("cart");
  }

  clearElements() {
    this.booksContainer.innerHTML = "";
    this.bookInfoContainer.innerHTML = "";
    this.cart.innerHTML = "";
  }

  showBooks() {
    this.clearElements();
    for (const book of bookContent) {
      this.booksContainer.appendChild(createBook(book, false));
    }
  }

  showCart() {
    this.clearElements();
    this.cart.appendChild(createCart());
  }

  showBook(book) {
    this.clearElements();
    this.bookInfoContainer.appendChild(createBook(book, true));
  }
}

const display = new Display();

resetFunction = () => {
  cart.splice(0, cart.length);
  setCartTitle();
  display.showCart();
};

showBook = (book) => {
  display.showBook(book);
};

const showBooks = () => {
  display.showBooks();
};

const showCart = () => {
  display.showCart();
};

window.onload = () => {
  homeButton = document.getElementById("home-button");
  cartButton = document.getElementById("cart-button");
  homeButton.addEventListener("click", showBooks);
  cartButton.addEventListener("click", showCart);
  display.getDomElements();
  display.showBooks();
};
