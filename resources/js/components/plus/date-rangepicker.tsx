import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setRange } from '../../store/dateSlice';

const DateRangeSinglePicker: React.FC = () => {
    const dispatch = useAppDispatch();

    const [localStartDate, setLocalStartDate] = useState<Date | null>(null);
    const [localEndDate, setLocalEndDate] = useState<Date | null>(null);

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const handleDateChange = (update: [Date | null, Date | null]) => {
        setLocalStartDate(update[0]);
        setLocalEndDate(update[1]);
    };

    const handleTimeChange = (start: Date | null, end: Date | null) => {
        setStartTime(start);
        setEndTime(end);
    };

    // 💡 Mindig újratöltjük a merged dátumokat, amikor valami változik
    React.useEffect(() => {
        if (!localStartDate || !localEndDate) {
            // Ha nincs mindkettő, akkor null-t küldünk
            dispatch(setRange([null, null]));
            return;
        }

        const mergedStart = new Date(localStartDate);
        if (startTime) {
            mergedStart.setHours(startTime.getHours());
            mergedStart.setMinutes(startTime.getMinutes());
            mergedStart.setSeconds(startTime.getSeconds());
        } else {
            // Ha nincs startTime, akkor 00:00:00
            mergedStart.setHours(0);
            mergedStart.setMinutes(0);
            mergedStart.setSeconds(0);
        }

        const mergedEnd = new Date(localEndDate);
        if (endTime) {
            mergedEnd.setHours(endTime.getHours());
            mergedEnd.setMinutes(endTime.getMinutes());
            mergedEnd.setSeconds(endTime.getSeconds());
        } else {
            // Ha nincs startTime, akkor 00:00:00
            mergedEnd.setHours(0);
            mergedEnd.setMinutes(0);
            mergedEnd.setSeconds(0);
        }

        // Dispatch mindig lefut, ha mindkettő date megvan
        dispatch(setRange([mergedStart, mergedEnd]));
    }, [localStartDate, localEndDate, startTime, endTime]);

    return (
        <div className="flex gap-4">
            <DatePicker
                selectsRange
                startDate={localStartDate}
                endDate={localEndDate}
                onChange={handleDateChange}
                isClearable
                dateFormat="yyyy-MM-dd"
                placeholderText="Válassz intervallumot"
                className="rounded border p-2"
            />

            <DatePicker
                selected={startTime}
                onChange={(date) => handleTimeChange(date, endTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                isClearable
                timeCaption="Kezdés"
                dateFormat="HH:mm:ss"
                placeholderText="Kezdés idő"
                className="rounded border p-2"
            />

            <DatePicker
                selected={endTime}
                onChange={(date) => handleTimeChange(startTime, date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                isClearable
                timeCaption="Vége"
                dateFormat="HH:mm:ss"
                placeholderText="Vége idő"
                className="rounded border p-2"
            />
        </div>
    );
};

export default DateRangeSinglePicker;
