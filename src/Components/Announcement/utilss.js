import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));

const ITEM_HEIGHT = 48;
//const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

const options = [
  "test@gmail.com",
  "testing@gmail.com",
  "sai@gmail.com",
  "raj@gmail.com",
  "prasad@gmail.com",
  "demo@gmail.com",
];
const departmentOptions = [
  { name: "development@pss.com", id: 1 },
  { name: "Sales@pss.in", id: 2 },
  { name: "Hr@vitelglobal.com", id: 3 },
  { name: "Digitalmarketing@vitelglobal.in", id: 4 },
  { name: "Testing@pss.com", id: 5 },
  { name: "Designing@vitelglobal.in", id: 6 },
];

export { useStyles, MenuProps, options, departmentOptions };
