const config = {
  autosize: {
    type: "pad",
    resize: true,
    contains: "padding"
  },
  view: {
    continuousWidth: 450,
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
  },
  "background": null
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
  },
  data: {name: 'values'}
};

const distanceSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  usermeta: {embedOptions: {actions: false}},
  "transform": [
    {"calculate": "timeFormat(datum.timestamp, '%Y-%m-%d %I:00 %p')", "as": "datetime"},
    {"calculate": "datum.distance/1000", "as": "kilometers"},
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
      "field": "kilometers",
      "type": "quantitative",
      axis: {format: "s"}
    },
    tooltip: [
      {field: "datetime", type: "nominal", title: "Period Beginning"},
      {field: "kilometers", type: "quantitative", format: ".3s", title: "km Driven"},
    ]
  },
  data: {name: 'values'}
};

export {ridesSpec, distanceSpec};