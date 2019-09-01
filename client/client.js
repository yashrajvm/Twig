console.log("Hello");

const form = document.querySelector("form");
const loadingElement= document.querySelector(".loading");
const API_URL= "http://localhost:5000/twigs";


loadingElement.style.display= "none";
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
        console.log(createdTwig);
    });
});