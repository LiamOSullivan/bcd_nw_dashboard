d3.csv("../data/Education/educational_attainment.csv").then(function(data) {

  let yArr = data.map((v) => {
    return v["Level of qualification"];
  })

  let eduAttainment = {
    y: yArr,
    x: data.map((v) => {
      return v.Count;
    }),
    name: 'Educational Attainment',
    orientation: 'h',
    type: 'bar',
    mode: 'bars+text',
    text: ['test']

  };
  annotationsArr = [];
  for (let i = 0; i < yArr.length; i += 1) {
    annotationsArr.push({
      x: data[i].Count,
      y: data[i]["Level of qualification"],
      xref: 'x',
      yref: 'y',
      text: data[i]["Level of qualification"],
      showarrow: false,
      arrowhead: 7,
      ax: 0,
      ay: 0
    });
  }

  let eduAttainmentData = [eduAttainment];
  let eduAttainmentLayout = {
    yaxis: {
      showticklabels: false
    },
    paper_bgcolor: '#001f35',
    plot_bgcolor: '#001f35',
    width: 700,
    height: 400,
    showlegend: false,
    annotations: annotationsArr
  };


  Plotly.newPlot('education-attainment-chart', eduAttainmentData, eduAttainmentLayout, {
    modeBarButtonsToRemove: modeBarButtonsRemove,
    displayModeBar: true,
    showSendToCloud: false,
    responsive: true
  });

});