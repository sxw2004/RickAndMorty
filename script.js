document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cardsContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const characterFilter = document.getElementById('characterFilter');
    let allCharacters = [];

    // Función para obtener los primeros 16 personajes
    async function fetchCharacters() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const data = await response.json();
            
            // Tomar solo los primeros 16 personajes
            allCharacters = data.results.slice(0, 16);
            
            // Poblar el filtro desplegable
            populateFilterOptions(allCharacters);
            
            // Mostrar los personajes
            displayCharacters(allCharacters);
            
            loadingMessage.style.display = 'none';
        } catch (error) {
            console.error('Error al cargar los personajes:', error);
            loadingMessage.textContent = 'Error al cargar los personajes. Por favor, intenta de nuevo más tarde.';
        }
    }

    // Función para poblar el filtro desplegable
    function populateFilterOptions(characters) {
        characters.forEach(character => {
            const option = document.createElement('option');
            option.value = character.id;
            option.textContent = character.name;
            characterFilter.appendChild(option);
        });

        // Añadir evento de cambio al filtro
        characterFilter.addEventListener('change', filterCharacters);
    }

    // Función para mostrar los personajes
    function displayCharacters(characters) {
        cardsContainer.innerHTML = '';
        
        characters.forEach(character => {
            const card = createCharacterCard(character);
            cardsContainer.appendChild(card);
        });
    }

    // Función para crear una card de personaje
    function createCharacterCard(character) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = character.id;
        
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="card-content">
                <h3>${character.name}</h3>
                <div class="status ${character.status.toLowerCase()}">${character.status} - ${character.species}</div>
                
                <p class="info-label">Última ubicación conocida:</p>
                <p class="info-value">${character.location.name}</p>
                
                <p class="info-label">Origen:</p>
                <p class="info-value">${character.origin.name}</p>
                
                <p class="info-label">Género:</p>
                <p class="info-value">${character.gender}</p>
            </div>
        `;
        
        return card;
    }

    // Función para filtrar personajes
    function filterCharacters() {
        const selectedValue = characterFilter.value;
        
        if (selectedValue === 'all') {
            displayCharacters(allCharacters);
        } else {
            const selectedCharacter = allCharacters.filter(character => character.id == selectedValue);
            displayCharacters(selectedCharacter);
        }
    }

    // Iniciar la carga de personajes
    fetchCharacters();
});