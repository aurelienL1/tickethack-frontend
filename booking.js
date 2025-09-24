fetch("http://localhost:3000/bookings", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const { booking } = data;
    const { trips } = booking;
    for (let trip of trips) {
    document.querySelector("#no-booking").remove();
      const datereform = new Date(trip.date);
      const min = datereform.getMinutes();
      const hour = datereform.getHours();
      document.querySelector("#booking-container").innerHTML += `
        <div class="booking">
              <p class="description">${trip.departure} > ${trip.arrival}</p>
              <p class="date">${hour}:${min}</p>
              <p class="price">${trip.price}€</p>
              </div>
              `;
    }
    document.querySelector("#booking-container").innerHTML += `Enjoy your travel with Tickethack`
  });
