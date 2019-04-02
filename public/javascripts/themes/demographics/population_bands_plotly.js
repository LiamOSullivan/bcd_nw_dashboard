let popBands = dc.barChart("#pop-bands-chart");
d3.csv("../data/Demographics/population_age_profile.csv").then(function(data) {
  /*TODO: refactor forEach to ES6 map */
  let index = 0;
  data.forEach(function(d) {
    d["Donegal"] = parseFloat(d["Donegal"].replace(/,/g, ''));
    d["DCSDC"] = parseFloat(d["DCSDC"].replace(/,/g, ''));
    d.index = index;
    index += 1;
  });

  var trace1 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    name: 'SF Zoo',
    type: 'bar'
  };

  var trace2 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'LA Zoo',
    type: 'bar'
  };

  var data = [trace1, trace2];
  var layout = {
    barmode: 'group',
    paper_bgcolor: '#001f35',
    plot_bgcolor: '#001f35',
    width: 700,
    height: 300,
    showlegend: false,
    annotations: []
  };


  Plotly.newPlot('pop-bands-chart', data, layout, {}, {
    showSendToCloud: true
  });

});