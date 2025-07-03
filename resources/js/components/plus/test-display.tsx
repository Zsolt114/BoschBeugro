import React from "react";
import { useAppSelector } from "../../hook";

const DateDisplay: React.FC = () => {
  const startDate = useAppSelector((state) => state.date.startDate);
  const endDate = useAppSelector((state) => state.date.endDate);
  const selectedMachine = useAppSelector((state) => state.machine.selectedMachine);

  return (
    <div>
      <p>Kezdő dátum: {startDate ? startDate.toDateString() : "Nincs"}</p>
      <p>Záró dátum: {endDate ? endDate.toDateString() : "Nincs"}</p>
       <p>{selectedMachine ? selectedMachine : "Nincs"}</p>
    </div>
  );
};

export default DateDisplay;