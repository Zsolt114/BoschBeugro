import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hook';

export default function TableDisplay() {
    const startDate = useAppSelector((state) => state.date.startDate);
    const endDate = useAppSelector((state) => state.date.endDate);
    const selectedMachine = useAppSelector((state) => state.machine.selectedMachine);
    const tableShowSlice = useAppSelector((state) => state.tableShowSlice.tableShowSlice);

    const [data, setData] = useState([]);
    const [tableHeadingData, setTableHeadingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = new URL('http://localhost:8000/api/' + (startDate && endDate ? 'table-data-bydate' : 'table-data'));

                url.searchParams.append('selectedMachine', selectedMachine !== null ? selectedMachine : 'all');
                url.searchParams.append('productname', tableShowSlice !== null ? tableShowSlice : '');
                if (startDate && endDate) {
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

        const fetchTableHeadingData = async () => {
            try {
                const url = new URL('http://localhost:8000/api/table-heading');

                if (selectedMachine === null || selectedMachine.toLowerCase() === 'all') {
                    return; // Visszatérés, ha null vagy 'all'
                } else {
                    url.searchParams.append('selectedMachine', selectedMachine);
                }

                fetch(url.toString(), {
                    method: 'GET',
                })
                    .then((response) => {
                        if (!response.ok) throw new Error('Hiba a kérésben');
                        return response.json();
                    })
                    .then((json) => {
                        setTableHeadingData(json);
                    })
                    .catch((error) => {
                        console.error('Hiba:', error);
                    });
            } catch (error) {
                console.error('Hiba:', error);
            }
        };
        fetchData();
        fetchTableHeadingData();
    }, []);

    return (
        <>
            <h1 className="ml-5 border-l-4 border-orange-500 pl-3">
                {selectedMachine === 'all' || !selectedMachine
                    ? 'All'
                    : tableHeadingData?.[0]
                      ? `${tableHeadingData[0].machine_name} - ${tableHeadingData[0].location} (${new Date(tableHeadingData[0].installation_date).toLocaleDateString()}, ${tableHeadingData[0].status})`
                      : selectedMachine}
            </h1>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product_name</TableHead>
                        <TableHead>Type_number</TableHead>
                        <TableHead>Event date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell className="font-medium">{data.product_name}</TableCell>
                            <TableCell>{data.type_number}</TableCell>
                            <TableCell>{data.event_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
