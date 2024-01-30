import {Autocomplete, Button, TextField, Stack} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import {Controller, useFormContext} from "react-hook-form";

export default function RHFAutocomplete({
                                            name,
                                            options,
                                            label,
                                            getOptionLabel,
                                            isOptionEqualToValue,
                                            multiple,
                                            defaultValue,
                                            required,
                                            renderOption,
                                        }) {
    const {control} = useFormContext();

    return <Controller
        control={control}
        name={name}
        rules={{required: required}}
        render={
            ({field}) => {
                const {ref, onChange, onBlur, value, name} = field;
                return <Autocomplete options={options || []}
                                     getOptionLabel={getOptionLabel}
                                     multiple={multiple}
                                     isOptionEqualToValue={isOptionEqualToValue}
                                     onChange={(event, selectedOptions) => {
                                         onChange(selectedOptions);
                                     }}
                                     ref={ref}
                                     onBlur={onBlur}
                                     value={value || []}
                                     name={name}
                                     renderOption={renderOption}
                                     renderInput={(params) => (
                                         <TextField
                                             {...params}
                                             variant="standard"
                                             label={label}
                                         />
                                     )}
                    />
            }
        }
    />
}