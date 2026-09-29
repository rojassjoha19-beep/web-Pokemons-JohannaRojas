// ARCHIVO PRINCIPAL: conecta la capa de servicios con la capa UI.

import { obtenerListaPokemon, obtenerPokemon } from "./pokemons.js";
import {
  mostrarSpinner,
  ocultarSpinner,
  obtenerValorBusqueda,
  limpiarInputBusqueda,
  limpiarContenedor,
  renderizarListaPokemon,
  renderizarPokemonUnico,
  mostrarAdvertencia,
  mostrarError,
} from "./ui.js";

// Los IDs entre comillas tienen que ser iguales a los del HTML
const botonBuscar = document.getElementById("BuscarBtn");
const botonVolver = document.getElementById("VolverBtn");
const entrada = document.getElementById("pokemonInput");

// Carga inicial (y también la usa el botón Volver)
const cargarTodosLosPokemon = async () => {
  try {
    mostrarSpinner();
    limpiarContenedor();

    const listaPokemon = await obtenerListaPokemon(20);
    renderizarListaPokemon(listaPokemon);
  } catch (error) {
    mostrarError("No se pudieron cargar los Pokémon.");
  } finally {
    ocultarSpinner();
  }
};

// Búsqueda por nombre o ID
const buscarPokemon = async () => {
  const consulta = obtenerValorBusqueda();

  if (!consulta) {
    mostrarAdvertencia("Debe ingresar un nombre o ID");
    return;
  }

  try {
    mostrarSpinner();
    limpiarContenedor();

    const pokemon = await obtenerPokemon(consulta);
    renderizarPokemonUnico(pokemon);
  } catch (error) {
    mostrarError("El Pokémon solicitado no existe");
    await cargarTodosLosPokemon();
  } finally {
    ocultarSpinner();
  }
};

// Botón Volver: limpia el input y recarga la lista inicial
const reiniciarPantalla = () => {
  limpiarInputBusqueda();
  cargarTodosLosPokemon();
};

// Eventos
botonBuscar.addEventListener("click", buscarPokemon);
botonVolver.addEventListener("click", reiniciarPantalla);
entrada.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buscarPokemon();
});

// Los módulos se ejecutan con el DOM ya listo, así que llamamos directo
cargarTodosLosPokemon();