console.log(data);
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const eventDetails = data.events.find((e) => e._id == id);

let container = document.querySelector(".detailsCard");
let card = document.createElement("div");
card.classList.add("details-container", "p-2");
card.innerHTML = `<div class="details-container p-2">
  <div class="d-flex flex-column flex-md-row p-4 gap-4 border border-dark rounded bg-body-secondary">
      <div class="details-element border border-dark rounded">
          <img src="${eventDetails.image}" alt=" image">
      </div>
      <div class="details-element border border-dark  d-flex flex-column gap-2 rounded p-2 bg-light">
          <h5 class="card-title text-center">${eventDetails.name}</h5>
          <p class="card-text">Assistance: ${eventDetails.assistance}</p>
          <p class="card-text">Capacity: ${eventDetails.capacity}</p>
          <p class="card-text">Category: ${eventDetails.category}</p>
          <p class="card-text">Date: ${eventDetails.date}</p>
          <p class="card-text">Place: ${eventDetails.place}</p>
          <p class="card-text">Price: $${eventDetails.price}</p>
          <p class="card-text">${eventDetails.description}</p>
      </div>
  </div>
</div>`;

container.appendChild(card);
