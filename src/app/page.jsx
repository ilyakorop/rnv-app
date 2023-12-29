"use client";
import Image from "next/image";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  Link,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/navigation";

import initialdata from "../../public/haltestellen.json";
import { filter, includes } from "lodash";

import { useCallback, useState } from "react";
const Home = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const isDesktop = useMediaQuery("(min-width:600px)");

  const router = useRouter();

  const handleSearch = useCallback(() => {
    setData(
      filter(initialdata, (item) =>
        includes(item.name.toLowerCase(), inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setData([]);
  }, []);

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Image
          className=""
          alt="logo"
          width={200}
          height={200}
          src="https://www.rnv-online.de/typo3conf/ext/rnv_site/Resources/Public/Images/rnv-logo.svg"
        />
      </div>
      <div className="flex items-center justify-center m-6 ">
        <TextField
          fullWidth
          placeholder="Enter address"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value.length === 0) {
              setData([]);
            }
          }}
          value={inputValue}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {inputValue.length > 0 && (
                  <IconButton
                    onClick={handleClear}
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="clear"
                  >
                    <ClearIcon />
                  </IconButton>
                )}

                <IconButton
                  onClick={handleSearch}
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        {!!data.length && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Coordinates</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className={isDesktop ? "" : "w-32"}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <List>
                        {row.poles.map((item) => (
                          <ListItem key={item.id}>
                            <Link
                              href={`https://www.google.com/maps/search/?api=1&query=${item.location.lat} ${item.location.long}`}
                              target="blank"
                            >
                              {item.location.lat}, {item.location.long}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};

export default Home;
