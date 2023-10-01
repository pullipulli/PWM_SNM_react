import {Autocomplete, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

export default function RHFAutocomplete({name, options, label, getOptionLabel, isOptionEqualToValue, multiple}) {
    const {control} = useFormContext();
    return <Controller
        control={control}
        name={name}
        rules={{required: true}}
        render={
            ({field}) => {
                const {ref, onChange, onBlur, value, name} = field;
                //TODO bottoni seleziona tutto e deseleziona tutto
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