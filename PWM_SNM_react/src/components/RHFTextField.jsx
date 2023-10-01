import {Controller, useFormContext} from "react-hook-form";
import {TextField} from "@mui/material";

export default function RHFTextField({name, type, label}) {
    const {control} = useFormContext();

    return <Controller
        control={control}
        name={name}
        rules={{required: true}}
        render={({field, value}) => <TextField {...field} value={value} label={label} type={type}/>
        }
    />
}