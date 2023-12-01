import { Dispatch, FC, SetStateAction, useState } from 'react';
import range from 'lodash/range';
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

interface AmountProps extends SelectProps {
    amount: number;
    actionSlug: string;
    defaultValue: string | number;
    labelText: string;
    updateFunction: Dispatch<SetStateAction<number>>;
    startAtZero?: boolean;
}

const Amount: FC<AmountProps> = ({
    amount,
    actionSlug,
    updateFunction,
    defaultValue,
    labelText,
    startAtZero,
    ...selectProps
}) => {
    const [value, setValue] = useState(defaultValue);

    const renderMenuItem = (index: number) => {
        return (
            <MenuItem key={`${actionSlug}-select-${index}`} value={startAtZero ? index : index + 1}>
                {index + 1}
            </MenuItem>
        );
    };

    return (
        <div className="inventory-amount-container">
            <FormControl fullWidth>
                <InputLabel id={`${actionSlug}-amount-label`}>{labelText}</InputLabel>
                <Select
                    {...selectProps}
                    color="secondary"
                    id={`${actionSlug}-amount-select`}
                    label={labelText}
                    labelId={`${actionSlug}-amount-label`}
                    MenuProps={{ className: 'MuiMenu-colorSecondary' }}
                    onChange={(event) => {
                        updateFunction((event?.target.value as unknown) as number);
                        setValue(event?.target.value as string);
                    }}
                    size="small"
                    value={value as string}
                >
                    {range(amount).map(renderMenuItem)}
                </Select>
            </FormControl>
        </div>
    );
};

export default Amount;
