var popChart = dc.compositeChart("#pop-chart");
d3.csv("../data/Demographics/population_projections_composite.csv").then(function(results) {
  let ndx = crossfilter();
  ndx.add(results.map(function(d) {
    return {
      x: +d.Year,
      y1: +d["D&S"],
      y2: +d["NI"],
      y3: +d["Donegal"],
      y4: +d["ROI"]
    };
  }));
  // console.log("Pop data: " + JSON.stringify(ndx[0]))
  let popDim = ndx.dimension(dc.pluck('x')),
    populationGroup1 = popDim.group().reduceSum(dc.pluck('y1')),
    populationGroup2 = popDim.group().reduceSum(dc.pluck('y2')),
    populationGroup3 = popDim.group().reduceSum(dc.pluck('y3')),
    populationGroup4 = popDim.group().reduceSum(dc.pluck('y4'));
  popChart
    .width(800)
    .height(300)
    .margins({
      left: 75,
      top: 20,
      right: 250,
      bottom: 20
    })
    .x(d3.scaleLinear().domain([2016, 2038]))
    .y(d3.scaleLinear().domain([0, 5000000]))
    .yAxisLabel("Population")
    .legend(dc.legend().x(600).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(popChart)
      .dimension(popDim)
      .colors('red')
      .group(populationGroup1, "Derry & Strabane")
      .dashStyle([2, 2])
      .defined(function(d) {
        return d.y1 !== 0;
      }),
      dc.lineChart(popChart)
      .dimension(popDim)
      .colors('blue')
      .group(populationGroup2, "Northern Ireland")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y2 !== 0;
      }),
      dc.lineChart(popChart)
      .dimension(popDim)
      .colors('green')
      .group(populationGroup3, "Donegal")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y3 !== 0;
      }),
      dc.lineChart(popChart)
      .dimension(popDim)
      .colors('yellow')
      .group(populationGroup4, "Republic of Ireland")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y4 !== 0;
      })
    ])
    .brushOn(false);
  // popChart.xAxis().ticks(3);
  popChart.xAxis().ticks(4).tickFormat(d3.format("d"));
  popChart.yAxis().ticks(3);
  popChart.render();
});

d3.select("#population-region-btn").on("click", function() {
  let btn = d3.select(this);
  let national = d3.select("#population-national-btn");
  if (!btn.classed('disabled')) {
    if (!btn.classed('active')) {
      btn.classed('active', true);
      national.classed('active', false);
      popChart.y(d3.scaleLinear().domain([0, 210000]));
      popChart.redraw();
    }
  }
});

d3.select("#population-national-btn").on("click", function() {
  let btn = d3.select(this);
  let region = d3.select("#population-region-btn");
  if (!btn.classed('disabled')) {
    if (!btn.classed('active')) {
      btn.classed('active', true);
      region.classed('active', false);
      popChart.y(d3.scaleLinear().domain([0, 5000000]));
      popChart.redraw();
    }
  }
});