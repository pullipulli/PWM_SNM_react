import {Controller, useFormContext} from "react-hook-form";
import {Stack, Switch, Typography} from "@mui/material";

export default function RHFSwitch({name, labelOn, labelOff, required}) {
    const {control} = useFormContext();

    return <Controller
        control={control}
        name={name}
        rules={{required: required}}
        render={({field: {onChange, value, name, onBlur, disabled, ref}}) => {
            return <Stack direction="row">
                <Typography>{labelOff}</Typography>
                <Switch value={value} onChange={onChange} name={name} onBlur={onBlur}
                        disabled={disabled} ref={ref}/>
                <Typography>{labelOn}</Typography>
            </Stack>
        }}
    />
}