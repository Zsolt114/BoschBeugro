import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import DateRangeSinglePicker from '@/components/plus/date-rangepicker';
import SelectMachine from '@/components/plus/machine-select';
import TableDisplay from '@/components/plus/table-display';
import MyBarChart from '@/components/plus/Chart-display';

import { useAppDispatch, useAppSelector } from '../hook';
import { toggleComponent } from '../store/componentButtonBackToDesboardShowSlice';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const Charts = () => (
    <>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div>
                <DateRangeSinglePicker />
            </div>

            {/* Jobb oldali oszlop */}
            <div className="flex justify-end">
                <SelectMachine />
            </div>
        </div>

        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <MyBarChart />
        </div>
    </>
);
const Table = () => (
    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        <TableDisplay />
    </div>
);

export default function Dashboard() {
    const dispatch = useAppDispatch(); // Hozzáférés a dispatch-hez
    const showComponent = useAppSelector((state) => state.component.showComponent); // Redux állapot lekérdezése
    const handleToggle = () => {
        dispatch(toggleComponent()); // Akció dispatch-elése
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {showComponent ? '' : <button onClick={handleToggle}  className="bg-[#d97706] text-white rounded px-4 py-2 hover:bg-[#b45309] transition">Switch to {showComponent ? 'Table' : 'Dashboard'}</button>}
                {showComponent ? <Charts /> : <Table />}
            </div>
        </AppLayout>
    );
}
