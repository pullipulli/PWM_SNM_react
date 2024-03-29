import {Controller, useFormContext} from "react-hook-form";
import {TextField} from "@mui/material";

export default function RHFTextField({name, type, label, required, multiline}) {
    const {control} = useFormContext();

    return <Controller
        control={control}
        name={name}
        rules={{required: required}}
        render={({field}) => <TextField {...field} value={field.value} multiline={multiline}
                                        label={label}
                                        type={type}/>
        }
    />
}