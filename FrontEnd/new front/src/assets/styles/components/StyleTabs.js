// src/components/StyledTabs.js
import { styled } from "@mui/system";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;

  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 300;
  background-color: transparent;
  background: #222;

  padding: 10px 15px;
  min-height: 40px;
  border: 1px solid #222;
  border-bottom: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin: 1.5px;
  border: none;
  font-size: 13px;
  display: flex;

  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    color: #fff;

    outline: currentColor thin dotted;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: #222;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  padding: 20px 12px;
  
  background:  grey[900] ;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 2px solid #222;
  border-top:none;
  border-radius: 1px; opacity: 1;
  `
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: #222;
  border-radius: 4px;
  border-bottom : none;
 
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content:center;
  align-content: space-between;
  
  `
);

export { Tab, TabPanel, TabsList };
