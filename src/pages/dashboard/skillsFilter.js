import { fetchAllSkills } from './api.js';

let selectedSkills = [];
let allSkills = [];
let activeSuggestionIndex = -1;

/**
 * Inicializa el filtro de habilidades y notifica los cambios a través de un callback.
 * @param {string} inputSelector - Selector CSS para el campo de búsqueda.
 * @param {string} badgesContainerId - ID del contenedor de las insignias (badges).
 * @param {function(string[]): void} onFilterChange - Función que se ejecuta cuando los filtros cambian.
 * Recibe la lista actualizada de habilidades seleccionadas.
 */
export async function initSkillsFilter(inputSelector, badgesContainerId, onFilterChange) {
    const input = document.querySelector(inputSelector);
    const badgesContainer = document.getElementById(badgesContainerId);

    allSkills = await fetchAllSkills();

    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add('skills-suggestions', 'border', 'rounded', 'bg-white', 'shadow-sm', 'position-absolute', 'd-none');
    input.parentNode.appendChild(suggestionsContainer);

    function updateSuggestions(value) {
        const matches = allSkills.filter(skill =>
            skill.toLowerCase().includes(value.toLowerCase()) &&
            !selectedSkills.includes(skill)
        );
        suggestionsContainer.innerHTML = matches
            .map(skill => `<div class="suggestion-item px-3 py-1">${skill}</div>`)
            .join('');
        suggestionsContainer.classList.toggle('d-none', matches.length === 0);
        activeSuggestionIndex = -1;
    }

    function addBadge(skill) {
        if (!selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            const badge = document.createElement('span');
            badge.className = 'badge badge-skill-filter me-2';
            badge.innerHTML = `${skill} <button type="button" class="btn-close btn-close-white btn-sm ms-1 p-0" aria-label="Close"></button>`;
            badgesContainer.appendChild(badge);

            badge.querySelector('button').addEventListener('click', () => {
                selectedSkills = selectedSkills.filter(s => s !== skill);
                badge.remove();
                onFilterChange(selectedSkills); // Notificar cambio
            });
        }
        onFilterChange(selectedSkills); // Notificar cambio
        input.value = '';
        suggestionsContainer.classList.add('d-none');
    }

    function highlightSuggestion(index) {
        const items = suggestionsContainer.querySelectorAll('.suggestion-item');
        items.forEach(item => item.classList.remove('active'));
        if (items[index]) {
            items[index].classList.add('active');
            items[index].scrollIntoView({ block: 'nearest' });
        }
    }

    input.addEventListener('input', (e) => updateSuggestions(e.target.value));

    input.addEventListener('keydown', (e) => {
        const items = suggestionsContainer.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
                highlightSuggestion(activeSuggestionIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
                highlightSuggestion(activeSuggestionIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (activeSuggestionIndex > -1 && items[activeSuggestionIndex]) {
                    addBadge(items[activeSuggestionIndex].textContent);
                } else if (items.length > 0) {
                    addBadge(items[0].textContent);
                }
                break;
            case 'Escape':
                 suggestionsContainer.classList.add('d-none');
                 break;
        }
    });

    suggestionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-item')) {
            addBadge(e.target.textContent);
        }
    });

    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.add('d-none');
        }
    });
}