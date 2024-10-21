document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("addElementButton");
    const elementList = document.getElementById("elementList");
    let elementCount = 0;
    const maxElements = 49;
  
    button.addEventListener("click", function() {
      if (elementCount < maxElements) {
        elementCount++;
        const newElement = document.createElement("div");
        newElement.textContent = `Element ${elementCount}`;
        newElement.className = "added-element";  // optionele styling vanuit CSS
        elementList.appendChild(newElement);
      }
  
      if (elementCount >= maxElements) {
        button.disabled = true; // Disable de knop wanneer 49 elementen zijn toegevoegd
      }
    });
  });
  