import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hook";


const MyBarChart: React.FC = () => {
    const startDate = useAppSelector((state) => state.date.startDate);
    const endDate = useAppSelector((state) => state.date.endDate);
    const [data, setData] = useState([]);
    
    useEffect(() => {
      let url: URL;
      if (!startDate || !endDate) {
        url = new URL("http://localhost:8000/chart-data");
      } else {
        url = new URL("http://localhost:8000/chart-data-bydate");
        url.searchParams.append("start_date", startDate.toISOString().slice(0, 10));
        url.searchParams.append("end_date", endDate.toISOString().slice(0, 10));
      }

      fetch(url.toString(), {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Hiba a kérésben");
        return response.json();
      })
      .then((json) => {
        console.log("Kapott adat:", json);
        setData(json);
      })
      .catch((error) => {
        console.error("Hiba:", error);
      });


   
    

    
  }, [startDate, endDate]);

    const handleClick = (data, index) => {
        console.log('Kattintottál:', data);
        alert(`Nap: ${data.name}\nÉrték: ${data.érték}`);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" onClick={handleClick} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MyBarChart;
