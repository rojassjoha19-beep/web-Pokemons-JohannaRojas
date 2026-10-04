const contenedor = document.getElementById("pokemonContainer");
const indicadorCarga = document.getElementById("spinner");
const entrada = document.getElementById("pokemonInput");

export const mostrarSpinner = () => indicadorCarga.classList.remove("d-none");
export const ocultarSpinner = () => indicadorCarga.classList.add("d-none");
export const obtenerValorBusqueda = () => entrada.value.trim().toLowerCase();
export const limpiarInputBusqueda = () => {
  entrada.value = "";
};
const crearTarjeta = ({ id, name, sprites, types }) => {
  const listaTipos = types
    .map((t) => `<span class="badge bg-secondary me-1">${t.type.name}</span>`)
    .join("");

  return `
    <div class="card shadow">
      <img src="${sprites.front_default}" class="card-img-top" alt="${name}">
      <div class="card-body text-center">
        <small class="text-muted">#${id}</small>
        <h5 class="card-title text-capitalize">${name}</h5>
        <p>${listaTipos}</p>
      </div>
    </div>
  `;
};

export const limpiarContenedor = () => {
  contenedor.innerHTML = "";
};
export const renderizarListaPokemon = (listaPokemon) => {
  contenedor.classList.remove("justify-content-center");
  contenedor.innerHTML = listaPokemon
    .map((p) => `<div class="col-md-3">${crearTarjeta(p)}</div>`)
    .join("");
};

export const renderizarPokemonUnico = (pokemon) => {
  contenedor.classList.add("justify-content-center");
  contenedor.innerHTML = `
    <div class="col-md-4 single-card">
      ${crearTarjeta(pokemon)}
    </div>
  `;
};
export const mostrarAdvertencia = (mensaje) =>
  Swal.fire("Atención", mensaje, "warning");
export const mostrarError = (mensaje) => Swal.fire("Error", mensaje, "error");