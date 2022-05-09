import {
  IconButton,
  Paper,
  Table,
  LinearProgress,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import groups from "../../data/grouped_findings.json";
import rows from "../../data/raw_findings.json";
import { styled } from "@mui/material/styles";
import colors from "../../helper/colorHash";

// const groups = groupFindings;
// const rows = rawFindings;

const RawFindingsTable = ({ expandibleRows }) => {
  // console.log("expandibleRows---> ", expandibleRows);
  return;
};

const GroupFindingsTable = ({ groups, index, rows }) => {
  const [expand, setExpand] = useState(false);
  let rowFindings = rows.filter(
    (row) => index + 1 === row.properties.grouped_finding_id
  );

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <DataCells>
          <Badge variant="div" component="div" groups={groups} colors={colors}>
            {groups.severity}
          </Badge>
        </DataCells>
        <DataCells>{groups.grouped_finding_created}</DataCells>
        <DataCells>{groups.sla}</DataCells>
        <DataCells>{groups.description}</DataCells>
        <DataCells>{groups.security_analyst}</DataCells>
        <DataCells>{groups.owner}</DataCells>
        <DataCells>{groups.workflow}</DataCells>
        <DataCells>
          <ProgressBadgeContainer variant="div" component="div">
            {groups.status === "in_progress" ? (
              <LinearProgress
                variant="determinate"
                value={groups.progress * 100}
                sx={{ width: "100%" }}
              />
            ) : (
              <ProgressBadge variant="div" component="div" color={colors.low}>
                {groups.status}
              </ProgressBadge>
            )}
          </ProgressBadgeContainer>
        </DataCells>
        <DataCells>
          <Badge
            variant="div"
            component="div"
            width={35}
            height={35}
            colors={colors.low}
          >
            {rowFindings.length}
          </Badge>
        </DataCells>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <RawFindingsTable expandibleRows={rowFindings} />
        </TableCell>
      </TableRow>
    </>
  );
};

const CreateTable = () => {
  const headings = [
    "",
    "Severity",
    "Time",
    "SLA",
    "Description",
    "Security Analyst",
    "Owner",
    "Workflow",
    "Status",
    "# of Findings",
    "Communications",
    "Action",
  ];

  return (
    <ContainerTable component={Paper}>
      <Table aria-label="collapsible table" stickyHeader={true}>
      <TableHeding variant="h6" component="h6">
        Grouped Findings
      </TableHeding>
        <TableHead>
          <TableRow>
            {headings.map((heading, idx) => (
              <HeadingCell key={`${heading}${idx}`}>
                {heading.toLocaleUpperCase()}
              </HeadingCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.features.map((group, idx) => (
            <GroupFindingsTable
              key={`group${idx}`}
              groups={group.properties}
              index={idx}
              rows={rows.features}
            />
          ))}
        </TableBody>
      </Table>
    </ContainerTable>
  );
};

const DataCells = styled(TableCell)`
  color: #9dabb1;
  font-size: 13px;
`;
const HeadingCell = styled(TableCell)`
  color: #9dabb1;
  font-size: 14px;
`;
const Badge = styled(Typography)`
  width: ${({ width }) => (width ? `${width}px` : "120px")};
  height: ${({ height }) => (height ? `${height}px` : "28px")};
  color: #ffff;
  background: ${({ groups, colors }) =>
    groups ? colors[groups.severity] : colors};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ProgressBadgeContainer = styled(Typography)`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const ProgressBadge = styled(Typography)`
  background: ${({ color }) => color};
  height: 20px;
  width: 120px;
  border-radius: 4px;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContainerTable = styled(TableContainer)`
  font-family: Arial;
  width: auto;
  padding: 1%;
  height: 50vh;
`;
const TableHeding = styled(Typography)`
  font-family: Arial;
  color: #4b4c64;
  font-weight: bold;
  margin-left: 24px;
`;

export default CreateTable;
