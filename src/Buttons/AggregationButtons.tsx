import { Grid, Button } from "@mui/material";
import { FC } from "react";
import { Work } from "../Models/Work";
import axios from "axios";
import { WorkAggregatedByProject } from "../Models/Aggregations/WorkAggregatedByProject";
import { WorkAggregatedByProjectAndEmployee } from "../Models/Aggregations/WorkAggregatedByProjectAndEmployees";

interface AggregationButtonsProps {
  projectIds: number[];
  employeeIds: number[];
  setWorks: React.Dispatch<React.SetStateAction<Work[]>>;
  setWorksAggregatedByProject: React.Dispatch<
    React.SetStateAction<WorkAggregatedByProject[]>
  >;
  setWorksAggregatedByProjectsAndEmployees: React.Dispatch<
    React.SetStateAction<WorkAggregatedByProjectAndEmployee[]>
  >;
  setWorksAggregatedByEmployeesAndProjects: React.Dispatch<
    React.SetStateAction<WorkAggregatedByProjectAndEmployee[]>
  >;
}

export const AggregationButtons: FC<AggregationButtonsProps> = (props) => {
  const {
    projectIds,
    employeeIds,
    setWorks,
    setWorksAggregatedByProject,
    setWorksAggregatedByProjectsAndEmployees,
    setWorksAggregatedByEmployeesAndProjects,
  } = props;

  const findWorksAggregatedByProjects = () => {
    const projectIdsQueryString: string = projectIds.join(",");
    axios
      .get<WorkAggregatedByProject[]>(
        "http://localhost:3001/works/byProjects",
        {
          params: { projectIds: projectIdsQueryString },
        }
      )
      .then((response) => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", projectIds);
        setWorksAggregatedByProject(response.data);
        setWorksAggregatedByProjectsAndEmployees([]);
        setWorksAggregatedByEmployeesAndProjects([]);
        setWorks([]);
      });
  };

  const findWorksAggregatedByProjectsAndEmployees = () => {
    const projectIdsQueryString: string = projectIds.join(",");
    const employeeIdsQueryString: string = employeeIds.join(",");
    axios
      .get<WorkAggregatedByProjectAndEmployee[]>(
        "http://localhost:3001/works/byProjectsAndEmployees",
        {
          params: {
            projectIds: projectIdsQueryString,
            employeeIds: employeeIdsQueryString,
          },
        }
      )
      .then((response) => {
        setWorksAggregatedByProject([]);
        setWorksAggregatedByProjectsAndEmployees(response.data);
        setWorksAggregatedByEmployeesAndProjects([]);
        setWorks([]);
      });
  };

  const findWorksAggregatedByEmployeesAndProjects = () => {
    const projectIdsQueryString: string = projectIds.join(",");
    const employeeIdsQueryString: string = employeeIds.join(",");
    axios
      .get<WorkAggregatedByProjectAndEmployee[]>(
        "http://localhost:3001/works/byEmployeesAndProjects",
        {
          params: {
            projectIds: projectIdsQueryString,
            employeeIds: employeeIdsQueryString,
          },
        }
      )
      .then((response) => {
        setWorksAggregatedByProject([]);
        setWorksAggregatedByProjectsAndEmployees([]);
        setWorksAggregatedByEmployeesAndProjects(response.data);
        setWorks([]);
      });
  };

  return (
    <Grid
      container
      spacing={5}
      alignItems="center"
      alignContent="center"
      style={{ marginTop: 0, flexDirection: "column" }}
    >
      <Grid item xs={3}>
        <Button
          fullWidth
          onClick={() => {
            findWorksAggregatedByProjects();
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
            findWorksAggregatedByEmployeesAndProjects();
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
            findWorksAggregatedByProjectsAndEmployees();
          }}
          variant="contained"
        >
          Aggregate by projects and employee
        </Button>
      </Grid>
    </Grid>
  );
};