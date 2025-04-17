
    // Suche auch ausführen, wenn Enter gedrückt wird
    document.getElementById("searchInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          event.preventDefault(); 
          searchCard(); 
        }
      });
      
          function searchCard() {
            const input = document
              .getElementById("searchInput")
              .value.toLowerCase();
            const contentDiv = document.getElementById("Pokes-Karten");
            const cards = contentDiv.querySelectorAll(".pokemon-card"); // Alle Karten auswählen
            let foundCards = [];
      
            cards.forEach((card) => {
              const originalText = card.innerText;
              const words = originalText.split(" ");
              const foundWords = words.filter((word) =>
                word.toLowerCase().includes(input)
              );
      
              if (foundWords.length > 0) {
                foundCards.push(card.innerHTML); // Füge den Inhalt der Karte hinzu
              }
            });
      
            if (foundCards.length > 0) {
              // Speichere die gefundenen Karten im localStorage
              localStorage.setItem("foundCards", JSON.stringify(foundCards));
              // Öffne das neue Dokument
              window.open("results.html", "_blank");
            } else {
              alert("Keine Karten mit Suchbegriffen gefunden.");
            }
          };
      
          //Hier Fouvoriten Karten im localstorage abgreifen
          function markAsFavorite(cardId) {
            // 1. LocalStorage abrufen und aktualisieren
            let likedCards = JSON.parse(localStorage.getItem("likedCards")) || []; // Leeres Array, wenn nichts gespeichert ist
            // 2. Überprüfen, ob die Karte bereits als Favorit markiert ist
      
            if (!likedCards.includes(cardId)) {
              // 3. Karte zur Favoritenliste hinzufügen
              likedCards.push(cardId); // Füge die cardId zur Liste hinzu
              localStorage.setItem('likedCards', JSON.stringify(likedCards)); // Speichern der aktualisierten Liste
              console.log(likedCards, 'Test');
              window.open("favourite.html", "_blank");
              // alert("Karte als Favorit markiert!"); // Oder eine andere Bestätigung
            } else {
              alert("Karte ist bereits ein Favorit.");
            }
          };
      