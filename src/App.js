import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import VegaLite from "react-vega-lite";
import { Handler } from "vega-tooltip";

import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import { timeFormat } from "d3-time-format";

import timeseries from "./data.js";
import ResolutionInput from "./ResolutionInput";
import ResultMap from "./ResultMap";
import { ridesSpec, distanceSpec } from "./vegaliteSpecs";

function App() {
  const [resolution, setResolution] = useState("week");
  const [data, setData] = useState(timeseries[resolution]);
  const [filteredData, setFilteredData] = useState([]);
  const [min, setMin] = useState(1465014900000);
  const [max, setMax] = useState(1486857600000);
  const [displayMin, setDisplayMin] = useState(1465014900000);
  const [displayMax, setDisplayMax] = useState(1486857600000);
  const [extent] = useState([1465014900000, 1486857600000]);

  useEffect(() => {
    setData(timeseries[resolution]);
  }, [resolution]);

  useEffect(() => {
    const newFilteredData = data.filter(
      (datum) => datum.timestamp >= min && datum.timestamp <= max
    );
    setFilteredData(newFilteredData);
  }, [min, max, data]);

  return (
    <Container>
      <br />
      <hr />
      <h1>Ride Share Austin</h1>
      <p>
        A dataset of ~900K ride share trips in the city of Austin, TX from May
        2016 to Feb 2017.
      </p>
      <a href={"https://www.vndrewlee.com/rideshareexplorer/"}>
        Project Details
      </a>
      <a href={"https://data.world/andytryba/rideaustin"}>Data Source</a>
      <hr />
      <Row>
        <Col sm={12} lg={6}>
          <h3>Date Range</h3>
          <Row>
            <Col>
              <p align={"left"}>Min: {formatTime(new Date(displayMin))}</p>
            </Col>
            <Col>
              <p align={"right"}>Max: {formatTime(new Date(displayMax))}</p>
            </Col>
          </Row>
          <Range
            min={extent[0]}
            max={extent[1]}
            defaultValue={[min, max]}
            onChange={([newMin, newMax]) => {
              setDisplayMin(newMin);
              setDisplayMax(newMax);
            }}
            onAfterChange={([newMin, newMax]) => {
              setMin(newMin);
              setMax(newMax);
            }}
          />
        </Col>
        <Col sm={12} lg={6}>
          <h3>Resolution</h3>
          <ResolutionInput selection={resolution} callBack={setResolution} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col sm={12} lg={6}>
          <h3>Rides Completed</h3>
          <VegaLite
            spec={ridesSpec}
            data={{ values: filteredData }}
            tooltip={new Handler().call}
          />
        </Col>
        <Col sm={12} lg={6}>
          <h3>Kilometers Driven</h3>
          <VegaLite
            spec={distanceSpec}
            data={{ values: filteredData }}
            tooltip={new Handler().call}
          />
        </Col>
      </Row>
      <br />
      <h3>Dropoff Distribution</h3>
      <ResultMap start={min} end={max} />
      <hr />
      <p>hello@vndrewlee.com</p>
    </Container>
  );
}

const formatTime = timeFormat("%Y-%m-%d %I:00 %p");

export default App;
