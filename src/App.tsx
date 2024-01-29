import { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Work } from "./Models/Work";
import { WorksTable } from "./WorksTable/WorksTable";

function App() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const findAllEmployeeWorks = () => {
    axios.get<Work[]>("http://localhost:3001/works").then((response) => {
      setWorks(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    findAllEmployeeWorks();
  }, []);

  return (
    <Fragment>
      <div className="App-header">
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <img src={logo} className="App-logo" alt="logo" />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h2">Employee Works Web Application</Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              onClick={() => {
                setWorks([]);
                setLoading(true);
                findAllEmployeeWorks();
              }}
              variant="contained"
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
        {loading && works.length === 0 ? (
          <CircularProgress />
        ) : (
          <WorksTable works={works}/>
        )}
      </div>
    </Fragment>
  );
}

export default App;
