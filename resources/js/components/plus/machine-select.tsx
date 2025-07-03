import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';
import { Select } from 'radix-ui';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from "../../hook";
import {  setSelectedMachine } from "../../store/machineSlice";

const SelectMachine: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedMachine = useAppSelector((state) => state.machine.selectedMachine);
    

    const [data, setData] = React.useState([]);
   
	






	

    const handleValueChange = (value: string) => {
        dispatch(setSelectedMachine(value));
        console.log('Redux-ban tárolt gép:', value);
    };
    return (
        <Select.Root value={selectedMachine} onValueChange={handleValueChange}>
            <Select.Trigger
                className="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-amber-600 px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                aria-label="Food"
            >
                <Select.Value placeholder="All" />
                <Select.Icon className="text-violet11">
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="overflow-hidden rounded-md bg-amber-600 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                    <Select.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-amber-600">
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-[5px]">
                        <Select.Group>
                            <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">Machines</Select.Label>
                            <SelectItem value="All">All</SelectItem>

                            {data.map((machinedata) => (
                                <SelectItem key={machinedata.machine} value={machinedata.machine}>
                                    {machinedata.machine}
                                </SelectItem>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-amber-600">
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};
const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item
            className={classnames(
                'text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 relative flex h-[25px] items-center rounded-[3px] pr-[35px] pl-[25px] text-[13px] leading-none select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none',
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export default SelectMachine;
