// Open Modal with the clicked image/video
function openModal(element) {
    const modal = document.getElementById("modal");
    const modalContent = modal.querySelector(".modal-content");
  
    // Clear previous content
    modalContent.innerHTML = "";
  
    // Create a clone of the clicked element (image or video)
    const clone = element.cloneNode(true);
    modalContent.appendChild(clone);
  
    // Show the modal
    modal.style.display = "flex";
  }
  
  // Close the modal when clicking outside or on the close button
  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }
  