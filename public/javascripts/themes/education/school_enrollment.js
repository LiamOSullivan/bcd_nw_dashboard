var schoolEnrollmentChart = dc.compositeChart("#education-chart-5");
d3.csv("../data/Education/school_enrollments.csv").then(function(results) {

  // console.log("school enrollment data " + JSON.stringify(results[0]));
  let ndx = crossfilter();
  ndx.add(results.map(function(d) {
    //D&S (16+),D&S (16-64 y.o.),Donegal (16+),Donegal (16-64 y.o.)
    return {
      x: +d.Year,
      y1: +d["Primary"],
      y2: +d["Secondary"]
    };
  }));
  //
  let dim = ndx.dimension(dc.pluck('x')),
    grp1 = dim.group().reduceSum(dc.pluck('y1')),
    grp2 = dim.group().reduceSum(dc.pluck('y2'));

  schoolEnrollmentChart
    .width(700)
    .height(300)
    .margins({
      left: 50,
      top: 20,
      right: 150,
      bottom: 20
    })
    .x(d3.scaleLinear().domain([2014, 2016]))
    .y(d3.scaleLinear().domain([0, 100]))
    .elasticY(true)
    .clipPadding(50)
    .yAxisLabel("Students")
    .legend(dc.legend().x(150).y(200).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(schoolEnrollmentChart)
      .dimension(dim)
      .colors('red')
      .group(grp1, "Primary")
      .dashStyle([2, 2])
      .renderDataPoints(true)
      .xyTipsOn(true)
      .dotRadius(10)
      .defined(function(d) {
        return d.y1 !== null;
      }),
      dc.lineChart(schoolEnrollmentChart)
      .dimension(dim)
      .colors('blue')
      .group(grp2, "Secondary")
      .dashStyle([5, 5])
      .renderDataPoints(true)
      .dotRadius(10)
      .xyTipsOn(true)
      .defined(function(d) {
        return d.y2 !== null;
      })
    ])
    .brushOn(false);
  schoolEnrollmentChart.xAxis().ticks(2);
  schoolEnrollmentChart.xAxis()
    .tickFormat(d3.format("d"))
  schoolEnrollmentChart.yAxis().ticks(3);
  schoolEnrollmentChart.render();
});