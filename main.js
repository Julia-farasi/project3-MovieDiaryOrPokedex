//Fetch
const fetchPoke = async (id) => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      if (!response.ok) {
        throw new Error('Something went wrong, please try again');
      }
      const data = await response.json();
      return data;  // Daten zurückgeben
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };


// Anzeigen der Pokémon im HTML-Container
const ShowPokes = (Pokemons) => {
    const putPokes = document.getElementById('Pokes-Karten');
    putPokes.innerHTML = '';

    Pokemons.forEach(async (poke) => {
      const res = await fetch(poke.url);   // Fetch für jedes Pokémon
      const pokemon = await res.json();

      // Erstelle die Pokémon-Karte
      const PokCard = document.createElement('div');

    //   PokCard.classList.add('pokemon-card');
      //String, der alle Inline-Styles eines Elements enthält
    // PokCard.style.cssText = `
// box-shadow: 0px 1px 3px #8d8181;
// padding: 10px;
// background-color: #f0f0f0;
// border-radius: 20px;
// `;

 //ODER SO     
PokCard.classList.add(
    'pokemon-card',
    'p-2',
    'bg-[#f0f0f0]',
    'rounded-[20px]',
    'shadow-[0px_1px_3px_#8d8181]'
  );

      // Favoriten-Button
      const button = document.createElement('button');
      button.textContent = '★';
      button.className = ' text-[30px] mt-2 px-3 py-1 text-gray-300 hover:text-yellow-400 active:text-yellow-500 rounded';

      // Pokémon Name
      const PokName = document.createElement('h3');
      PokName.classList.add('pokemon-name');
      PokName.textContent = pokemon.name;
      PokName.style.fontWeight= "bold";

      // Pokémon Bild
      const PokBild = document.createElement('img');
      PokBild.classList.add(
        'pokemon-Bild',
        'w-[100px]',
      'max-w-[200px]'
      );
      PokBild.src = pokemon.sprites.other.showdown.front_shiny;
      PokBild.alt = pokemon.name;

      // Pokémon Typen
      const PokeListe = document.createElement('ul');
      PokeListe.classList.add('pokemon-Liste');


      pokemon.types.forEach(type => {
        const typeItem = document.createElement('li');
        typeItem.textContent = `Typ: ${type.type.name}`;
        PokeListe.appendChild(typeItem);
      });

      // Stats und Abilities
      const attack = document.createElement('p');
      attack.innerHTML = `<strong>Attack:</strong> ${pokemon.stats[1].base_stat}`;

      const defense = document.createElement('p');
      defense.innerHTML = `<strong>Defense:</strong> ${pokemon.stats[2].base_stat}`;

      const hp = document.createElement('p');
      defense.innerHTML = `<strong>HP:</strong> ${pokemon.stats[3].base_stat}`;

      const height = document.createElement('p');
      height.innerHTML = `<strong>Height:</strong> ${pokemon.height}`;

      const weight = document.createElement('p');
      weight.innerHTML = `<strong>Weight:</strong> ${pokemon.weight}`;

      const abilities = document.createElement('p');
      abilities.innerHTML = `<strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}`;

      // Alle Elemente der PokéCard hinzufügen
      PokCard.append(hp, PokName, PokBild, attack, defense, height, weight, abilities, PokeListe, button);

      // Pokémon-Karte zum Container hinzufügen
      putPokes.appendChild(PokCard);
    });
  };


  //Pokes abrufen
  const getpoke = async () => {
    const pokeData = await fetchPoke();
    if (pokeData?.results) {
      ShowPokes(pokeData.results);  // Hier wird das HTML erstellt
    }
  };
  getpoke();



