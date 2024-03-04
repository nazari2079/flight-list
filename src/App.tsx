import type { FC } from "react";
import { useState } from "react";
import { FiltersType, FlightType } from "@/types";
import flights from "./data/flights.json";
import FlightList from "./components/FlightList";
import EmptyFlightList from "./components/EmptyFlightList";
import Filters from "./components/Filters";

const INITIAL_FILTERS: FiltersType = {
  airline: [],
  maxPrice: null,
  timeRange: "all",
};

const App: FC = () => {
  const [flightItems, setFlightItems] = useState<FlightType[]>(flights);
  const [filters, setFilters] = useState<FiltersType>(INITIAL_FILTERS);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setFlightItems(flights);
  };

  const applyFilters = <T extends keyof FiltersType>(
    key: T,
    value: FiltersType[T]
  ) => {
    const newFilters = { ...filters, [key]: value };
    let filteredFlights = [...flights];

    if (newFilters.airline.length) {
      filteredFlights = filteredFlights.filter((flight) =>
        newFilters.airline.includes(flight.airline)
      );
    }

    if (newFilters.maxPrice) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.price <= newFilters.maxPrice!
      );
    }

    if (newFilters.timeRange !== "all") {
      filteredFlights = filteredFlights.filter((flight) => {
        const flightHour = new Date(flight.flightTime).getHours();
        if (
          newFilters.timeRange === "morning" &&
          flightHour >= 6 &&
          flightHour < 12
        )
          return true;
        if (
          newFilters.timeRange === "noon" &&
          flightHour >= 12 &&
          flightHour < 18
        )
          return true;
        if (
          newFilters.timeRange === "night" &&
          flightHour >= 18 &&
          flightHour < 24
        )
          return true;
        if (
          newFilters.timeRange === "dawn" &&
          flightHour >= 0 &&
          flightHour < 6
        )
          return true;

        return false;
      });
    }

    setFilters(newFilters);
    setFlightItems(filteredFlights);
  };

  return (
    <div className="p-5">
      <Filters
        filters={filters}
        onResetFilters={resetFilters}
        onFilterChange={applyFilters}
      />
      {flightItems.length > 0 ? (
        <FlightList flights={flightItems} />
      ) : (
        <EmptyFlightList onResetFilters={resetFilters} />
      )}
    </div>
  );
};

export default App;
