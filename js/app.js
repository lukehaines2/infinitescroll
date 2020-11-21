const quotesEl = document.querySelector(".quotes");
const loaderEl = document.querySelector(".loader");

const getQuotes = async (page, limit) => {
  const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
  const response = await fetch(API_URL);
  console.log('L7 === response', response);
  //  Handle 404
  if (!response.status === 200) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
}

const myQuotes = getQuotes(1, 10);


const renderQuotes = (quotes) => {
  quotes.forEach(quote => {
    const quoteEl = document.createElement("blockquote");
    quoteEl.classList.add("quote");

    quoteEl.innerHTML = `
      <span>${quote.id})</span>
      ${quote.quote}
      <footer>${quote.author}</footer>
    `;

    quotes.appendChild(quoteEl);
  });
}
