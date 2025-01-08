document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("destinationForm");
    const destinationList = document.getElementById("destinationList");
  
    const savedDestinations = JSON.parse(localStorage.getItem("destinations")) || [];
    savedDestinations.forEach(addDestinationToDOM);
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const destinationInput = document.getElementById("destinationInput");
      const destinationType = document.getElementById("destinationType");
  
      const destination = {
        name: destinationInput.value,
        type: destinationType.value,
        visited: false
      };
  
      addDestinationToDOM(destination);
      saveDestination(destination);
  
      destinationInput.value = "";
      destinationType.value = "Beach";
    });
  
    function addDestinationToDOM(destination) {
      const item = document.createElement("div");
      item.classList.add("destination-item");
      if (destination.visited) item.classList.add("visited");
  
      item.innerHTML = `
        <span>${destination.name} (${destination.type})</span>
        <div>
          <button class="visit">${destination.visited ? "Unvisit" : "Visited"}</button>
          <button class="delete">Delete</button>
        </div>
      `;
  
      item.querySelector(".visit").addEventListener("click", () => toggleVisited(item, destination));
      item.querySelector(".delete").addEventListener("click", () => deleteDestination(item, destination));
  
      destinationList.appendChild(item);
    }
  
    function saveDestination(destination) {
      const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
      destinations.push(destination);
      localStorage.setItem("destinations", JSON.stringify(destinations));
    }
  
    function deleteDestination(item, destination) {
      item.remove();
      const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
      const updatedDestinations = destinations.filter(d => d.name !== destination.name || d.type !== destination.type);
      localStorage.setItem("destinations", JSON.stringify(updatedDestinations));
    }
  
    function toggleVisited(item, destination) {
      const destinations = JSON.parse(localStorage.getItem("destinations")) || [];
      const updatedDestinations = destinations.map(d => {
        if (d.name === destination.name && d.type === destination.type) {
          d.visited = !d.visited;
        }
        return d;
      });
      localStorage.setItem("destinations", JSON.stringify(updatedDestinations));
  
      destination.visited = !destination.visited;
      item.classList.toggle("visited");
      item.querySelector(".visit").textContent = destination.visited ? "Unvisit" : "Visited";
    }
  });
  