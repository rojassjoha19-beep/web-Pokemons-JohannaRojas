// CAPA DE SERVICIOS: solo se ocupa de las llamadas fetch a la API.

const URL_API = "https://pokeapi.co/api/v2/pokemon";

// Trae los primeros `limite` Pokémon con todos sus detalles
export const obtenerListaPokemon = async (limite = 20) => {
  const respuesta = await fetch(`${URL_API}?limit=${limite}`);
  if (!respuesta.ok) throw new Error("No se pudo obtener la lista");

  const datos = await respuesta.json();

  // Detalle de cada Pokémon en paralelo
  const promesas = datos.results.map(async (p) => {
    const resp = await fetch(p.url);
    if (!resp.ok) throw new Error(`Error al cargar ${p.name}`);
    return resp.json();
  });

  return Promise.all(promesas);
};

// Busca un Pokémon por nombre o ID (la API acepta ambos)
export const obtenerPokemon = async (consulta) => {
  const respuesta = await fetch(`${URL_API}/${consulta}`);
  if (!respuesta.ok) throw new Error("Pokémon no encontrado");
  return respuesta.json();
};