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

let rowChartLayout = {
  responsive: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
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
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
  showlegend: true,
  annotations: [],
  hovermode: 'x'

}

let multilineChartLayout = {
  responsive: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
  showlegend: true,
  annotations: [],
  hovermode: 'x'

};

let areaChartLayout = {
  responsive: true,
  yaxis: {
    showticklabels: true
  },
  paper_bgcolor: '#001f35',
  plot_bgcolor: '#001f35',
  hovermode: 'x',
  annotations: [],
  showlegend: true
}