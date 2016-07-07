getData = function() {
  return $.getJSON(
    // python -m SimpleHTTPSever
    "/GDP-data.json",
    function(json) {
      return json
    }
  )
}
createDataSet = function() {
  var data = [];
  for (var i = 0; i < 75; i++) {
    var rand = Math.floor((Math.random() * 100) + 10)
    data.push(rand);
  }
  return data
}
getMaxDate = function(dateArray) {
  var dates = [];
  dateArray.map(function(dat){
    dates.push(new Date(dat[0]))
  });
  return new Date(Math.max.apply(null, dates));
}
getMinDate = function(dateArray) {
  var dates = [];
  dateArray.map(function(dat){
    dates.push(new Date(dat[0]))
  });
  return new Date(Math.min.apply(null, dates));
}
getMaxGDP = function(gdpArray) {

}
getMinGDP = function(gdpArray) {

}
createBarGraph = function(data) {
  var height = 500;
  var width = 700;

  var gdpMax = d3.max(data.data, function(dat) {
    return d3.max(dat.slice(-1));
  });
  var gdpMin = d3.min(data.data, function(dat) {
    return d3.min(dat.slice(-1));
  });

  var yearMax = getMaxDate(data.data);
  var yearMin = getMinDate(data.data);

  var y = d3.scaleLinear()
    .domain([gdpMin, gdpMax])
    .range([0, height - 50]);

  var xAxisScale = d3.scaleLinear()
    .domain([yearMin.getFullYear(), yearMax.getFullYear()])
    .range([50, width + 50]);

  var yAxisScale = d3.scaleLinear()
    .domain([gdpMax, gdpMin])
    .range([50, height])

  var bottomAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format("d")) ;
  var leftAxis = d3.axisLeft(yAxisScale);

  var bars = d3.select("body").select("svg");

  bars.selectAll(".chart")
    .data(data.data).enter()
    .append("g")
    .append("rect")
    .attr("x", function(d, i){return i * 2.544 + 70}) // if width changes this also has to change
    .attr("y", function(d, i){return height - y(d[1])})
    .attr("height", function(d, i){ return y(d[1])})
    .attr("width", "2")
    .on('mouseover', function(d) {

    })
    .on('mouseout', function(d) {

    })

  d3.select("svg").append("text")  // create the ttile for the graph
    .attr("x", width / 2 + 70)
    .attr("y", height - 450)
    .attr("text-anchor", "middle")
    .style("font-size", "26px")
    .text("GDP Graph");

  d3.select("body").select("svg")
    .append("g")
    .attr("width", width - 50)
    .attr("transform", "translate(20, 500)")
    .call(bottomAxis)

  d3.select("body").select("svg")
    .append("g")
    .attr("height", height - 50)
    .attr("transform", "translate(70)")
    .call(leftAxis)
};
$(function(){
  var promise = getData(); // TODO: Find out how to change horizontal graphs to vertical graphs, use <line> to create chart
  promise.success(function(data){
    createBarGraph(data);
  });
});
