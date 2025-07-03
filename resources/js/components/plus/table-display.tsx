import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hook';

const invoices = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
];

export default function TableDisplay() {
        const startDate = useAppSelector((state) => state.date.startDate);
        const endDate = useAppSelector((state) => state.date.endDate);
        const selectedMachine = useAppSelector((state) => state.machine.selectedMachine);
        const tableShowSlice = useAppSelector((state) => state.tableShowSlice.tableShowSlice);
    
        const [data, setData] = useState([]);
    
    
        useEffect(() => {
            let url: URL;
            if (!startDate || !endDate) {
                url = new URL('http://localhost:8000/api/table-data');
                console.log(selectedMachine);
                url.searchParams.append('selectedMachine', selectedMachine !== null ? selectedMachine : 'all');
                url.searchParams.append('productname', tableShowSlice !== null ? tableShowSlice : '');
            } else {
                url = new URL('http://localhost:8000/api/table-data-bydate');
                url.searchParams.append('selectedMachine', selectedMachine !== null ? selectedMachine : 'all');
                url.searchParams.append('productname', tableShowSlice !== null ? tableShowSlice : '');
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
                    console.log('Kapott adat:', json);
                    setData(json);
                })
                .catch((error) => {
                    console.error('Hiba:', error);
                });
        }, []);

    return (
        <>
            <h1>{selectedMachine ? selectedMachine : 'All'}</h1>
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
