async function getData() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      let table = document.createElement("table");
      table.border = "1";
      let headers = Object.keys(data[0]);
      let headerRow = document.createElement("tr");
      headers.forEach(headerText => {
        let header = document.createElement("th");
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
      });
      table.appendChild(headerRow);

      data.forEach(row => {
        let rowElement = document.createElement("tr");
        headers.forEach(headerText => {
          let cell = document.createElement("td");
          let textNode = document.createTextNode(row[headerText]);
          cell.appendChild(textNode);
          rowElement.appendChild(cell);
        });
        table.appendChild(rowElement);
      });
      document.getElementById("jsonDataTable").appendChild(table);

      let input = document.getElementById("searchInput");
      input.addEventListener("keyup", function() {
        let filter = input.value.toUpperCase();
        let rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
          let cells = rows[i].getElementsByTagName("td");
          let match = false;
          for (let j = 0; j < cells.length; j++) {
            let cell = cells[j];
            if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
              match = true;
              break;
            }
          }
          if (match) {
            rows[i].style.display = "";
          } else {
            rows[i].style.display = "none";
          }
        }
      });
    });
}

getData()