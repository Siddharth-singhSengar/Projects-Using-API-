const api_key = "681360ef937f44308d8fa717409ac471";
const url = "https://newsapi.org/v2/everything?q="



async function getData(query) {
    let response = await fetch(`${url}${query}&apiKey=${api_key}`);
    let data = await response.json();
    
    bindData(data.articles)

}

function bindData(articles){
    const container =  document.getElementById("container");
    const template = document.getElementById("template");

    container.innerHTML = ""

    articles.forEach(article => {
        if(!article.urlToImage) return;
        let cardClone = template.content.cloneNode(true);
        
        fillData(cardClone , article)
        container.appendChild(cardClone);
        
    });
     
}

function fillData(cardClone,article){

    const img = cardClone.querySelector("#image");
    const title = cardClone.querySelector("#news-title");
    const source =  cardClone.querySelector("#news-source");
    const des =  cardClone.querySelector("#news-desc");

    img.src = article.urlToImage;
    title.innerHTML = article.title;
    des.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US" ,{timeZone:"Asia/Jakarta",});

    source.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })

    
}

const navopt = document.querySelectorAll(".opt")

let selected=null
navopt.forEach(nav => {
    nav.addEventListener("click",(e)=>{
        query = e.target.id
        getData(query)
           
selected?.classList.remove("active")
selected = nav
selected.classList.add("active")


    })

})
 


const searchbtn = document.querySelector(".srcbtn")


const searchinput = ()=>{
    let sr = document.querySelector(".input").value
    if(!sr) return;

    getData(sr)
    selected?.classList.remove("active")
    selected=null;

    
    
}
searchbtn.addEventListener("click",searchinput)

const newslogo = document.getElementById("newslogo");

newslogo.addEventListener("click",()=>{
    window.location.reload();
})

window.addEventListener("load" , getData("India"))