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

let chartColor = '#ffffff';

let rowChartLayout = {
  responsive: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  font: chartFont,
  showlegend: false,
  annotations: [],
  hovermode: 'closest'
};

let groupedColumnLayout = {
  barmode: 'group',
  responsive: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  font: chartFont,
  showlegend: true,
  annotations: [],
  hovermode: 'x'

}

let multilineChartLayout = {
  responsive: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  font: chartFont,
  showlegend: true,
  annotations: [],
  hovermode: 'x'
};

let areaChartLayout = {
  responsive: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: chartColor,
  plot_bgcolor: chartColor,
  font: chartFont,
  hovermode: 'x',
  annotations: [],
  showlegend: true
}