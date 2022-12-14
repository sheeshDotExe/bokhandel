import bookContent from "./books.json" assert { type: "json" };
import { createBook, createCategory } from "./books.js";
import {
  createCart,
  shoppingCart,
  numberOfBooks,
  calculateSum,
} from "./cart.js";

let homeButton;
let cartButton;
let searchBar;

export function setCartTitle() {
  if (shoppingCart.size) {
    cartButton.innerHTML = `Handlevogn ${numberOfBooks()} bøker ${calculateSum()}kr Total`;
  } else {
    cartButton.innerHTML = "Handlevogn";
  }
}

const dictCheck = (value, dict) => {
  for (const key in dict) {
    if (value === key) {
      return true;
    }
  }
  return false;
};

const checkBookSearch = (book, searchFilter) => {
  for (const value of [
    book.category.toLowerCase(),
    book.name.toLowerCase(),
    book.author.toLowerCase(),
    book.price.toString().toLowerCase(),
  ]) {
    if (value.includes(searchFilter.toLowerCase())) {
      return true;
    }
  }
  return false;
};

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

  showBooks(searchFilter) {
    this.clearElements();
    const categories = {};
    for (const book of bookContent) {
      if (!dictCheck(book.category, categories)) {
        categories[book.category] = {
          name: createCategory(book.category),
          books: [createBook(book, false)],
          bookInformation: [book],
        };
      } else {
        categories[book.category].books.push(createBook(book, false));
        categories[book.category].bookInformation.push(book);
      }
    }

    for (const categoryIndex in categories) {
      const category = categories[categoryIndex];

      let showCategory = false;
      for (const book of category.bookInformation) {
        if (checkBookSearch(book, searchFilter)) {
          showCategory = true;
          break;
        }
      }

      if (showCategory) {
        this.booksContainer.appendChild(category.name);
      }

      const books = document.createElement("div");
      books.className = "books-container";

      for (let i = 0; i < category.books.length; i++) {
        if (checkBookSearch(category.bookInformation[i], searchFilter))
          books.appendChild(category.books[i]);
      }

      this.booksContainer.appendChild(books);
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

export const resetFunction = () => {
  shoppingCart.clear();
  setCartTitle();
  display.showCart();
};

export const showBook = (book) => {
  display.showBook(book);
};

export const showBooks = (searchFilter) => {
  display.showBooks(searchFilter);
};

export const showCart = () => {
  display.showCart();
};

const search = (event) => {
  showBooks(event.srcElement.value);
};

window.onload = () => {
  homeButton = document.getElementById("home-button");
  cartButton = document.getElementById("cart-button");
  searchBar = document.getElementById("search-bar");
  homeButton.addEventListener("click", () => {
    showBooks("");
  });
  cartButton.addEventListener("click", showCart);
  searchBar.addEventListener("input", search);
  display.getDomElements();
  display.showBooks("");
};
