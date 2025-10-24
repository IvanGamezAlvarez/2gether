// const availableSkills = [
//     "Java", "SQL", "AWS", "React", "Go", "Docker", "HTML", "CSS", "Inglés",
//     "Testing", "Vue.js", "TypeScript", "Spring Boot", "PostgreSQL", "Figma",
//     "Guitarra", "Scrum", "Node.js"
// ];

/**
 * Simulates fetching the list of all available skills.
 */
// export function fetchAllSkills() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(availableSkills.sort());
//         }, 300);
//     });
// }

const API_BASE_URL = "http://localhost:8080/api/v1/users";

/**
 * Obtiene los usuarios con intercambio ideal para un usuario específico.
 * Llama a: GET /api/v1/users/ideal-exchanges/{id}
 */
export async function fetchIdealExchanges(userId) {
  const response = await fetch(`${API_BASE_URL}/ideal-exchanges/${userId}`);
  if (!response.ok) throw new Error("Error fetching ideal exchanges");
  return await response.json();
}

/**
 * Obtiene los usuarios sugeridos para el usuario autenticado.
 * Llama a: GET /api/v1/users/suggested/{id}
 */
export async function fetchSuggestions(userId) {
  const response = await fetch(`${API_BASE_URL}/suggested/${userId}`);
  if (!response.ok) throw new Error("Error fetching suggestions");
  return await response.json();
}

/**
 * Obtiene los usuarios a los que el usuario autenticado puede ayudar.
 * Llama a: GET /api/v1/users/can-help/{id}
 */
export async function fetchHelpOpportunities(userId) {
  const response = await fetch(`${API_BASE_URL}/can-help/${userId}`);
  if (!response.ok) throw new Error("Error fetching help opportunities");
  return await response.json();
}