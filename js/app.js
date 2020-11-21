const quotesEl = document.querySelector(".quotes");
const loaderEl = document.querySelector(".loader");

const getQuotes = async (page, limit) => {
  const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
  const response = await fetch(API_URL);
  //  Handle 404
  if (!response.status === 200) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
}


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


const showLoader = () => {
  loaderEl.classList.add("show");
}


const hideLoader = () => {
  loaderEl.classList.remove("show");
}


let currentPage = 1;
const limit = 10;
let total = 0;

// Eval is it the first call or not?
const hasMoreQuotes = (page, limit, total) => {
  const startIndex = (page - 1) * limit + 1;
  return total === 0 || startIndex < total;
};


// Load quotes
const loadQuotes = async (page, limit) => {

  // Show loader
  showLoader();

  // Timeout hack to ensure loader is displayed for own visual benefit
  setTimeout(async () => {
    try {
      if (hasMoreQuotes(page, limit, total)) {
        // Call API
        const response = await getQuotes(page, limit);
        showQuotes(response.data);
        total = response.total;
      }
    } catch (e) {
      console.error(error.message);
      console.log(error.message);
    } finally {
      hideLoader();
    }
  }, 500);
};
