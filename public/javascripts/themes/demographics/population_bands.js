let popBandsDonegal = dc.rowChart("#pop-bands-donegal-chart");
let popBandsDCSDC = dc.rowChart("#pop-bands-dcsdc-chart");
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
  let ageBandDonegalDim = ndx.dimension(function(d) {
    return d["Age band"];
  });

  let ageBandDonegalGroup = ageBandDonegalDim.group()
    .reduce(reduceAddDonegal, reduceRemoveDonegal, reduceInitialDonegal)
    .order(orderValueDonegal);

  function reduceAddDonegal(p, v) {
    return p + v["Donegal"];
  }

  function reduceRemoveDonegal(p, v) {
    return p - v["Donegal"];
  }

  function reduceInitialDonegal() {
    return 0;
  }
  //trying to order lexically by "Age band" but not working
  function orderValueDonegal(p) {
    return p["Age band"];
  }

  popBandsDonegal
    .width(400)
    .height(300)
    .x(d3.scaleLinear().domain([0, 50000]))
    .elasticX(true)
    .dimension(ageBandDonegalDim)
    .group(ageBandDonegalGroup);
  popBandsDonegal
    .xAxis().ticks(5).tickFormat(d3.format("d"));
  popBandsDonegal
    .render();

  //DCSDC

  let ageBandDCSDCDim = ndx.dimension(function(d) {
    return d["Age band"];
  });

  let ageBandDCSDCGroup = ageBandDCSDCDim.group()
    .reduce(reduceAddDCSDC, reduceRemoveDCSDC, reduceInitialDCSDC)
    .order(orderValueDCSDC);

  function reduceAddDCSDC(p, v) {
    return p + v["DCSDC"];
  }

  function reduceRemoveDCSDC(p, v) {
    return p - v["DCSDC"];
  }

  function reduceInitialDCSDC() {
    return 0;
  }
  //trying to order lexically by "Age band" but not working
  function orderValueDCSDC(p) {
    return p["Age band"];
  }

  popBandsDCSDC
    .width(400)
    .height(300)
    .x(d3.scaleLinear().domain([0, 50000]))
    .elasticX(true)
    .dimension(ageBandDCSDCDim)
    .group(ageBandDCSDCGroup);
  popBandsDCSDC
    .xAxis().ticks(5).tickFormat(d3.format("d"));
  popBandsDCSDC
    .render();
});