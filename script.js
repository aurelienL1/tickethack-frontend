document.querySelector("#search").addEventListener("click", async function () {
  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const tripDate = new Date(document.querySelector("#trip-date").value);

  try {
    const response = await fetch(`http://localhost:3000/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ departure, arrival, date: tripDate }),
    });
    const data = await response.json();
    console.log("data", data);
    const { trips } = data;
    // Cas ou il n'y a aucun trajet pour la recherche
    if (trips.length === 0) {
      document.querySelector("#img-search").src = "./images/notfound.png";
      document.querySelector("#results > h3").textContent = "No trip found.";
    }

    if (trips.length > 0) {
      document.querySelector("#results").remove();

      for (const trip of trips) {
        const { departure, arrival, date, price } = trip;
        document.querySelector(".list-trip").innerHTML += `<div id="results">
            <div class="trip">
              <div id="travel">${departure} > ${arrival}</div>
              <div id="hour">${date}</div>
              <div id="price">${price}€</div>
              <button class="book-button" type="button" id="book">Book</button>
            </div>
          </div>
        `;
      }
    }
  } catch (error) {}
});
