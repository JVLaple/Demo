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

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.persist();
    setError(false);
    var level = document.getElementById("level").value;
    var nol = document.getElementById("nol").value;
    var ugl = document.getElementById("ugl").value;
    var spl = document.getElementById("spl").value;
    var splf = document.getElementById("splf").value;
    var splt = document.getElementById("splt").value;
    var dl = document.getElementById("dl").value;
    var dlf = document.getElementById("dlf").value;
    var dlt = document.getElementById("dlt").value;
    var ul = document.getElementById("ul").value;
    var ulf = document.getElementById("ulf").value;
    var ult = document.getElementById("ult").value;

    if (!level || !nol || !ugl || !spl || !splf || !splt || !dl || !dlf || !dlt || !ul || !ulf || !ult) {
      setError(true);
      return;
    }

    setData(prevState => ([...prevState, [level, nol, ugl, spl, splf, splt, dl, dlf, dlt, ul, ulf, ult]]))

    document.getElementById("level").value = "";
    document.getElementById("nol").value = "";
    document.getElementById("ugl").value = "";
    document.getElementById("spl").value = "";
    document.getElementById("splf").value = "";
    document.getElementById("splt").value = "";
    document.getElementById("dl").value = "";
    document.getElementById("dlf").value = "";
    document.getElementById("dlt").value = "";
    document.getElementById("ul").value = "";
    document.getElementById("ulf").value = "";
    document.getElementById("ult").value = "";

  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Level Setup</h4>
            </CardHeader>
            <CardBody>
              <form>
                <h5>Create Level</h5>
                {error ?
                  <div>Please fill in all of the fields</div> : null
                }
                <div>
                  <CustomInput
                    className=""
                    labelText="Level"
                    id="level"
                    formControlProps={{
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="No. of Lots"
                    id="nol"
                    formControlProps={{
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <CustomInput
                    labelText="Upgrade Lot"
                    id="ugl"
                    formControlProps={{
                    }}
                  />
                </div>
                <div>
                  <CustomInput
                    labelText="SP Lot"
                    id="spl"
                    formControlProps={{
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="SP Lot From"
                    id="splf"
                    formControlProps={{
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="SP Lot To"
                    id="splt"
                    formControlProps={{
                    }}
                  />
                </div>
                <div>
                  <CustomInput
                    labelText="Down Lot"
                    id="dl"
                    formControlProps={{
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="Down Lot From"
                    id="dlf"
                    formControlProps={{
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="Down Lot To"
                    id="dlt"
                    formControlProps={{
                    }}
                  />
                </div>
                <div>
                  <CustomInput
                    labelText="Up Lot"
                    id="ul"
                    formControlProps={{
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="Up Lot From"
                    id="ulf"
                    formControlProps={{
                    }}
                  />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CustomInput
                    labelText="Up Lot To"
                    id="ult"
                    formControlProps={{
                    }}
                  />
                </div>
                <div>
                  <Button type="button" color="primary" onClick={onSubmit}>
                    Add
                  </Button>
                </div>
              </form>
              <hr />
              <Table
                tableHeaderColor="success"
                tableHead={["Level", "No. of Lots", "Upgrade Lot", "SP Lot", "SP Lot From", "SP Lot To", "Down Lot", "Down Lot From", "Down Lot To", "Up Lot", "Up Lot From", "Up Lot To"]}
                tableData={data}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
