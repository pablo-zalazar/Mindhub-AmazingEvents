// cards
function crearCards(data) {
  let container = document.querySelector(".cardsContainer");
  container.replaceChildren();
  let fragment1 = document.createDocumentFragment();
  for (let i = 0; i < data.events.length; i++) {
    if (filtros.length < 1 || filtros.includes(data.events[i].category)) {
      if (search === "" || data.events[i].name.toLowerCase().includes(search)) {
        let card = document.createElement("div");
        card.classList.add("card", "p-2");
        card.innerHTML = `<img src="${data.events[i].image}" class="imagenCard card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-around">
            <h5 class="card-title text-center">${data.events[i].name}</h5>
            <p class="card-text">${data.events[i].description}.</p>
            <div class="d-flex align-items-center justify-content-between mt-4">
                <p class="h6">price $${data.events[i].price}</p>
                <a href="./details.html?id=${data.events[i]._id}" class="btn btn-primary push-button">View More</a>
            </div>
        </div>`;
        fragment1.appendChild(card);
      }
    }
  }
  if (fragment1.childNodes.length === 0) {
    let message = document.createElement("h1");
    message.classList.add("w-100", "text-center");
    message.innerText = "No results";
    fragment1.appendChild(message);
  }
  container.appendChild(fragment1);
}

// checkboxes
function crearCategorias(categorias) {
  let contenedorCategorias = document.querySelector(".filtros");
  let fragment2 = document.createDocumentFragment();
  for (let categoria of categorias) {
    let div = document.createElement("div");
    div.classList.add("form-check", "form-check-inline");
    div.innerHTML = `
    <label class="form-check-label" for="${categoria}"> ${categoria}
         <input class="form-check-input" name="flexRadioDefault" type="checkbox" id="${categoria}">
    </label>
    `;
    fragment2.appendChild(div);
  }
  contenedorCategorias.appendChild(fragment2);
}

// checkboxes addEventListener
function verificarSeleccion() {
  let newFilter = [];
  Array.from(checkboxes).forEach((checkbox) => checkbox);
  let inputsChequeados = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
  inputsChequeados.forEach((e) => newFilter.push(e.id));
  filtros = newFilter;
  crearCards(data2);
}

// search
function handleChangeSearch(element) {
  search = element.value.trim().toLowerCase();
  crearCards(data2);
}

function handleSubmit(e) {
  e.preventDefault();
  searchInput.value = "";
  search = "";
  crearCards(data2);
}

let searchInput = document.querySelector("input[type=search]");
let searchButton = document.querySelector("button[type=submit]");
searchInput.addEventListener("input", () => handleChangeSearch(searchInput));
searchButton.addEventListener("click", handleSubmit);

let filtros = [];
let categorias = [];
let search = "";
let data2 = [];
let checkboxes = [];

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((resp) => resp.json())
  .then((data) => {
    data2 = data;
    data.events.forEach((evento) => {
      if (!categorias.includes(evento.category)) categorias = [...categorias, evento.category];
    });
    crearCards(data2);
    crearCategorias(categorias);
  })
  .then(() => {
    checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", verificarSeleccion);
    });
  });
