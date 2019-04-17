d3.csv("../data/Housing/HPI.csv").then(function(data) {
  let dscdcHpiData = data.filter((v) => {
    return v.Region === "DCSDC";
  });
  let niHpiData = data.filter((v) => {
    return v.Region === "NI";
  });

  let dscdcHpi = {
    x: dscdcHpiData.map((v) => {
      return v.Year;
    }),
    y: dscdcHpiData.map((v) => {
      return v.HPI;
    }),
    mode: 'lines+markers',
    name: 'DSCDC'
  };

  let niHpi = {
    x: niHpiData.map((v) => {
      return v.Year;
    }),
    y: niHpiData.map((v) => {
      return v.HPI;
    }),
    mode: 'lines+markers',
    name: 'NI'
  };

  let hpiData = [dscdcHpi, niHpi];

  let hpiLayout = Object.assign({}, multilineChartLayout);
  hpiLayout.title = 'House Price Index (NI)';
  hpiLayout.legend = {
    x: 0.8,
    y: 0.85
  };

  Plotly.newPlot('houses-hpi-chart', hpiData, hpiLayout, {
    modeBarButtons: multilineModeBarButtonsInclude,
    displayModeBar: true,
    displaylogo: false
  });

});

////////////////////////////////////////////////////////////////////////////////

d3.csv("../data/Housing/RPI.csv").then(function(data) {

  let borderRpiData = data.filter((v) => {
    return v.Region === "Border Region (Excl. Louth)";
  });
  let roiRpiData = data.filter((v) => {
    return v.Region === "Ireland";
  });

  let borderRpi = {
    x: borderRpiData.map((v) => {
      return v.Year;
    }),
    y: borderRpiData.map((v) => {
      return v.RPI;
    }),
    mode: 'lines+markers',
    name: 'Border Region (Excl. Louth)'
  };

  let roiHpi = {
    x: roiRpiData.map((v) => {
      return v.Year;
    }),
    y: roiRpiData.map((v) => {
      return v.RPI;
    }),
    mode: 'lines+markers',
    name: 'Ireland'
  };

  let rpiData = [borderRpi, roiHpi];
  let rpiLayout = Object.assign({}, multilineChartLayout);
  rpiLayout.title = 'Residential Price Index (RoI)';
  rpiLayout.legend = {
    x: 0.6,
    y: 0.85
  };

  Plotly.newPlot('houses-rpi-chart', rpiData, rpiLayout, {
    modeBarButtons: multilineModeBarButtonsInclude,
    displayModeBar: true,
    displaylogo: false
  });
})