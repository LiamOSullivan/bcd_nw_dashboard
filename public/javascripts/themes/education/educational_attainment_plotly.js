d3.csv("../data/Education/educational_attainment.csv")
  .then(function(data) {

    let eduAttainment = {
      y: data.map((v) => {
        return ' ' + v["Level of qualification"]; //add a space to pad the axis title in bar
      }),
      x: data.map((v) => {
        return v.Count;
      }),
      transforms: [{
        type: 'sort',
        target: 'x',
        order: 'ascending'
      }],
      name: 'Educational Attainment',
      orientation: 'h',
      type: 'bar',
      mode: 'bars+text',
      text: ['test']

    };
    let eduAttainmentData = [eduAttainment];
    let eduAttainmentLayout = Object.assign({}, rowChartLayout);
    eduAttainmentLayout.title = 'Educational Attainment Level';

    Plotly.newPlot('education-attainment-chart', eduAttainmentData, eduAttainmentLayout, {
      modeBarButtons: rowChartModeBarButtonsInclude,
      displayModeBar: true,
      displaylogo: false,
      showSendToCloud: false
    });
    //workaround to place y axis labels on bars
    document.getElementById('education-attainment-chart').on('plotly_afterplot', function() {
      let yAxisLabels = [].slice.call(document.querySelectorAll('[class^="yaxislayer"] .ytick text, [class*=" yaxislayer"] .ytick text'))
      for (let i = 0; i < yAxisLabels.length; i++) {
        yAxisLabels[i].setAttribute('text-anchor', 'start');
      }
    })
  })
  .catch(function(err) {
    console.log("Error loading file:\n " + err)
  });