// CLAVE DE ACCESO
// Cambia esta clave por la que tú quieras.
const CLAVE_CORRECTA = "1234";

// ELEMENTOS
const loginScreen = document.getElementById("loginScreen");
const panelScreen = document.getElementById("panelScreen");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const toolCards = document.querySelectorAll(".tool-card");
const totalTools = document.getElementById("totalTools");

// MOSTRAR TOTAL DE HERRAMIENTAS
totalTools.textContent = toolCards.length;

// ENTRAR AL PANEL
function entrarPanel() {
  const clave = passwordInput.value.trim();

  if (clave === CLAVE_CORRECTA) {
    localStorage.setItem("panelActivo", "true");
    loginScreen.classList.add("hidden");
    panelScreen.classList.remove("hidden");
    errorMsg.textContent = "";
  } else {
    errorMsg.textContent = "Clave incorrecta. Inténtalo de nuevo.";
  }
}

// ENTRAR CON TECLA ENTER
passwordInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    entrarPanel();
  }
});

// MANTENER SESIÓN ABIERTA
window.addEventListener("load", function() {
  const sesionActiva = localStorage.getItem("panelActivo");

  if (sesionActiva === "true") {
    loginScreen.classList.add("hidden");
    panelScreen.classList.remove("hidden");
  }
});

// CERRAR SESIÓN
function cerrarSesion() {
  localStorage.removeItem("panelActivo");
  passwordInput.value = "";
  loginScreen.classList.remove("hidden");
  panelScreen.classList.add("hidden");
}

// FILTROS POR CATEGORÍA
filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-category");
    filtrarHerramientas(category, searchInput.value.toLowerCase());
  });
});

// BUSCADOR
searchInput.addEventListener("input", function() {
  const activeButton = document.querySelector(".filter-btn.active");
  const category = activeButton.getAttribute("data-category");
  const searchText = searchInput.value.toLowerCase();

  filtrarHerramientas(category, searchText);
});

// FUNCIÓN GENERAL DE FILTRADO
function filtrarHerramientas(category, searchText) {
  toolCards.forEach(function(card) {
    const cardCategory = card.getAttribute("data-category");
    const cardText = card.innerText.toLowerCase();

    const coincideCategoria = category === "todas" || cardCategory === category;
    const coincideBusqueda = cardText.includes(searchText);

    if (coincideCategoria && coincideBusqueda) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
