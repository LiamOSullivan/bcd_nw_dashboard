d3.csv("../data/Demographics/population_projections.csv").then(function(data) {

  let dsData = data.filter((v) => {
    return v.Region === "D&S";
  });

  let niData = data.filter((v) => {
    return v.Region === "NI";
  });

  let donegalData = data.filter((v) => {
    return v.Region === "Donegal";
  });

  let roiData = data.filter((v) => {
    return v.Region === "ROI";
  });

  let popProjDS = {
    x: dsData.map((v) => {
      return v.Year;
    }),
    y: dsData.map((v) => {
      return v.Count;
    }),
    mode: 'lines+markers',
    name: 'D&S'
  };

  let popProjNI = {
    x: niData.map((v) => {
      return v.Year;
    }),
    y: niData.map((v) => {
      return v.Count;
    }),
    mode: 'lines+markers',
    name: 'NI',
    visible: 'legendonly'
  };

  let popProjDon = {
    x: donegalData.map((v) => {
      return v.Year;
    }),
    y: donegalData.map((v) => {
      return v.Count;
    }),
    mode: 'lines+markers',
    name: 'Donegal'
  };

  let popProjROI = {
    x: roiData.map((v) => {
      return v.Year;
    }),
    y: roiData.map((v) => {
      return v.Count;
    }),
    mode: 'lines+markers',
    name: 'RoI',
    visible: 'legendonly'
  };

  let popProjectionData = [popProjROI, popProjNI, popProjDon, popProjDS];

  let popProjectionlayout = {
    title: 'Population Projections',
    paper_bgcolor: '#001f35',
    plot_bgcolor: '#001f35',
    width: 700,
    height: 400,
    showlegend: true,
    annotations: []
  };

  Plotly.newPlot('pop-projection-chart', popProjectionData, popProjectionlayout, {
    modeBarButtonsToRemove: modeBarButtonsRemove,
    displayModeBar: true,
    showSendToCloud: false,
    responsive: true
  });

})