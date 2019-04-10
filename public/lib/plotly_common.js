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
//'hoverCompareCartesian'
let chartWidth = 'inherit';
let chartHeight = 475;

let rowChartLayout = {
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
  width: chartWidth,
  height: 475,
  showlegend: false,
  annotations: [],
  hovermode: 'closest'
};

let groupedColumnLayout = {
  barmode: 'group',
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
  width: chartWidth,
  height: chartHeight,
  showlegend: true,
  annotations: [],
  hovermode: 'x'

}

let multilineChartLayout = {
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
  width: chartWidth,
  height: chartHeight,
  showlegend: true,
  annotations: [],
  hovermode: 'x'
};

let areaChartLayout = {
  autosize: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
  hovermode: 'x',
  annotations: [],
  showlegend: true
}