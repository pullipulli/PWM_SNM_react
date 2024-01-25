import {useEffect, useState} from "react";
import {Input} from "@mui/material";

export default function SearchBar({filterFunction, placheholder = "Search..."}) {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        filterFunction(searchInput);
    }, [searchInput]);

    return <Input
        type="text"
        placeholder={placheholder}
        onChange={handleChange}
        value={searchInput}
        fullWidth
    />;
}