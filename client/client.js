console.log("Hello");

const form = document.querySelector("form");
const loadingElement= document.querySelector(".loading");
const twigsElement= document.querySelector(".twigs");
const API_URL= "http://localhost:5000/twigs";


loadingElement.style.display= "";

listAllTwigs();

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const formData =new FormData(form);
    const name= formData.get("name");
    const content= formData.get("content");
    
    const twig= {
        name,
        content
    };

   
    form.style.display= "none";
    loadingElement.style.display= "";

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(twig),
        headers: {
            "content-type": "application/json"
        }    
    }).then(response => response.json())
    .then(createdTwig => {
        
        form.reset();
        form.style.display= "";
        listAllTwigs();
    });
});


function listAllTwigs() {
    twigsElement.innerHTML= "";
    fetch(API_URL)
        .then(response => response.json())
        .then(twigs => {
            
            twigs.reverse();
            twigs.forEach(twig => {
                const div = document.createElement("div");
                const header= document.createElement("h3");

                header.textContent= twig.name;

                const contents= document.createElement("p");
                contents.textContent= twig.content;

                const date = document.createElement("small");
                date.textContent= new Date(twig.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                twigsElement.appendChild(div);
            });
            loadingElement.style.display= "none";
        });
}