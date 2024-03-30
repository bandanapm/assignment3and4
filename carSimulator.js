class Car {
  constructor(brand, model, year, color, price, gas) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.price = price;
    this.gas = gas;
  }

  honk() {
    console.log("Tuut tuut");
    console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Color: ${this.color}, Price: ${this.price}, Gas: ${this.gas} litres`);
    const carInfo = document.getElementById("carInfo");
    carInfo.innerHTML += `<p>${this.brand} ${this.model} (Year: ${this.year}) - Remaining Gas: ${this.gas} litres</p>`;
  }

  loseGas(turns) {
    let gasLoss = 5; // Base gas loss per turn
    const currentYear = new Date().getFullYear();
    if (currentYear > this.year) {
      gasLoss += currentYear - this.year; // Additional gas loss for each year the car is older
    }

    for (let i = 0; i < turns; i++) {
      this.gas -= gasLoss;
    }
  }
}

// Create Car objects
const cars = [
  new Car("Honda", "CR-V", 2023, "Red", 50000, 45),
  new Car("Ford", "F-150", 2020, "Black", 25000, 30),
  new Car("BMW", "X5", 2022, "Green", 60000, 65),
  new Car("Mazda", "CX-5", 2019, "White", 15000, 60),
  new Car("Audi", "Q7", 2018, "Silver", 52000, 47),
  new Car("Kia", "Forte", 2020, "Blue", 21000, 56)
];

// Function to start the race simulation
document.getElementById("startButton").addEventListener("click", startRace);

function startRace() {
  const turns = 7;
  const carInfo = document.getElementById("carInfo");
  carInfo.innerHTML = ""; // Clear previous race info

  for (const car of cars) {
    car.honk();
  }

  setTimeout(function () {
    carInfo.innerHTML = "<h2>Race Simulation Results</h2>"; // Clear previous race info and start race simulation
    for (const car of cars) {
      car.loseGas(turns);
      car.honk();
    }
  }, 1000); // Delay the race simulation by 1 second (1000 milliseconds)
}
