import { showBook } from "./main.js";
import { addBookToCart } from "./cart.js";

export function createCategory(name) {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";

  const line = document.createElement("hr");
  const text = document.createElement("h2");
  text.innerHTML = name;

  categoryDiv.appendChild(line);
  categoryDiv.appendChild(text);
  categoryDiv.appendChild(line);

  return categoryDiv;
}

export const createBook = (book, addInfo) => {
  const element = document.createElement("div");
  const title = document.createElement("h1");
  const cover = document.createElement("img");

  const footer = document.createElement("footer");
  const author = document.createElement("p");
  const price = document.createElement("p");
  const addToCart = document.createElement("button");

  const infoContainer = document.createElement("div");
  infoContainer.className = "book-info";
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

  price.innerHTML = `${book.price} kr`;

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
};
