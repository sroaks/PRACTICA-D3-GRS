const width = 20000
const height = 600
const margin = {
    top: 10, 
    bottom: 40, 
    right: 10, 
    left: 40
}

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("class", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("class", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("class", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("class", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.1)
const y = d3.scaleLinear().range([height - margin.bottom - margin.top, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

d3.csv("ibex.csv").then(data => {
  data.map(d => {
      d.open = +d.open;
      d.close = +d.close;
  })

  x.domain(data.map(d => d.date))
  y.domain([d3.min(data, d => Math.min(d.open, d.close)), d3.max(data, d => Math.max(d.open, d.close))])

  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

  // Data binding:
  const bars = elementGroup.selectAll(".bar").data(data)
  bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.date))
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", x.bandwidth())
      .attr("height", d => Math.abs(y(d.open) - y(d.close))) // Altura basada en la diferencia entre open y close
      .attr("fill", d => (d.open < d.close) ? "green" : "red") // Color basado en la relación entre open y close

  console.log(data)
})








