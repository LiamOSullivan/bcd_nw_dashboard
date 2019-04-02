var eChart = dc.compositeChart("#employment-chart-1");
d3.csv("../data/Economy/employment_rates.csv").then(function(results) {

  // console.log("employment data " + JSON.stringify(results[0]));
  let ndx = crossfilter();
  ndx.add(results.map(function(d) {
    //D&S (16+),D&S (16-64 y.o.),Donegal (16+),Donegal (16-64 y.o.)
    return {
      x: +d.Year,
      y1: +d["D&S (16+)"] * 100,
      y2: +d["D&S (16-64 y.o.)"] * 100,
      y3: +d["Donegal (16+)"] * 100,
      y4: +d["Donegal (16-64 y.o.)"] * 100
    };
  }));
  //
  let dim = ndx.dimension(dc.pluck('x')),
    grp1 = dim.group().reduceSum(dc.pluck('y1')),
    grp2 = dim.group().reduceSum(dc.pluck('y2'));
  let grp3 = dim.group().reduceSum(dc.pluck('y3')),
    grp4 = dim.group().reduceSum(dc.pluck('y4'));
  eChart
    .width(700)
    .height(300)
    .x(d3.scaleLinear().domain([2005, 2016]))
    .y(d3.scaleLinear().domain([0, 100]))
    .yAxisLabel("Employment Rate")
    .legend(dc.legend().x(150).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(eChart)
      .dimension(dim)
      .colors('red')
      .group(grp1, "D&S (16+)")
      .dashStyle([2, 2])
      .defined(function(d) {
        return d.y1 !== null;
      }),
      dc.lineChart(eChart)
      .dimension(dim)
      .colors('blue')
      .group(grp2, "D&S (16-64 y.o.)")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y2 !== null;
      }),
      dc.lineChart(eChart)
      .dimension(dim)
      .colors('green')
      .group(grp3, "Donegal (16+)")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y3 !== null;
      }),
      dc.lineChart(eChart)
      .dimension(dim)
      .colors('white')
      .group(grp4, "Donegal (16-64 y.o.)")
      .dashStyle([5, 5])
      .defined(function(d) {
        return d.y4 !== null;
      })
    ])
    .brushOn(false);
  eChart.xAxis().ticks(4);
  eChart.yAxis().ticks(3);
  eChart.render();
});