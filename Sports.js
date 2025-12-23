function Hambuger(){
 
//    let element1=document.getElementsByClassName("backdrop");

    document.querySelector(".hambuger-hide").classList.toggle("hambuger-show");

    // FOr backdrop
     document.querySelector(".backdrop").classList.toggle("backdrop-show");
    //  Close Menu


}

// Manin logic



  let page=1;
  let pageSize=12;
  let key="48c46f7493864b4ab51139f8d3ac6c93"
  let category="sports"

 async function News(){
   try
   {
     let res=await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${key}`)
      let data=await res.json()
   
  

        data.articles.forEach(x => {
             console.log(data)
   console.log(x.description)
        console.log(x.publishedAt)
        console.log(x.title)
        console.log(x.urlToImage)
        // Mutilple card for news
        let newsdiv=document.createElement("div");
        newsdiv.innerHTML=`<div class="first-news"> 
         <div class="news_img_container">
         <img class="news_img" src="${x.urlToImage}" alt="">
         </div>   
             <div class="news-title-container">
        <h2 class="news_title">${x.title}</h2>
    </div>
    <div class="news-description-container">
        <p class="news_description">${x.description}</p>
    </div>

    <div class="bottom-news-container">
         <div class="news-author-container">
        <h5 class="news_author">${x.author}</h5>
    </div>
    <div class="news-date-container">
        <h5 class="news_date">${new Date(x.publishedAt).toDateString()}</h5>
    </div>
    </div>

            </div>`
             document.querySelector(".news-container").append(newsdiv)
  
});
document.querySelector(".loadmore").style.display="flex"
       
      
  
   }
    catch(error) {
        console.error('Error fetching the news:', error);
    }
  }

  News()

document.querySelector("#user_input").addEventListener("input", function () {
  let userInput = this.value.toLowerCase();
  let cards = document.querySelectorAll(".first-news");

  cards.forEach(card => {
    let title = card.querySelector(".news_title").textContent.toLowerCase();
    let description = card.querySelector(".news_description").textContent.toLowerCase();
    let author = card.querySelector(".news_author").textContent.toLowerCase();

    if (
      title.includes(userInput) ||
      description.includes(userInput) ||
      author.includes(userInput)
    ) {
      card.parentElement.style.display = "flex";
    } else {
      card.parentElement.style.display = "none";
    }
  });
});



   function loadMoreNews(){
            page++;
            console.log(page)
            News();
            
            
        }
