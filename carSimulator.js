class Car {
  constructor(brand, model, year, color, price, gas) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.price = price;
    this.gas = gas;
    this.distanceTraveled = 0;
  }

  honk() {
    console.log("Tuut tuut");
    console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Color: ${this.color}, Price: $${this.price}`);
  }

  loseGas(currentYear) {
    let yearsDifference = currentYear - this.year;
    let gasLoss = 5 + yearsDifference; // Base loss of 5 + additional loss for each year before current year
    this.gas -= gasLoss;
  }

  move(distance) {
    this.distanceTraveled += distance;
  }
}

const initialCars = [
  new Car('Honda', 'CR-V', 2023, 'Red', 50000, 45),
  new Car('Ford', 'F-150', 2020, 'Black', 25000, 30),
  new Car('BMW', 'X5', 2022, 'Green', 60000, 65),
  new Car('Mazda', 'CX-5', 2019, 'White', 15000, 60),
  new Car('Audi', 'Q7', 2018, 'Silver', 52000, 47),
  new Car('Kia', 'Forte', 2020, 'Blue', 21000, 56)
];

let cars = [];

function resetRace() {
  cars.forEach(car => {
    car.gas = initialCars.find(initialCar => initialCar.brand === car.brand).gas;
    car.distanceTraveled = 0;
    moveCar(document.getElementById(car.brand.toLowerCase()), 0);
  });
  document.getElementById('winner-info').innerText = '';
  displayCarInfo();
}

function displayCarInfo() {
  const carInfoContainer = document.getElementById('car-info');
  carInfoContainer.innerHTML = '';
  cars.forEach(car => {
    carInfoContainer.innerHTML += `<p>${car.brand} ${car.model}: Gas Remaining - ${car.gas} litres</p>`;
  });
}

function moveCar(carElement, distance) {
  carElement.style.left = distance + 'px';
}

function createCarElement(top, id, color, name) {
  const carElement = document.createElement('div');
  carElement.id = id;
  carElement.className = 'car';
  carElement.style.backgroundColor = color;
  carElement.style.top = top + 'px';
  const carName = document.createElement('div');
  carName.className = 'car-name';
  carName.innerText = name;
  carElement.appendChild(carName);
  return carElement;
}

function race() {
  resetRace();
  const raceTrack = document.getElementById('race-track');
  const raceTrackWidth = raceTrack.offsetWidth;
  const turns = 7;
  const distancePerTurn = raceTrackWidth / turns;
  let currentYear = new Date().getFullYear();

  cars.forEach((car, index) => {
    const carElement = document.getElementById(car.brand.toLowerCase());
    car.honk(); // invoking honk method for each car

    let interval = setInterval(() => {
      car.loseGas(currentYear);
      const currentPosition = parseInt(carElement.style.left) || 0;
      const distanceToMove = currentPosition + distancePerTurn;
      moveCar(carElement, distanceToMove);
      car.move(distancePerTurn);

      if (car.gas <= 0 || distanceToMove >= raceTrackWidth) {
        clearInterval(interval);
        console.log(`${car.brand} ${car.model} ran out of gas or reached the end of the track and is out of the race!`);
        displayCarInfo();
        checkWinner();
      }
    }, 1000); // Adjust the interval as needed
  });

  displayCarInfo();
}

function checkWinner() {
  const winner = cars.reduce((prev, current) => (prev.distanceTraveled > current.distanceTraveled) ? prev : current);
  document.getElementById('winner-info').innerText = `Winner: ${winner.brand} ${winner.model}`;
}

// Initialize cars array with initial data
initialCars.forEach(car => {
  const carElement = createCarElement(240 - (40 * cars.length), car.brand.toLowerCase(), car.color, `${car.brand} ${car.model}`);
  document.getElementById('race-track').appendChild(carElement);
  cars.push(new Car(car.brand, car.model, car.year, car.color, car.price, car.gas));
});

// Start the race when the button is clicked
document.getElementById('start-race-btn').addEventListener('click', race);
