function getCart() {
  return fetch("http://localhost:3000/cart", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
}

getCart().then(async (data) => {
  {
    const { cart } = data;
    const { trips } = cart;
    console.log(trips);
    if (trips.length > 0) {
      let total = getTotal(trips);
      document.querySelector("#no-cart").remove();
      document.querySelector("#cart-container").innerHTML += `<h3>My cart</h3>`;
      for (const trip of trips) {
        document.querySelector("#cart-container").innerHTML += `
              <div class="travel">
              <p class="description">${trip.departure} > ${trip.arrival}</p>
              <p class="date">${trip.date}</p>
              <p class="price">${trip.price}€</p>
              <button class="delete" type="button">X</button>
            </div>
              `;
      }
      document.querySelector("#cart-container").innerHTML += ` 
      <div id="total">
          <p>Total: ${total}€</p>
          <button class="purchase-button" type="button" id="purchase">Purchase</button>
        </div>`;
      await updateDeleteTripEventListener(trips);
    }
  }
});

function getTotal(trips) {
  let total = 0;
  for (const trip of trips) {
    total += trip.price;
  }
  return total;
}

async function updateDeleteTripEventListener(trips) {
  const deleteButtons = document.querySelectorAll(".delete");
  console.log(deleteButtons);
  let total = getTotal(trips);
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", async function () {
      const response = await fetch(`http://localhost:3000/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: trips[i]._id }),
      });
      const data = await response.json();
      console.log("data", data);
      if (data.result) {
        total -= trips[i].price;
        deleteButtons[i].parentNode.remove();
        document.querySelector("#total > p").textContent = total.toString() + "€";
      }
    });
  }
}
