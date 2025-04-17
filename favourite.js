  // Favoriten aus localStorage holen
  const favourites = JSON.parse(localStorage.getItem('likedCards')) || [];

  // Container-Div abrufen
  const favouriteDiv = document.getElementById('favourites');

  // Für jeden Favoriten den Namen holen, API abfragen und Karte bauen
  favourites.forEach(async (name) => {
      try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const pokemon = await res.json();

          // Karte bauen mit genau den gleichen Klassen und Stil wie in result.html
          const cardDiv = document.createElement('div');
          cardDiv.classList.add(
              'pokemon-card', 
              'bg-[#f0f0f0]',
              'rounded-[5px]',
              'shadow-[0px_1px_3px_#8d8181]',
              'p-4',
              'm-2'
          );

          // Head-dev
          const PokHead = document.createElement("div");
          PokHead.classList.add(
              "pokemon-head",
              "flex",
              "justify-between",
              "items-center",
              "gap-2",
              "m-2",
              "border-b-2",
              "border-[#b8b4b4]"
          );

          // Pokémon Name
          const PokName = document.createElement("h3");
          PokName.classList.add(
              "pokemon-name",
              "font-medium",
              "uppercase",
              "p-2"
          );
          PokName.textContent = pokemon.name;

          // HP
          const hp = document.createElement("p");
          hp.innerHTML = `<strong>HP:</strong> ${pokemon.stats[0].base_stat}`;
          hp.classList.add("text-xs", "font-medium", "text-[#ef5350]");

          // append head container
          PokHead.append(PokName, hp);

          // Pokémon Typen
          const PokeListe = document.createElement("ul");
          PokeListe.classList.add(
              "pokemon-Liste",
              "flex",
              "justify-between",
              "items-center",
              "pl-2"
          );

          const typeItem = document.createElement("li");
          typeItem.textContent = `Typ: ${pokemon.types
              .map((type) => type.type.name)
              .join(", ")}`;
          PokeListe.appendChild(typeItem);

          // Pokémon Bild
          const PokBild = document.createElement("img");
          PokBild.classList.add(
              "pokemon-Bild",
              "w-[100px]",
              "h-[100px]",
              "max-w-[100px]",
              "mx-auto",
              "object-contain",
              "aspect-square"
          );
          PokBild.src = pokemon.sprites.other.showdown.front_shiny;
          PokBild.alt = pokemon.name;

          // attack/defense-dev
          const PokAttackdefense = document.createElement("div");
          PokAttackdefense.classList.add(
              "pokemon-Attack-defense",
              "flex",
              "items-center",
              "text-xs",
              "m-2",
              "justify-center"
          );

          // Stats und Abilities
          const attack = document.createElement("p");
          attack.innerHTML = `Attack: ${pokemon.stats[1].base_stat}`;

          const defense = document.createElement("p");
          defense.innerHTML = `Defense: ${pokemon.stats[2].base_stat}`;

          // Vertikale Linie zwischen defense und attack
          const linie = document.createElement("div");
          linie.classList.add("border-l-2", "border-[#b8b4b4]", "h-4", "mx-1");

          // append attack7/defense container
          PokAttackdefense.append(attack, linie, defense);

          // height/weight-dev
          const PokHeighweight = document.createElement("div");
          PokHeighweight.classList.add(
              "pokemon-height-weight",
              "flex",
              "items-center",
              "text-xs",
              "m-2",
              "justify-center"
          );

          const height = document.createElement("p");
          height.innerHTML = `Height: ${pokemon.height} m`;

          const weight = document.createElement("p");
          weight.innerHTML = `Weight: ${pokemon.weight} kg`;

          // Vertikale Linie zwischen defense und attack
          const linie2 = document.createElement("div");
          linie2.classList.add("border-l-2", "border-[#b8b4b4]", "h-4", "mx-1");

          // append height/weight container
          PokHeighweight.append(height, linie2, weight);

          // append abilities container
          const abilities = document.createElement("p");
          abilities.innerHTML = `<strong>Abilities:</strong> ${pokemon.abilities
              .map((a) => a.ability.name)
              .join(", ")}`;
          abilities.classList.add(
              "pokemon-abilities",
              "p-2",
              "text-xs",
              "m-2",
              "justify-center"
          );

          // Alle Elemente der PokéCard hinzufügen
          cardDiv.append(
              PokHead,
              PokeListe,
              PokBild,
              PokAttackdefense,
              PokHeighweight,
              abilities
          );

          // Pokémon-Karte zum Container hinzufügen
          favouriteDiv.appendChild(cardDiv);

      } catch (error) {
          console.error("Fehler beim Laden der Favoriten:", error);
      }
  });