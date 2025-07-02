import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "../../hook";
import { setRange } from "../../store/dateSlice";

const DateRangeSinglePicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.date.startDate);
  const endDate = useAppSelector((state) => state.date.endDate);

  const handleChange = (update: [Date | null, Date | null]) => {
    dispatch(setRange(update));
  };

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      isClearable={true}
      dateFormat="yyyy-MM-dd"
      placeholderText="Válassz intervallumot"
    />
  );
};

export default DateRangeSinglePicker;