import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("render app correctly", () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test("only show IranAir flights when only IranAir selected in airlines filter", async () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("airline-checkbox-IranAir"));
  const flightAirlineNames = await screen.getAllByTestId("flight-airline-name");

  expect(
    flightAirlineNames.every(
      (airlineNameElement) =>
        airlineNameElement.textContent === "ایرلاین: IranAir"
    )
  ).toBeTruthy();
});

test("dont't show flights with 12,000,000 price when max price filter is 11,000,000", async () => {
  render(<App />);

  fireEvent.change(screen.getByTestId("max-price-filter"), {
    target: {
      value: 11000000,
    },
  });
  const flightPrices = await screen
    .getAllByTestId("flight-price")
    .map((priceElement) => {
      const priceText = priceElement.textContent?.split(":")[1].trim();
      return Number(priceText!.split(",").join(""));
    });

  expect(flightPrices.every((price) => price <= 11000000)).toBeTruthy();
});
