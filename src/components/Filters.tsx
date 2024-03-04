import { FiltersType } from "@/types";
import type { FC } from "react";
import flights from "../data/flights.json";
import { humanize } from "../utils";

type Props = {
  filters: FiltersType;
  onResetFilters: () => void;
  onFilterChange: <T extends keyof FiltersType>(
    key: T,
    value: FiltersType[T]
  ) => void;
};

const FILTER_COLUMN_CLASS = "flex flex-col space-y-2";
const TIME_RANGE_OPTIONS = [
  { label: "همه", value: "all" },
  { label: "صبح (6 تا 12)", value: "morning" },
  { label: "ظهر (12 تا 18)", value: "noon" },
  { label: "شب (18 تا 24)", value: "night" },
  { label: "بامداد (24 تا 6)", value: "dawn" },
];
const AIRLINES = [...new Set(flights.map((flight) => flight.airline))];
const MIN_PRICE = Math.min(...flights.map((flight) => flight.price));
const MAX_PRICE = Math.max(...flights.map((flight) => flight.price));

const Filters: FC<Props> = (props) => {
  const { filters, onResetFilters, onFilterChange } = props;

  const onAirlineChange = (airline: string, checked: boolean) => {
    onFilterChange(
      "airline",
      checked
        ? [...filters.airline, airline]
        : filters.airline.filter((item) => item !== airline)
    );
  };

  return (
    <div className="border border-gray-200 rounded-xl mb-5 p-4">
      <div className="flex flex-wrap gap-4 mb-2 justify-between">
        <div className={FILTER_COLUMN_CLASS}>
          <div>ایرلاین:</div>
          {AIRLINES.map((airline) => (
            <label
              key={airline}
              className="flex items-center text-sm last:mb-0"
            >
              <input
                className="ml-2"
                type="checkbox"
                checked={filters.airline.includes(airline)}
                onChange={(e) =>
                  onAirlineChange(airline, e.currentTarget.checked)
                }
                data-testid={`airline-checkbox-${airline}`}
              />
              <span>{airline}</span>
            </label>
          ))}
        </div>
        <div className={FILTER_COLUMN_CLASS}>
          <label htmlFor="max-price" className="flex justify-between">
            <span>حداکثر قیمت:</span>
            <span>{humanize(filters.maxPrice || MAX_PRICE)} تومان</span>
          </label>
          <input
            type="range"
            id="max-price"
            data-testid="max-price-filter"
            className="w-[350px]"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10000}
            value={filters.maxPrice || MAX_PRICE}
            // we can improve thie by using debounce
            onChange={(e) =>
              onFilterChange("maxPrice", Number(e.currentTarget.value))
            }
          />
          <div className="flex items-center justify-between text-sm">
            <div>کمترین: {humanize(MIN_PRICE)}</div>
            <div>بیشترین: {humanize(MAX_PRICE)}</div>
          </div>
        </div>
        <div className={FILTER_COLUMN_CLASS}>
          <label htmlFor="time-range">ساعت پرواز:</label>
          <select
            id="time-range"
            className="w-[200px] text-sm"
            value={filters.timeRange}
            onChange={(e) => onFilterChange("timeRange", e.currentTarget.value)}
          >
            {TIME_RANGE_OPTIONS.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="red-outline-button block mx-auto"
        onClick={onResetFilters}
      >
        حذف فیلتر ها
      </button>
    </div>
  );
};

export default Filters;
