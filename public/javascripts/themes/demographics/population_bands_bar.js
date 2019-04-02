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

  console.log("pop age data: " + JSON.stringify(data[0]));
  let ndx = crossfilter(data);
  let ageBandDim = ndx.dimension(function(d) {
    return d["Age band"];
  });

  let ageBandDonegalGroup = ageBandDim.group()
    .reduceSum(function(d) {
      return d["Donegal"];
    });

  let ageBandDCSDCGroup = ageBandDim.group()
    .reduceSum(function(d) {
      return d["DCSDC"];
    });

  popBands
    .width(800)
    .height(300)
    .margins({
      left: 50,
      top: 20,
      right: 10,
      bottom: 40
    });

  popBands.x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .xAxisLabel('Age Bands');
  popBands
    .dimension(ageBandDim)
    .group(ageBandDonegalGroup);

  popBands
    // .y(d3.scaleLinear().domain([0, 100]))
    .yAxisLabel("Population")
    .elasticY(true);

  // .legend(dc.legend().x(150).y(20).itemHeight(13).gap(5))
  // popBands.yAxisLabel('Population')
  //   .y(d3.scaleLinear().domain([0, 50000]))
  //   .elasticY(false)

  // .group(ageBandDCSDCGroup);
  popBands.render();

});