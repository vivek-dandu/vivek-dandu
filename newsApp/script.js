
const API_KEY = "API KEY";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

// Reload / Refresh
function reload(){
    window.location.reload();
}

// Fetch News
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    bindData(data.articles);
}

// Binding data
function bindData(articles) {
    const template = document.getElementById("template");
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone =  template.content.cloneNode(true);
    fillData(cardClone, article);
    cardContainer.appendChild(cardClone);
    });
}

// Filling data 
function fillData(cardClone, article) {
    const newsImage = cardClone.querySelector("#news-image");
    const title = cardClone.querySelector("#title");
    const source = cardClone.querySelector("#source");
    const newsDesc = cardClone.querySelector("#desc");

    newsImage.src = article.urlToImage;
    title.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }); 
    source.innerHTML = `${article.source.name} ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Search
const searchText = document.getElementById("search-text");
const search = document.getElementById("search");

search.addEventListener("click", () => {
    if(searchText.value.length > 0){
        fetchNews(searchText.value);
        currentSelected?.classList.remove("active");
    }
})


// Active elements and navigation  
let currentSelected = document.getElementById("home");
currentSelected.classList.add("active");
function nav(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelected?.classList.remove("active");
    currentSelected = navItem;
    currentSelected.classList.add("active");
}