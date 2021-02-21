import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [select, setSelect] = useState(0);

  const [personal, setPersonal] = useState({
    invest: 450,
    nol: 1,
    aol: [],
    referral: 0,
  })

  const [pub, setPub] = useState({
    invest: 450,
    nol: 4,
    aol: [0, 1, 1],
    referral: 0,
  })

  const [content, setContent] = useState([]);

  const options = [
    {
      value: 0,
      label: "Personal Chart"
    },
    {
      value: 1,
      label: "Public Chart"
    }
  ];

  const types = [
    {
      value: 0,
      label: "To Investor",
    },
    {
      value: 1,
      label: "To Lot Bin",
    },

  ]

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const handleAOLChange = (event) => {
    var index = parseInt(event.target.name);
    if (select === 0) {
      var x = personal.aol;
      x[index] = event.target.value;
      setPersonal(prevState => ({
        ...prevState,
        aol: x
      }));
    }
    else {
      var x = pub.aol;
      x[index] = event.target.value;
      setPub(prevState => ({
        ...prevState,
        aol: x
      }));
    }
  }

  const handleFieldChange = (event) => {
    event.persist();
    console.log(event);
    if (select === 0) {
      setPersonal(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    }
    else {
      setPub(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    }
  }

  const save = (event) => {
    event.persist();

    var ia = document.getElementById("ia").value;
    var nol = document.getElementById("nol").value;
    var referral = document.getElementById("referral").value;

    if (select === 0) {
      ia = ia ? ia : personal.invest;
      nol = nol ? nol : personal.nol;
      referral = referral ? referral : personal.referral;
      setPersonal(prevState => ({
        ...prevState,
        invest: ia,
        nol: nol,
        referral: referral
      }));
    }
    else {
      ia = ia ? ia : pub.invest;
      nol = nol ? nol : pub.nol;
      referral = referral ? referral : pub.referral;
      setPub(prevState => ({
        ...prevState,
        invest: ia,
        nol: nol,
        referral: referral
      }));
    }


    document.getElementById("ia").value = "";
    document.getElementById("nol").value = "";
    document.getElementById("referral").value = "";

  }

  useEffect(() => {
    setContent([]);
    var row = [];
    if (select === 0) {
      for (var i = 0; i < personal.nol - 1; i++) {
        row.push(
          <TextField
            select
            label={`#${i + 1}`}
            value={personal.aol[i]}
            name={`${i}`}
            onChange={handleAOLChange}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
        row.push(
          <div>&nbsp;</div>
        )
      }
    }
    else {
      for (var i = 0; i < pub.nol - 1; i++) {
        row.push(
          <TextField
            select
            label={`#${i + 1}`}
            value={pub.aol[i]}
            name={`${i}`}
            onChange={handleAOLChange}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
        row.push(
          <div>&nbsp;</div>
        )
      }
    }
    setContent(row);
  }, [select, pub, personal, personal.aol, pub.aol])


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Chart Setup</h4>
            </CardHeader>
            <CardBody>
              <form>
                <div>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Chart Type"
                    value={select}
                    onChange={handleChange}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <CustomInput
                    labelText="Investment Amount"
                    id="ia"
                    formControlProps={{
                    }}
                    inputProps={{
                      name: "invest",
                      endAdornment: (
                        select === 0 ? personal.invest : pub.invest
                      )
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="Number of lots"
                    id="nol"
                    formControlProps={{
                    }}
                    inputProps={{
                      name: "nol",
                      endAdornment: (
                        select === 0 ? personal.nol : pub.nol
                      )
                    }}
                  />
                </div>
                <div>
                  {content}
                </div>
                <div>
                  <CustomInput
                    labelText="Referral Fee Amount"
                    id="referral"
                    formControlProps={{
                    }}
                    inputProps={{
                      name: "referral",
                      endAdornment: (
                        select === 0 ? personal.referral : pub.referral
                      )
                    }}
                  />
                </div>
                <div>
                  <Button type="button" color="primary" onClick={save}>
                    Save
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
