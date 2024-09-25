const orderModal = document.getElementById('order-modal');
const selectedTour = document.getElementById('selected-tour');
const tourNameInput = document.getElementById('tour-name'); 

function orderTour(tourName) {
  selectedTour.textContent = `Ви замовляєте тур: ${tourName}`;
  tourNameInput.value = tourName;
  orderModal.style.display = 'flex';
}

window.onclick = function(event) {
  if (event.target == orderModal) {
    orderModal.style.display = 'none';
  }
};

document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    tourName: formData.get('tourName')
  };

  fetch('YOUR_GOOGLE_SCRIPT_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(data => {
    alert('Ваше замовлення прийнято!');
    orderModal.style.display = 'none';
  })
  .catch(error => {
    alert('Помилка при замовленні, спробуйте ще раз.');
  });
});

function createTourCard(tour) {
  const card = document.createElement('div');
  card.classList.add('tour-card');

  const img = document.createElement('img');
  img.src = tour.tourImg;
  card.appendChild(img);

  const tourName = document.createElement('h3');
  tourName.textContent = tour.name;
  card.appendChild(tourName);

  const hotelInfo = document.createElement('p');
  hotelInfo.textContent = `${tour.hotelName} (${tour.hotelStars}★)`;
  card.appendChild(hotelInfo);

  const duration = document.createElement('p');
  duration.textContent = `Тривалість: ${tour.daysDuration} днів`;
  card.appendChild(duration);

  const rating = document.createElement('p');
  rating.textContent = `Рейтинг: ${tour.rate} (${tour.numOfReviews} відгуків)`;
  card.appendChild(rating);

  const price = document.createElement('p');
  if (tour.oldPrice) {
    price.innerHTML = `Ціна: <span class="old-price">$${tour.oldPrice}</span> <strong>$${tour.price}</strong>`;
  } else {
    price.innerHTML = `Ціна: <strong>$${tour.price}</strong>`;
  }
  card.appendChild(price);

  const orderButton = document.createElement('button');
  orderButton.classList.add('order-button');
  orderButton.textContent = 'Замовити';
  orderButton.onclick = () => orderTour(tour.name);
  card.appendChild(orderButton);

  return card;
}

const toursContainer = document.getElementById('tours-container');
tours.forEach(tour => {
  const tourCard = createTourCard(tour);
  toursContainer.appendChild(tourCard);
});
