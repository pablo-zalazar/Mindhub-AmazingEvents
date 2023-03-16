fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((resp) => resp.json())
  .then(({ currentDate, events }) => {
    let greaterAttendance = { name: "", percentage: 0 };
    let lowerAttendance = { name: "", percentage: 0 };
    let largerCapacity = { name: "", percentage: 0 };
    let pastEvents = [];
    let upcomingEvents = [];
    let categories = [];
    currentDate = new Date(currentDate).getTime();
    events.forEach((event) => {
      let attendancePercentage = (event.assistance * 100) / event.capacity;
      if (attendancePercentage) {
        if (greaterAttendance.percentage == 0 || greaterAttendance.percentage < attendancePercentage) {
          greaterAttendance = { name: event.name, percentage: attendancePercentage };
        } else if (lowerAttendance.percentage == 0 || lowerAttendance.percentage > attendancePercentage) {
          lowerAttendance = { name: event.name, percentage: attendancePercentage };
        }
      }
      if (largerCapacity.percentage < event.capacity) {
        largerCapacity = { name: event.name, percentage: event.capacity };
      }
      const eventDate = new Date(event.date).getTime();
      if (currentDate > eventDate) {
        pastEvents = [...pastEvents, event];
      } else {
        upcomingEvents = [...upcomingEvents, event];
      }
      if (!categories.includes(event.category)) categories = [...categories, event.category];
    });

    //table 1 data
    const table1 = document.querySelector(".table_1_data");
    let fragment1 = document.createDocumentFragment();

    [greaterAttendance, lowerAttendance].forEach((element) => {
      const column = document.createElement("td");
      column.classList.add("fw-semibold");
      column.innerHTML = `${element.name} (${isDecimal(element.percentage)}%)`;
      fragment1.appendChild(column);
    });

    const column = document.createElement("td");
    column.classList.add("fw-semibold");
    column.innerHTML = `${largerCapacity.name} (${largerCapacity.percentage})`;
    fragment1.appendChild(column);
    table1.appendChild(fragment1);

    // table 2 data
    const table2 = document.querySelector(".table_2_data");
    let valuesPerCategory = [];
    categories.forEach((category) => {
      const categoryEvents = upcomingEvents.filter((event) => event.category == category);
      valuesPerCategory = [...valuesPerCategory, valoresPorCategoria(category, categoryEvents)];
    });
    const fragment = crearFila(valuesPerCategory);
    table2.appendChild(fragment);

    // table 3 data
    const table3 = document.querySelector(".table_3_data");
    valuesPerCategory = [];
    categories.forEach((category) => {
      const categoryEvents = pastEvents.filter((event) => event.category == category);
      valuesPerCategory = [...valuesPerCategory, valoresPorCategoria(category, categoryEvents)];
    });
    const fragment2 = crearFila(valuesPerCategory);
    table3.appendChild(fragment2);
  });

function valoresPorCategoria(category, values) {
  let reveneus = 0;
  let attendance = 0;
  values.forEach((value) => {
    reveneus += value.price * (value.assistance || value.estimate);
    attendance += (((value.assistance || value.estimate) / value.capacity) * 100) / values.length;
  });
  return { category, reveneus, attendance };
}

function crearFila(values) {
  fragment = document.createDocumentFragment();
  values.forEach((value) => {
    let row = document.createElement("tr");
    row.classList.add("fw-semibold");
    row.innerHTML = `
    <td>${value.category}</td>
    <td>$${value.reveneus}</td>
    <td>%${isDecimal(value.attendance)}</td>
   `;
    fragment.appendChild(row);
  });
  return fragment;
}

function isDecimal(value) {
  return value % 1 == 0 ? value : value.toFixed(2);
}
