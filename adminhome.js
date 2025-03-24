document.addEventListener("DOMContentLoaded", () => {
    const homeForm = document.getElementById("homeForm");
    const homeTable = document.getElementById("homeTable").querySelector("tbody");
    let homeDetails = [];
    let idCounter = 1;
  
    // Add new home detail
    homeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
  
      const newDetail = { id: idCounter++, title, description };
      homeDetails.push(newDetail);
      updateTable();
  
      homeForm.reset();
    });
  
    // Update the table with home details
    function updateTable() {
      homeTable.innerHTML = "";
      homeDetails.forEach((detail) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${detail.id}</td>
          <td>${detail.title}</td>
          <td>${detail.description}</td>
          <td>
            <button class="btn-edit" onclick="editDetail(${detail.id})">Edit</button>
            <button class="btn-delete" onclick="deleteDetail(${detail.id})">Delete</button>
          </td>
        `;
        homeTable.appendChild(row);
      });
    }
  
    // Edit a specific home detail
    window.editDetail = (id) => {
      const detail = homeDetails.find((d) => d.id === id);
      if (detail) {
        document.getElementById("title").value = detail.title;
        document.getElementById("description").value = detail.description;
  
        deleteDetail(id);
      }
    };
  
    // Delete a specific home detail
    window.deleteDetail = (id) => {
      homeDetails = homeDetails.filter((d) => d.id !== id);
      updateTable();
    };
  });
  