import React from "react";
import { useAppSelector } from "../../hook";

const DateDisplay: React.FC = () => {
  const startDate = useAppSelector((state) => state.date.startDate);
  const endDate = useAppSelector((state) => state.date.endDate);

  return (
    <div>
      <p>Kezdő dátum: {startDate ? startDate.toDateString() : "Nincs"}</p>
      <p>Záró dátum: {endDate ? endDate.toDateString() : "Nincs"}</p>
    </div>
  );
};

export default DateDisplay;