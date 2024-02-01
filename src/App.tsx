import { Fragment, useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { Work } from "./Models/Work";
import { WorksTable } from "./Tables/WorksTable";
import { AggregationButtons } from "./Buttons/AggregationButtons";
import { WorkAggregatedByProject } from "./Models/Aggregations/WorkAggregatedByProject";
import { WorkAggregatedByProjectAndEmployee } from "./Models/Aggregations/WorkAggregatedByProjectAndEmployees";
import { WorksByProjectTable } from "./Tables/WorksByProjectTable";
import { WorksByEmployeesAndProjectTable } from "./Tables/WorksByEmployeesAndProjectTable";
import { WorksByProjectAndEmployeesTable } from "./Tables/WorksByProjectAndEmployeesTable";

function App() {
  const [works, setWorks] = useState<Work[]>([]);
  const [projectIds, setProjectIds] = useState<number[]>([]);
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
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

  const clearAllWorks = () => {
    setWorks([]);
    setWorksAggregatedByProject([]);
    setWorksAggregatedByProjectsAndEmployees([]);
    setWorksAggregatedByEmployeesAndProjects([]);
  };

  const findAllEmployeeWorks = () => {
    axios.get<Work[]>("http://localhost:3001/works").then((response) => {
      setWorks(response.data);
      setWorksAggregatedByProject([]);
      setWorksAggregatedByProjectsAndEmployees([]);
      setWorksAggregatedByEmployeesAndProjects([]);
    });
  };

  useEffect(() => {
    findAllEmployeeWorks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniqueProjectIds = useMemo(() => {
    const projectIds: number[] = works.map((work) => work.project.id);
    return projectIds.filter((element, index) => {
      return projectIds.indexOf(element) === index;
    });
  }, [works]);

  const uniqueEmployeeIds = useMemo(() => {
    const employeeIds: number[] = works.map((work) => work.employee.id);
    return employeeIds.filter((element, index) => {
      return employeeIds.indexOf(element) === index;
    });
  }, [works]);

  const mainPageEnabled = useMemo(() => {
    return (
      worksAggregatedByProject.length === 0 &&
      worksAggregatedByProjectsAndEmployees.length === 0 &&
      worksAggregatedByEmployeesAndProjects.length === 0
    );
  }, [
    worksAggregatedByProject,
    worksAggregatedByProjectsAndEmployees,
    worksAggregatedByEmployeesAndProjects,
  ]);

  useEffect(() => {
    setProjectIds(uniqueProjectIds);
    setEmployeeIds(uniqueEmployeeIds);
  }, [uniqueEmployeeIds, uniqueProjectIds]);

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
                clearAllWorks();
                findAllEmployeeWorks();
              }}
              variant="contained"
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
        <>
          {mainPageEnabled && <WorksTable works={works} />}
          {worksAggregatedByProject.length > 0 && (
            <WorksByProjectTable worksByProject={worksAggregatedByProject} />
          )}
          {worksAggregatedByProjectsAndEmployees.length > 0 && (
            <WorksByProjectAndEmployeesTable
              worksByProjectAndEmployees={worksAggregatedByProjectsAndEmployees}
            />
          )}
          {worksAggregatedByEmployeesAndProjects.length > 0 && (
            <WorksByEmployeesAndProjectTable
              worksByEmployeesAndProject={worksAggregatedByEmployeesAndProjects}
            />
          )}
          <AggregationButtons
            employeeIds={employeeIds}
            projectIds={projectIds}
            setWorksAggregatedByEmployeesAndProjects={
              setWorksAggregatedByEmployeesAndProjects
            }
            setWorksAggregatedByProject={setWorksAggregatedByProject}
            setWorksAggregatedByProjectsAndEmployees={
              setWorksAggregatedByProjectsAndEmployees
            }
          />
        </>
      </div>
    </Fragment>
  );
}

export default App;
