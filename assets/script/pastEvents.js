console.log(data);
let container = document.querySelector(".cardsContainer");
const currentDate = new Date(data.currentDate).getTime();
for (let i = 0; i < data.events.length; i++) {
  const eventDate = new Date(data.events[i].date).getTime();
  if (currentDate > eventDate) {
    let card = document.createElement("div");
    card.classList.add("card", "p-2");
    card.innerHTML = `<img src="${data.events[i].image}" class="imagenCard card-img-top" alt="...">
          <div class="card-body d-flex flex-column justify-content-around">
              <h5 class="card-title text-center">${data.events[i].name}</h5>
              <p class="card-text">${data.events[i].description}.</p>
              <div class="d-flex align-items-center justify-content-between mt-4">
                  <p class="h6">price $${data.events[i].price}</p>
                  <a href="./details.html" class="btn btn-primary push-button">View More</a>
              </div>
          </div>`;
    container.appendChild(card);
  }
}
