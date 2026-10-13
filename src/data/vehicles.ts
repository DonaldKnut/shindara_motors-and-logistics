/**
 * Vehicle inventory data layer.
 * Replace sample entries with verified listings before publishing as live inventory.
 * Set `isSample: false` only for confirmed real vehicles.
 */
export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  priceLabel: string;
  status: "Available" | "Reserved" | "Sold";
  isSample: boolean;
  image: {
    src: string;
    alt: string;
  };
};

export const vehicles: Vehicle[] = [
  {
    id: "sample-mercedes-c300",
    make: "Mercedes-Benz",
    model: "C 300",
    year: 2021,
    mileage: "28,400 km",
    transmission: "Automatic",
    fuel: "Petrol",
    priceLabel: "On request",
    status: "Available",
    isSample: true,
    image: {
      src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80",
      alt: "Sample listing imagery of a silver Mercedes-Benz sedan",
    },
  },
  {
    id: "sample-bmw-x5",
    make: "BMW",
    model: "X5",
    year: 2020,
    mileage: "41,200 km",
    transmission: "Automatic",
    fuel: "Petrol",
    priceLabel: "On request",
    status: "Available",
    isSample: true,
    image: {
      src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80",
      alt: "Sample listing imagery of a BMW SUV on a dark backdrop",
    },
  },
  {
    id: "sample-range-rover",
    make: "Land Rover",
    model: "Range Rover Sport",
    year: 2019,
    mileage: "52,800 km",
    transmission: "Automatic",
    fuel: "Diesel",
    priceLabel: "On request",
    status: "Available",
    isSample: true,
    image: {
      src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80",
      alt: "Sample listing imagery of a Range Rover on wet pavement",
    },
  },
  {
    id: "sample-toyota-landcruiser",
    make: "Toyota",
    model: "Land Cruiser Prado",
    year: 2022,
    mileage: "19,600 km",
    transmission: "Automatic",
    fuel: "Petrol",
    priceLabel: "On request",
    status: "Available",
    isSample: true,
    image: {
      src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80",
      alt: "Sample listing imagery of an SUV on an open road",
    },
  },
];

export const hasLiveInventory = vehicles.some((vehicle) => !vehicle.isSample);
