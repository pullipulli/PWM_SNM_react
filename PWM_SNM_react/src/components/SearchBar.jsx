import {useEffect, useState} from "react";
import {Input} from "@mui/material";

export default function SearchBar({filterFunction, placeholder = "Search...", ...other}) {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        filterFunction(searchInput);
    }, [searchInput]);

    return <Input
        {...other}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={searchInput}
        fullWidth
    />;
}