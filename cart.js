import { showCart, resetFunction, setCartTitle } from "./main.js";

export const shoppingCart = new Map();

export function addBookToCart(book) {
  const quantity = shoppingCart.get(book) ?? 0;
  shoppingCart.set(book, quantity + 1);
  setCartTitle();
}

export function subtractBookFromCart(book) {
  const quantity = shoppingCart.get(book) ?? 0;
  shoppingCart.set(book, Math.max(0, quantity - 1));
  setCartTitle();
}

export function numberOfBooks() {
  let sum = 0;
  for (const quantity of shoppingCart.values()) {
    sum += quantity;
  }
  return sum;
}

export function calculateSum() {
  let sum = 0;
  for (const [book, quantity] of shoppingCart.entries()) {
    sum += book.price * quantity;
  }
  return sum;
}

export function createCart() {
  const element = document.createElement("div");

  const sum = document.createElement("p");
  sum.innerHTML = `Total pris ${calculateSum()} kr`;

  for (const [book, quantity] of shoppingCart.entries()) {
    const cartContainer = document.createElement("div");
    cartContainer.className = "cartContainer";

    const bookContainer = document.createElement("div");
    bookContainer.className = "cartBookContainer";
    const cover = document.createElement("img");
    cover.className = "cartCoverImage";
    cover.src = book.img;
    const nameText = document.createElement("p");
    nameText.innerHTML = book.name;
    const priceText = document.createElement("p");
    priceText.innerHTML = book.price * quantity + " kr";
    const quantityText = document.createElement("p");
    quantityText.innerHTML = quantity;

    bookContainer.appendChild(cover);
    bookContainer.appendChild(nameText);
    bookContainer.appendChild(priceText);
    bookContainer.appendChild(quantityText);

    cartContainer.appendChild(bookContainer);

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "cartOptionsContainer";

    const addButton = document.createElement("button");
    addButton.innerHTML = ">";
    addButton.addEventListener("click", () => {
      addBookToCart(book);
      showCart();
    });

    const subtractButton = document.createElement("button");
    subtractButton.innerHTML = "<";
    subtractButton.addEventListener("click", () => {
      subtractBookFromCart(book);
      showCart();
    });

    optionsContainer.appendChild(subtractButton);
    optionsContainer.appendChild(addButton);

    cartContainer.appendChild(optionsContainer);

    element.appendChild(cartContainer);
  }

  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Fjern alle bøker";
  resetButton.addEventListener("click", resetFunction);

  element.appendChild(sum);
  element.appendChild(resetButton);

  return element;
}
