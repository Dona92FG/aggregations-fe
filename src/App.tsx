import { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Work } from "./Models/Work";
import { WorksTable } from "./Tables/WorksTable";
import { AggregationButtons } from "./Buttons/AggregationButtons";
import { WorkAggregatedByProject } from "./Models/Aggregations/WorkAggregatedByProject";
import { WorkAggregatedByProjectAndEmployee } from "./Models/Aggregations/WorkAggregatedByProjectAndEmployees";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [works, setWorks] = useState<Work[]>([]);
  const [worksAggregatedByProject, setWorksAggregatedByProject] = useState<
    WorkAggregatedByProject[]
  >([]);
  const [
    worksAggregatedByProjectsAndEmployees,
    setWorksAggregatedByProjectsAndEmployees,
  ] = useState<WorkAggregatedByProjectAndEmployee[]>([]);
  const [
    worksAggregatedByEmployeesAndProjects,
    setWorksAggregatedByEmployeesAndProjects,
  ] = useState<WorkAggregatedByProjectAndEmployee[]>([]);
  const findAllEmployeeWorks = () => {
    axios.get<Work[]>("http://localhost:3001/works").then((response) => {
      setWorks(response.data);
      setWorksAggregatedByProject([]);
      setWorksAggregatedByProjectsAndEmployees([]);
      setWorksAggregatedByEmployeesAndProjects([]);
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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {works.length > 0 && <WorksTable works={works} />}
            {worksAggregatedByProject.length > 0 && <>BRAVO 0</>}
            {worksAggregatedByProjectsAndEmployees.length > 0 && <>BRAVO 1</>}
            {worksAggregatedByEmployeesAndProjects.length > 0 && <>BRAVO 2</>}
            <AggregationButtons
              works={works}
              setWorks={setWorks}
              setWorksAggregatedByEmployeesAndProjects={
                setWorksAggregatedByEmployeesAndProjects
              }
              setWorksAggregatedByProject={setWorksAggregatedByProject}
              setWorksAggregatedByProjectsAndEmployees={
                setWorksAggregatedByProjectsAndEmployees
              }
            />
          </>
        )}
      </div>
    </Fragment>
  );
}

export default App;
