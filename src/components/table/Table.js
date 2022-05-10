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
  Collapse,
  Box,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import groups from "../../data/grouped_findings.json";
import rows from "../../data/raw_findings.json";
import { styled } from "@mui/material/styles";
import colors from "../../helper/colorHash";

const RawFindingsTable = ({ expandibleRows, expand }) => {
  const headings = [
    "",
    "Severity",
    "Time",
    "Source",
    "Description",
    "Asset",
    "Status",
  ];

  return (
    <Collapse in={expand} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <TableHeding variant="h6" component="h6">
          Raw Findings
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
        <TableBody sx={{ justifyContent: "space-between", flex: 1 }}>
          {expandibleRows.map((row, idx) => (
            <TableRow key={`${row}${idx}`}>
              <DataCells />
              <DataCells>
                <Badge
                  variant="div"
                  component="div"
                  properties={row.properties}
                  colors={colors}
                >
                  {row.properties.severity}
                </Badge>
              </DataCells>
              <DataCells>{row.properties.ticket_created}</DataCells>
              <DataCells>{row.properties.source_security_tool_name}</DataCells>
              <DataCells>{row.properties.description}</DataCells>
              <DataCells>{row.properties.asset}</DataCells>
              <DataCells>
                <Badge
                  variant="div"
                  component="div"
                  properties={row.properties}
                  colors={colors}
                >
                  {row.properties.status}
                </Badge>
              </DataCells>
            </TableRow>
          ))}
        </TableBody>
      </Box>
    </Collapse>
  );
};

const GroupFindingsTable = ({ properties, index, rows }) => {
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
          <Badge
            variant="div"
            component="div"
            properties={properties}
            colors={colors}
          >
            {properties.severity}
          </Badge>
        </DataCells>
        <DataCells>{properties.grouped_finding_created}</DataCells>
        <DataCells>{properties.sla}</DataCells>
        <DataCells>{properties.description}</DataCells>
        <DataCells>{properties.security_analyst}</DataCells>
        <DataCells>{properties.owner}</DataCells>
        <DataCells>{properties.workflow}</DataCells>
        <DataCells>
          <ProgressBadgeContainer variant="div" component="div">
            {properties.status === "in_progress" ? (
              <LinearProgress
                variant="determinate"
                value={properties.progress * 100}
                sx={{ width: "100%" }}
              />
            ) : (
              <ProgressBadge variant="div" component="div" color={colors.low}>
                {properties.status}
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
        <TableCell />
        <TableCell />
      </TableRow>
      <TableRow>
        <DataCells sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <RawFindingsTable expandibleRows={rowFindings} expand={expand} />
        </DataCells>
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
    <Paper>
      <TableHeding variant="h6" component="h6">
        Grouped Findings
      </TableHeding>
      <ContainerTable>
        <GroupTable aria-label="collapsible table" stickyHeader={true}>
          <TableHead>
            <TableRow>
              {headings.map((heading, idx) => (
                <HeadingCell key={`${heading}${idx}`}>
                  {heading.toLocaleUpperCase()}
                </HeadingCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflowY: "auto" }}>
            {groups.features.map((group, idx) => (
              <GroupFindingsTable
                key={`group${idx}`}
                properties={group.properties}
                index={idx}
                rows={rows.features}
              />
            ))}
          </TableBody>
        </GroupTable>
      </ContainerTable>
    </Paper>
  );
};

const GroupTable = styled(Table)`
`;

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
  background: ${({ properties, colors }) =>
    properties ? colors[properties.severity] : colors ? colors : "#ffff"};
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
  width: 100%;
  max-height: 450px;

`;
const TableHeding = styled(Typography)`
  font-family: Arial;
  color: #4b4c64;
  font-weight: bold;
  margin-left: 24px;
`;

export default CreateTable;
