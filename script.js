document.getElementById("searchForm").addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let gdata = document.getElementById("inp").value;
    if (gdata === '') {
        alert('Please enter a value');
        return;
    }
    
    try {
        let res = await fetch(
            `https://api.edamam.com/search?q=${gdata}&app_id=a52b4d43&app_key=e0e5c667605f5e91d8275c973531b80a`
        );
        let data = await res.json();
        
        let main = document.getElementById("main");
        main.innerHTML = ''; // Clear previous results

        for (let i = 0; i < Math.min(10, data.hits.length); i++) {
            let card = document.createElement("div");
            card.className = "card col-md-4";

            let img = document.createElement("img");
            img.src = data.hits[i].recipe.image;

            let cardBody = document.createElement("div");
            cardBody.className = "card-body";

            let h5 = document.createElement("h5");
            h5.className = "card-title";
            h5.innerHTML = data.hits[i].recipe.label;

            let p = document.createElement("p");
            p.className = "card-text";
            p.innerHTML = "Some quick text to build on the page";

            let a = document.createElement("a");
            a.className = "btn btn-primary";
            a.innerHTML = "See more";
            a.href = data.hits[i].recipe.url;
            a.target = "_blank";

            card.appendChild(img);
            card.appendChild(cardBody);
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(a);
            main.appendChild(card);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
