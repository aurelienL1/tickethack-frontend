fetch("http://localhost:3000/cart", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    const { cart } = data;
    const { trips } = cart;
    for (const trip of trips) {
      console.log(trip);
      document.querySelector("#cart-container").innerHTML += `
            <div class="travel">
            <p class="description">${trip.departure} > ${trip.arrival}</p>
            <p class="date">${trip.date}</p>
            <p class="price">${trip.price}€</p>
            <button class="delete" type="button">X</button>
          </div>
            `;
      updateDeleteTripEventListener(trip);
    }
  });

function updateDeleteTripEventListener(trip) {
  const deleteButtons = document.querySelectorAll(".delete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      fetch(`http://localhost:3000/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: trip._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            this.parentNode.remove();
          }
        });
    });
  }
}
