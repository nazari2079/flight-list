import { FlightType } from "@/types";
import { humanize } from "../utils";
// moment jalaali is only used to show formated date to user
import moment from "moment-jalaali";
import type { FC } from "react";
import { useState, useMemo } from "react";

type Props = {
  flights: FlightType[];
};

const SORT_OPTIONS = [
  { label: "زودترین زمان حرکت", value: "earliestFlight" },
  { label: "کمترین قیمت", value: "lowestPrice" },
];

const FlightList: FC<Props> = (props) => {
  const { flights } = props;
  const [sortValue, setSortValue] = useState(SORT_OPTIONS[0].value);

  const sortedFlights = useMemo(() => {
    if (sortValue === "lowestPrice")
      return flights.sort((a, b) => a.price - b.price);
    if (sortValue === "earliestFlight")
      return flights.sort(
        (a, b) =>
          new Date(a.flightTime).getTime() - new Date(b.flightTime).getTime()
      );
    return [];
  }, [sortValue, flights]);

  return (
    <>
      <div className="flex items-center justify-end mb-3 text-sm">
        <label htmlFor="sort">
          <span>مرتب سازی پرواز ها:</span>
        </label>
        <select
          id="sort"
          className="mr-2 w-[200px]"
          value={sortValue}
          onChange={(e) => setSortValue(e.currentTarget.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {sortedFlights.map((flight) => (
          <div
            key={flight.id}
            className="p-3 grow hover:shadow-2xl transition min-w-[300px] shadow-lg rounded-xl"
          >
            <div data-testid="flight-airline-name">
              ایرلاین: {flight.airline}
            </div>
            <div data-testid="flight-price">قیمت: {humanize(flight.price)}</div>
            <div>
              زمان پرواز:{" "}
              {moment(flight.flightTime).format("jYYYY/jMM/jDD - HH:mm")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlightList;
