//Fetch
const fetchPoke = async (id) => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      if (!response.ok) {
        throw new Error('Something went wrong, please try again');
      }
      const data = await response.json();
      return data;  

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


      // Pokémon-Karten
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
   
    'bg-[#f0f0f0]',
    'rounded-[5px]',
    'shadow-[0px_1px_3px_#8d8181]'
  );


  // Head-dev
  const PokHead = document.createElement('div');
   PokHead.classList.add(
    'pokemon-head',
    'flex', 
    'justify-between', 
    'items-center', 
    'gap-2', 
    'm-2',
    'border-b-2',
    'border-[#b8b4b4]'
   );
      // Pokémon Name
      const PokName = document.createElement('h3');
      PokName.classList.add(
        'pokemon-name',
        'text-g',
        'font-medium',
        'uppercase',
        'p-2'
      );
      PokName.textContent = pokemon.name;
     //HP
      const hp = document.createElement('p');
      hp.innerHTML = `<strong>HP:</strong> ${pokemon.stats[0].base_stat}`;
      hp.classList.add(
        'text-xs',
        'font-medium',
        'text-[#ef5350]'
      );
      //append head container
      PokHead.append(PokName, hp);



  // fav-dev
      const PokFav = document.createElement('div');
      PokFav.classList.add(
       'pokemon-Favo',
       'flex', 
       'justify-between', 
       'items-end', 
       'uppercase',
       'text-xs',
       'gap-2', 
       'ml-2',
  
       'mt-0',
       'mb-4'
      );

 // Favoriten-Button
 const button = document.createElement('button');
 button.textContent = '★';
 button.className = 'text-[30px] mt-2 px-3 py-1 text-[#b8b4b4] hover:text-yellow-300 active:text-yellow-500 rounded';
// Pokes in Favoriten hinzufügen
 button.addEventListener('click',()=>{
addEventListener(pokemon);
});

 // Pokémon Typen
 const PokeListe = document.createElement('ul');
 PokeListe.classList.add(
  'pokemon-Liste',
  'flex', 
  'justify-between', 
  'items-center',
  'pl-2'
);

   const typeItem = document.createElement('li');
  //  typeItem.textContent = `Typ: ${type.type.name}`;
  typeItem.textContent = `Typ: ${pokemon.types.map(type => type.type.name).join(', ')}`;

   PokeListe.appendChild(typeItem);

 //append Favo container
 PokFav.append(PokeListe, button);



      // Pokémon Bild
      const PokBild = document.createElement('img');
      PokBild.classList.add(
        'pokemon-Bild',
        'w-[100px]',
        'h-[100px]',
      'max-w-[100px]',
       'mx-auto',
       'object-containe',
       'aspect-square'
      );
      PokBild.src = pokemon.sprites.other.showdown.front_shiny;
      PokBild.alt = pokemon.name;

      
 // attack/defense-dev
 const PokAttackdefense = document.createElement('div');
PokAttackdefense.classList.add(
  'pokemon-Attack-defense',
  'flex', 
  'items-center',  
  'text-xs',
  'm-2',
  'justify-center'
 );
      // Stats und Abilities
      const attack = document.createElement('p');
      attack.innerHTML = `Attack: ${pokemon.stats[1].base_stat}`;

      const defense = document.createElement('p');
      defense.innerHTML = `Defense: ${pokemon.stats[2].base_stat}`;

 //Vertikale Linie zwischen defense und attack
  const linie = document.createElement('div');
  linie.classList.add(
  'border-l-2',         
  'border-[#b8b4b4]', 
  'h-4',             
  'mx-1'             
);
      //append attack7/defense container
 PokAttackdefense.append(attack, linie, defense);
     



// height/weight-dev
const PokHeighweight = document.createElement('div');
PokHeighweight.classList.add(
  'pokemon-height-weight',
  'flex', 
  'items-center',  
  'text-xs',
  'm-2',
  'justify-center'
 );

      const height = document.createElement('p');
      height.innerHTML = `Height: ${pokemon.height}  m`;

      const weight = document.createElement('p');
      weight.innerHTML = `Weight: ${pokemon.weight} kg`;

 //Vertikale Linie zwischen defense und attack
 const linie2 = document.createElement('div');
 linie2.classList.add(
 'border-l-2',         
 'border-[#b8b4b4]', 
 'h-4',             
 'mx-1'             
);
     //append height/weight container
PokHeighweight.append(height, linie2, weight);



     //append abilities container
      const abilities = document.createElement('p');
      abilities.innerHTML = `<strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}`;
      abilities.classList.add(
        'pokemon-abilities',
      'p-2',
        'text-xs',
        'm-2',
        'justify-center'
       );


      // Alle Elemente der PokéCard hinzufügen
      PokCard.append(PokHead, PokFav, PokBild, PokAttackdefense, PokHeighweight, abilities);
      // Pokémon-Karte zum Container hinzufügen
      putPokes.appendChild(PokCard);
    });
  };


  //Pokes abrufen
  const getpoke = async () => {
    const pokeData = await fetchPoke();
    if (pokeData?.results) {
      ShowPokes(pokeData.results);  //  HTML erstellen
    }
  };
  getpoke();



