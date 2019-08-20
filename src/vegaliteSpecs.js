const config = {
  view: {
    continuousWidth: 400,
    stroke: "transparent"
  },
  line: {
    opacity: 0.7,
    color: "white"
  },
  point: {
    filled: true,
    tooltip: true,
    size: 100,
    stroke: "white",
    strokeWidth: 1,
    opacity: 1,
    color: "#21918c"
  },
  axis: {
    gridOpacity: 0.1,
    labelColor: "white",
    title: null
  }
};

const ridesSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  usermeta: {embedOptions: {actions: false}},
  "transform": [
    {"calculate": "timeFormat(datum.timestamp, '%Y-%m-%d %I:00 %p')", "as": "datetime"}
  ],
  config: config,
  layer: [
    {mark: "line"},
    {mark: "point"},
  ],
  "encoding": {
    "x": {
      field: "timestamp",
      type: "temporal",
    },
    "y": {
      "field": "rides",
      "type": "quantitative",
      axis: {format: "s"}
    },
    tooltip: [
      {field: "datetime", type: "nominal", title: "Period Beginning"},
      {field: "rides", type: "quantitative", format: ".3s", title: "Rides Completed"},
    ]
  }
};

const distanceSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  usermeta: {embedOptions: {actions: false}},
  "transform": [
    {"calculate": "timeFormat(datum.timestamp, '%Y-%m-%d %I:00 %p')", "as": "datetime"},

  ],
  config: config,
  layer: [
    {mark: "line"},
    {mark: "point"},
  ],
  "encoding": {
    "x": {
      field: "timestamp",
      type: "temporal",
    },
    "y": {
      "field": "distance",
      "type": "quantitative",
      axis: {format: "s"}
    },
    tooltip: [
      {field: "datetime", type: "nominal", title: "Period Beginning"},
      {field: "distance", type: "quantitative", format: ".3s", title: "Miles Driven"},
    ]
  }
};

export {ridesSpec, distanceSpec};