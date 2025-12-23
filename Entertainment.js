function Hambuger(){
 
//    let element1=document.getElementsByClassName("backdrop");

    document.querySelector(".hambuger-hide").classList.toggle("hambuger-show");

    // FOr backdrop
     document.querySelector(".backdrop").classList.toggle("backdrop-show");
    //  Close Menu


}

// Manin logic



  let nextPage = null; // Will store the next page token from API response
let key = "pub_178cb129889f42cc84894b4ac15f1dcb"; // Move to backend for security
let category = "entertainment";

async function News(pageToken = null) {
  try {
    // Build the URL: Always include base params, add &page=token only for load more
    let fetchUrl = `https://newsdata.io/api/1/news?apikey=${key}&language=en&category=${category}&size=10`;
    if (pageToken) {
      fetchUrl += `&page=${pageToken}`;
    }
    
    let res = await fetch(fetchUrl);
    let data = await res.json();
    console.log("API Response:", data); // Debug: Check this in browser console

    if (!data.results || data.results.length === 0) {
      console.log("No news available.");
      document.querySelector(".loadmore").style.display = "none";
      return;
    }

    // Update nextPage for pagination
    nextPage = data.nextPage || null;

    data.results.forEach((x) => {
      const image = x.image_url || "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      const author = x.creator ? x.creator.join(", ") : "Jhon Wick";
      const description = x.description || "No description available.";
      const pubDate = x.pubDate ? new Date(x.pubDate).toDateString() : "Unknown Date";

      let newsdiv = document.createElement("div");
      newsdiv.classList.add("first-news");
      newsdiv.innerHTML = `
        <div class="news_img_container">
          <img class="news_img" src="${image}" alt="">
        </div>
        <div class="news-title-container">
          <h2 class="news_title">${x.title}</h2>
        </div>
        <div class="news-description-container">
          <p class="news_description">${description}</p>
        </div>
        <div class="bottom-news-container">
          <div class="news-author-container">
            <h5 class="news_author">${author}</h5>
          </div>
          <div class="news-date-container">
            <h5 class="news_date">${pubDate}</h5>
          </div>
        </div>
      `;
      document.querySelector(".news-container").append(newsdiv);
    });

    // Show load more if there's a next page
    document.querySelector(".loadmore").style.display = nextPage ? "flex" : "none";
  } catch (error) {
    console.error("Error fetching the news:", error);
    // If it's a JSON parse error, log the raw response for debugging
    if (error instanceof SyntaxError) {
      console.error("Response might not be JSON. Check the fetch URL and API key.");
    }
    alert("Failed to load news. Check console for details.");
  }
}

// Initial fetch (loads 10 cards, no page token)
News();

// Search functionality (live filter)
document.querySelector("#user_input").addEventListener("input", function () {
  const userInput = this.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".first-news");
  let hasVisible = false;

  cards.forEach((card) => {
    const title = card.querySelector(".news_title").textContent.toLowerCase();
    const description = card.querySelector(".news_description").textContent.toLowerCase();
    const author = card.querySelector(".news_author").textContent.toLowerCase();

    if (title.includes(userInput) || description.includes(userInput) || author.includes(userInput)) {
      card.style.display = "flex";
      hasVisible = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show/hide no-results message
  document.getElementById("no-results").style.display = hasVisible ? "none" : "block";
});

// Optional: If you add a submit button, handle form submit
document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page reload
  // Could trigger a re-filter or API search here if needed
});

// Load more (uses nextPage token)
function loadMoreNews() {
  if (nextPage) {
    News(nextPage);
  }
}