const apiKey = "2cc543067fab47448cad4bb98845f36a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("world"));      

async function fetchNews(query){
   const resp = await fetch(`${url}${query}&apikey=${apiKey}`);
   const data = await resp.json();     
   bindData(data.articles);          
   console.log(data)
}

function bindData(articles){
    const cardContainers = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainers.innerHTML = " ";


    articles.forEach(article  =>{
        if(!article.urlToImage) return ;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardContainers.appendChild(cardClone);
    })
}   

function fillDataInCard(cardClone,article){
    const newsImg =cardClone.querySelector('#news-img');
    const newsTitle =cardClone.querySelector('#news-title');
    const newsSource =cardClone.querySelector('#news-source');
    const newsDesc =cardClone.querySelector('#news-desc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("es-US",{
        timeZone:"Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"blank");
    });
}

let curSelectedNav = null;
function clickOnNavItem(id){
    fetchNews(id)

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem; 
    curSelectedNav.classList.add('active');
}

const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return ;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})