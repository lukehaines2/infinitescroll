(function () {

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

      quotesEl.appendChild(quoteEl);
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


  const loadQuotes = async (page, limit) => {
    // Show Loader on FE
    showLoader();

    try {
      if (hasMoreQuotes(page, limit, total)) {
        // Call API
        const response = await getQuotes(page, limit);
        renderQuotes(response.data);
        total = response.total;
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      hideLoader();
    }
  };


  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMoreQuotes(currentPage, limit, total)) {
      currentPage++;
      loadQuotes(currentPage, limit);
    }
  }, {
    // Chromium browser implementation to stop e.preventdefault
    passive: true
  });

  loadQuotes(currentPage, limit);

})();
