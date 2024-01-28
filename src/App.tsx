import React, { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { Work } from "./models/Work";

function App() {
  const [works, setWorks] = useState<Work[]>([]);

  const findAllEmployeeWorks = () => {
    axios
      .get<Work[]>("http://localhost:3001/works")
      .then((response) => setWorks(response.data));
  };

  useEffect(() => {
    findAllEmployeeWorks();
  }, []);

  return (
    <Fragment>
      <div className="App-header">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <img src={logo} className="App-logo" alt="logo" />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h2">Employee Works Web Application</Typography>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth onClick={findAllEmployeeWorks} variant="contained">
              Refresh
            </Button>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

export default App;
