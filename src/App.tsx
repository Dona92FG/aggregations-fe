import { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Work } from "./models/Work";

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
          <>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Project</TableCell>
                        <TableCell align="center">Employee</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Hours</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {works.map((row) => {
                        const rowName: string = (Math.random() + 1)
                          .toString(36)
                          .substring(7);
                        return (
                          <TableRow
                            key={rowName}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              {row.project.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.employee.name}
                            </TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.hours}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid container spacing={5} alignItems="center" alignContent="center" style={{marginTop: 0, flexDirection: 'column'}}>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  onClick={() => {
                    console.log("1st button clicked");
                  }}
                  variant="contained"
                >
                  Aggregate by projects
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  onClick={() => {
                    console.log("2nd button clicked");
                  }}
                  variant="contained"
                >
                  Aggregate by employee and projects
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  onClick={() => {
                    console.log("3rd button clicked");
                  }}
                  variant="contained"
                >
                  Aggregate by projects and employee
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </Fragment>
  );
}

export default App;
