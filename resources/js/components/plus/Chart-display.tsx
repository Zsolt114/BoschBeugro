import { tableShowSlice } from '@/store/tableShowSlice';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { toggleComponent } from '../../store/componentButtonBackToDesboardShowSlice';

const MyBarChart: React.FC = () => {
    const dispatch = useAppDispatch();

    const startDate = useAppSelector((state) => state.date.startDate);
    const endDate = useAppSelector((state) => state.date.endDate);
    const selectedMachine = useAppSelector((state) => state.machine.selectedMachine);
    const { settableShowSlice } = tableShowSlice.actions;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url: URL;
                if (!startDate || !endDate) {
                    url = new URL('http://localhost:8000/api/chart-data');
                    url.searchParams.append('selectedMachine', selectedMachine !== null ? selectedMachine : 'all');
                } else {
                    url = new URL('http://localhost:8000/api/chart-data-bydate');
                    url.searchParams.append('selectedMachine', selectedMachine !== null ? selectedMachine : 'all');
                    url.searchParams.append('start_date', startDate.toISOString().slice(0, 10));
                    url.searchParams.append('end_date', endDate.toISOString().slice(0, 10));
                }

                fetch(url.toString(), {
                    method: 'GET',
                })
                    .then((response) => {
                        if (!response.ok) throw new Error('Hiba a kérésben');
                        return response.json();
                    })
                    .then((json) => {
                        setData(json);
                    })
                    .catch((error) => {
                        console.error('Hiba:', error);
                    });
            } catch (error) {
                console.error('Hiba:', error);
            }
        };
        fetchData();
    }, [startDate, endDate, selectedMachine]);

    const handleClick = (data) => {
        dispatch(settableShowSlice(data.product_name));
        dispatch(toggleComponent());
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product_name" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#64748b', color: '#ffffff' }} />
                <Legend />
                <Bar dataKey="count" fill="#d97706" onClick={handleClick} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MyBarChart;
