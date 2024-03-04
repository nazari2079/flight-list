import type { FC } from "react";

type Props = {
  onResetFilters: () => void;
};
const EmptyFlightList: FC<Props> = (props) => {
  const { onResetFilters } = props;

  return (
    <>
      <h1 className="mb-3 text-center">
        متاسفانه هیچ پروازی با فیلتر های مورد نظر پیدا نشد :(
      </h1>
      <button
        className="red-outline-button block mx-auto"
        onClick={onResetFilters}
      >
        حذف فیلتر ها
      </button>
    </>
  );
};

export default EmptyFlightList;
