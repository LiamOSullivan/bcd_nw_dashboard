let modeBarButtonsRemove = ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines'];
let rowChartModeBarButtonsInclude = [
  ['toImage']
];
let multilineModeBarButtonsInclude = [
  ['toImage', 'hoverClosestCartesian', 'hoverCompareCartesian']
];
let areaChartModeBarButtonsInclude = [
  ['toImage', 'hoverClosestCartesian', 'hoverCompareCartesian']
];

let chartFont = {
  family: 'PT Sans',
  size: 16,
  color: '#313131'
}

let title = {
  xref: 'paper',
  x: 0.05,
}

let chartColor = '#ffffff';

let colorWay = ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844'];

let margins = {
  l: 50,
  r: 50,
  b: 50,
  t: 75,
  pad: 4
};

let rowChartLayout = {
  responsive: true,
  margin: margins,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  showlegend: false,
  annotations: [],
  hovermode: 'closest'
};

let groupedColumnLayout = {
  barmode: 'group',
  responsive: true,
  margin: margins,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  showlegend: true,
  annotations: [],
  hovermode: 'x'

}

let multilineChartLayout = {
  responsive: true,
  margin: margins,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  showlegend: true,
  annotations: [],
  hovermode: 'x'
};

let areaChartLayout = {
  responsive: true,
  margin: margins,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  colorway: colorWay,
  font: chartFont,
  hovermode: 'x',
  annotations: [],
  showlegend: true
}