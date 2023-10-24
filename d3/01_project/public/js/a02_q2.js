// data scource : https://www.kaggle.com/datasets/khaiid/startups-by-valuation
const date_set = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var totalCout = 0
var totalValuation = 0;

d3.csv("../data/Startups.csv").then( async (data) => {
  totalCout = data.length;
  data.map((d) => {
    totalValuation += parseFloat(d.Valuation)
  })
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      if (currentValue[key] == ""){
        currentValue[key] = "No set"
      }
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  //#region  Section 1
  let temp = []
  for (var i = 0; i < 12; i++){
    temp.push({})
    let count = 0
    temp[i].title = date_set[i]
    temp[i].Valuation = 0
    for (var j = 0; j < data.length; j++ )
    {
      if(data[j].Valuation_date.includes(date_set[i])){
        count++
        temp[i].Valuation = parseFloat(temp[i].Valuation) + parseFloat(data[j].Valuation);
      }
    }
    temp[i].Count = count
  }
  drawMonthChart(temp, "All")
  //#endregion

  //#region Section 2
  drawMonthlyChart(temp, "All")
  d3.select("#select").on("change", async function(d) {
    var selectedOption = d3.select(this).property("value")
    await setMonthlyData(selectedOption)
  })
  async function setMonthlyData(selectedOption){
    let temp = []
    if (selectedOption !="All")
    {data.map((d) => {
      if (d.Valuation_date.includes(selectedOption)){
        temp.push(d)
      }
    })} else {
        for (var i = 0; i < 12; i++){
          temp.push({})
          let count = 0
          temp[i].title = date_set[i]
          temp[i].Valuation = 0
          for (var j = 0; j < data.length; j++ )
          {
            if(data[j].Valuation_date.includes(date_set[i])){
              count++
              temp[i].Valuation = parseFloat(temp[i].Valuation) + parseFloat(data[j].Valuation);
            }
          }
          temp[i].Count = count
        }
    }
    drawMonthlyChart(temp, selectedOption)
    
  }
  //#endregion

  //#region Region3 & 4
  await resetData('Industry')
  await resetData('Country')
  async function resetData(selectedOption){
    let temp = []
    var groupedBy = await groupBy(data, selectedOption);
    for (let i = 0; i < Object.keys(groupedBy).length; i++ ){
      let count = 0
      temp.push({})
      temp[i].title = Object.keys(groupedBy)[i]
      temp[i].Valuation = 0
      for (let j = 0; j < groupedBy[Object.keys(groupedBy)[i]].length; j++)
      {
        temp[i].Valuation = parseFloat(temp[i].Valuation) + parseFloat(groupedBy[Object.keys(groupedBy)[i]][j].Valuation);
        count++
      }
      temp[i].Count = count
    }
    drawNewChart(temp, selectedOption)
  }
  //#endregion
})

function drawMonthChart(data, selectedOption) {
  // console.log(data)
  var margin = {top: 30, right: 30, bottom: 50, left: 50};
  var width = 1200 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;
  //#region Bar Chart
  var svg = d3.select("#barChart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
  svg.append("rect").attr("width", 15).attr("height", 15).style("fill", "#018adc")
    .attr("transform", `translate(${width - 150 - 20},${5})`)
  svg.append("text").text("Largest in Valuation")
    .attr("transform", `translate(${width - 150},${15})`)
  svg.append("rect").attr("width", 15).attr("height", 15).style("fill", "#ffccc8")
    .attr("transform", `translate(${width - 150 - 20},${5 + 20})`)
  svg.append("text").text("Smallest in Valuation")
    .attr("transform",  `translate(${width - 150},${15 + 20})`)
  var valueMax = d3.max(data, (d) => {
    return d.Valuation
  })
  var valueColorScale = d3.scaleLinear().range(['#ffccc8', '#018adc']).domain([0, valueMax]);
  const barChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const x = d3.scaleBand().range([ 0, width ]).domain(data.map(d => d.title)).padding(0.2);
    barChart.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", `translate(${20},${0})`)
        .style("text-anchor", "end")
        .style("font-size", 15);
    barChart.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
    var yMax = Math.ceil(d3.max(data, (d) => {
      return d.Count
    }))
    const y = d3.scaleLinear()
      .domain([0, yMax + 20])
      .range([ height, 0]);
      barChart.append("g")
      .attr("class", "myYaxis")
      .call(d3.axisLeft(y));
      barChart.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Number of Startups");
    let bars = barChart.selectAll('.mybars')
        .data(data)
        .enter()
        .append("g");
    bars.append('rect')
      .attr("class", "mybars")
        .attr("x", d => x(d.title))
        .attr("width", x.bandwidth())
        .attr("fill", d => valueColorScale(d.Valuation))
        .attr("height", d => height - y(0))
        .attr("y", d => y(0))
      bars.append("text")
        .text(function(d) { 
            return d.Count;
        })
        .attr("class", "bar_texts")
        .attr("x", function(d){
            return x(d.title) + x.bandwidth()/2;
        })
        .attr("y", function(d){
            return height;
        })
        .attr("font-family" , "sans-serif")
        .attr("font-size" , "14px")
        .attr("fill" , "black")
        .attr("text-anchor", "middle");
      barChart.selectAll(".mybars")
        .transition()
        .duration(500)
        .attr("y", d => y(d.Count))
        .attr("height", d => height - y(d.Count))
      barChart.selectAll(".bar_texts")
        .transition()
        .duration(500)
        .attr("y", function(d){
          return y(d.Count) - 5;
})
//#endregion

//#region Bubble Chart


}

function drawMonthlyChart(data, selectedOption) {
  d3.select("#bubbleChart").innerHTML = ''
  d3.select("#bubbleChart").select("svg").remove();
  var margin = {top: 15, right: 30, bottom: 50, left: 80};
  var width = 1200 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;
  const svg = d3.select("#bubbleChart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
  var bubbleChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  bubbleChart.append("text").text(selectedOption).attr("class", "x label").attr("text-anchor", "end")
    .attr("x", width + 25)
    .attr("y", height + 50)
  bubbleChart.append("text").text("Valuation in Billons($)").attr("class", "y label").attr("text-anchor", "end").attr("fill", "white")
    .attr("y", -45)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    
  var yMax_1 = d3.max(data, (d) => {return Math.ceil(d.Valuation)})
  const y_1 = d3.scaleLinear().domain([0, yMax_1 +5]).range([ height, 0]);
  bubbleChart.append("g").attr("class", "myYaxis").call(d3.axisLeft(y_1));
  var valueMax = d3.max(data, (d) => {
    return Math.round(d.Valuation) 
  })


  const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
  let mouseOver = function(d, i) {
    console.log(i)
    d3.select(this).transition().duration(200).style("opacity", 1).style("stroke", "black")
          tooltip.html(
        "Valuation in billions (USD$): " + Math.round(i.Valuation * 100) / 100  + '<br>'
        + "Number of Startups: " + i.Count  + '<br>'
        )
        .style("left", (d.pageX - 100) + "px").style("top", (d.pageY - 120) + "px")
        .transition().duration(400).style("opacity", 1)
    // if (selectedOption == "Industry") {
    //   tooltip.html("Industry: " + i.title + '<br>'
    //     + "Valuation in billions (USD$): " + Math.round(i.Valuation * 100) / 100  + '<br>'
    //     + "Number of Startups: " + i.Count  + '<br>'
    //     )
    //     .style("left", (d.pageX - 100) + "px").style("top", (d.pageY - 120) + "px")
    //     .transition().duration(400).style("opacity", 1)
    // } else {
    //   tooltip.html("Country: " + i.title + '<br>'
    //   + "Valuation in billions (USD$): " + Math.round(i.Valuation * 100) / 100  + '<br>'
    //   + "Number of Startups: " + i.Count  + '<br>'
    //   )
    //   .style("left", (d.pageX - 100) + "px").style("top", (d.pageY - 120) + "px")
    //   .transition().duration(400).style("opacity", 1)
    // }  
  }

  let mouseLeave = function(d) {
      d3.select(this).transition().duration(200).style("stroke", "transparent")
      tooltip.transition().duration(300).style("opacity", 0);
  }
  let mouseMove = function(d) {
      tooltip.style("left", (d.pageX - 100) + "px").style("top", (d.pageY - 120) + "px")
  }







  var valueColorScale = d3.scaleLinear().range(['#c2db4f', '#59ab35']).domain([0, valueMax]);
  var bars_2 = bubbleChart.selectAll('.mybars_1')
    .data(data)
    .enter()
    .append("g");
    bars_2
    .on("mouseover", mouseOver )
    .on("mouseleave", mouseLeave )
    .on("mousemove", mouseMove)
 
  if (selectedOption == "All"){
    const x_1 = d3.scaleBand().padding(0.2).range([ 0, width]).domain(data.map(d => d.title))
    bubbleChart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x_1))
      .selectAll("text")
          .attr("transform", "translate(10,0)")
          .style("text-anchor", "end");
    // let bars_2 = bubbleChart.selectAll('.mybars_1')
    //     .data(data)
    //     .enter()
    //     .append("g");
    bars_2.append('rect')
      // .attr('class', 'mybars')
      .attr("class", "mybars_1")
        .attr("x", d => x_1(d.title))
        .attr("width", x_1.bandwidth())
        .attr("fill", d => valueColorScale(d.Valuation))
        // no bar at the beginning thus:
        .attr("height", d => height - y_1(0)) // always equal to 0
        .attr("y", d => y_1(0))
    bars_2.append("text")
        .text(function(d) { 
            return Math.round(d.Valuation * 100) / 100;
        })
        .attr("class", "bar_texts")
        .attr("x", function(d){
            return x_1(d.title) + x_1.bandwidth()/2;
        })
        .attr("y", function(d){
            return height;
        })
        .attr("font-family" , "sans-serif")
        .attr("font-size" , "14px")
        .attr("fill" , "white")
        .attr("text-anchor", "middle");
    
    bubbleChart.selectAll(".mybars_1")
      .transition()
      .duration(500)
      .attr("y", d => y_1(d.Valuation))
      .attr("height", d => height - y_1(d.Valuation))
    bubbleChart.selectAll(".bar_texts")
      .transition()
      .duration(500)
      .attr("y", function(d){
        return y_1(d.Valuation) - 5;
    })
  } else {
    data.sort(function(a, b) {
      return b.Valuation - a.Valuation;
    });
    const x_1 = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(d => d.Company))
    .padding(0.2);
    bubbleChart.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x_1))
    .selectAll("text")
    .attr("transform", "translate(10,0)rotate(-15)").style("text-anchor", "end")
    // let bars_2 = bubbleChart.selectAll('.mybars_1')
    //     .data(data)
    //     .enter()
    //     .append("g");
      bars_2.append('rect')
      // .attr('class', 'mybars')
      .attr("class", "mybars_1")
        .attr("x", d => x_1(d.Company))
        .attr("width", x_1.bandwidth())
        .attr("fill", d => valueColorScale(d.Valuation))
        // no bar at the beginning thus:
        .attr("height", d => height - y_1(0)) // always equal to 0
        .attr("y", d => y_1(0))
      bars_2.append("text")
        .text(function(d) { 
            return Math.round(d.Valuation * 100) / 100;
        })
        .attr("class", "bar_texts")
        .attr("x", function(d){
            return x_1(d.Company) + x_1.bandwidth()/2;
        })
        .attr("y", function(d){
            return height;
        })
        // .attr("font-family" , "sans-serif")
        .attr("font-size" , "14px")
        // .attr("fill" , "white")
        .attr("text-anchor", "middle");

      bubbleChart.selectAll(".mybars_1")
        .transition()
        .duration(500)
        .attr("y", d => y_1(d.Valuation))
        .attr("height", d => height - y_1(d.Valuation))
      bubbleChart.selectAll(".bar_texts")
        .transition()
        .duration(500)
        .attr("y", function(d){
          return y_1(d.Valuation) - 5;
        })
  }
  svg.selectAll('text').attr("fill","white")
}

function drawNewChart(data, selectedOption) {
  
  const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
  let mouseOver = function(d, i) {
    console.log(i)
    d3.select(this).transition().duration(200).style("opacity", 1).style("stroke", "black")
    if (selectedOption == "Industry") {
      tooltip.html("Industry: " + i.title + '<br>'
        + "Valuation in billions (USD$): " + Math.round(i.Valuation * 100) / 100  + '<br>'
        + "Number of Startups: " + i.Count  + '<br>'
        )
        .style("left", (d.pageX - 100) + "px").style("top", (d.pageY - 120) + "px")
        .transition().duration(400).style("opacity", 1)
    } else {
      tooltip.html("Country: " + i.title + '<br>'
      + "Valuation in billions (USD$): " + Math.round(i.Valuation * 100) / 100  + '<br>'
      + "Number of Startups: " + i.Count  + '<br>'
      )
      .style("left", (d.pageX - 100) + "px").style("top", (d.pageY - 120) + "px")
      .transition().duration(400).style("opacity", 1)
    }  
  }

  let mouseLeave = function(d) {
      d3.select(this).transition().duration(200).style("stroke", "transparent")
      tooltip.transition().duration(300).style("opacity", 0);
  }
  let mouseMove = function(d) {
      tooltip.style("left", (d.pageX - 100) + "px").style("top", (d.pageY - 120) + "px")
  }  
  var margin = {top: 25, right: 30, bottom: 150, left: 80},
    width = 1200 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  //#region Bubble
  var countMax = d3.max(data, (d) => {
    return d.Count
  })
  var countColorScale = d3.scaleLinear().range(['#018adc', '#0b2484']).domain([0, countMax]);
  const svg = d3.select("#stats" + selectedOption)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  svg.append("rect").attr("width", 15).attr("height", 15).style("fill", "#0b2484")
    .attr("transform", `translate(${width - 150 - 20},${5})`)
  var indx_txt_1 = svg.append("text").text("Largest in Number")
    .attr("transform", `translate(${width - 150},${15})`)
  svg.append("rect").attr("width", 15).attr("height", 15).style("fill", "#018adc")
    .attr("transform", `translate(${width - 150 - 20},${5 + 20})`)
  var indx_txt_2 = svg.append("text").text("Smallest in Number")
    .attr("transform",  `translate(${width - 150},${15 + 20})`)
  
  const statsIndustry = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  var valueMax = Math.ceil(d3.max(data, (d) => {
    return Math.round(d.Valuation) 
  }))
  const statsIndustry_x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.title))
  .padding(0.2);
  statsIndustry.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(statsIndustry_x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").style('font-size', 12);
  var textX = statsIndustry.append("text").attr("class", "x label").attr("text-anchor", "end")
    .attr("x", width).attr("y", height  -25).text(selectedOption)
  const statsIndustry_y = d3.scaleLinear().domain([0, valueMax * 1.1]).range([ height, 0]);
  statsIndustry.append("g").attr("class", "myYaxis").call(d3.axisLeft(statsIndustry_y))
  var textY = statsIndustry.append("text").attr("class", "y label").attr("text-anchor", "end").attr("y", -45).attr("dy", ".75em")
    .attr("transform", "rotate(-90)").text("Valuation in Billons($)");









  if (selectedOption == "Industry"){
    d3.select("#vol").on("input", updateGraph )
    // updateGraph();
    statsIndustry.append("text").text("Slider Value (number of start ups): " + 0).attr("class", "mytext")
    .attr("transform", "translate(" + (width / 2 - 125) + "," + 0 + ")")
    function updateGraph() {
      statsIndustry.selectAll(".mytext").remove()
      statsIndustry.append("text").text("Slider Value (number of start ups): " + this.value).attr("class", "mytext")
      .attr("transform", "translate(" + (width / 2 - 125) + "," + 0 + ")")
      // console.log(this.value)
      let value = this.value
        // Add dots
      console.log(value)
      statsIndustry.selectAll("circle")
          .attr("id", "myBubbles")
          .style("fill", function (d) { return resetColor(d); } )
        function resetColor(d) {
            if (statsIndustry_y(d.Count) >= statsIndustry_y(value)){
              return "red"
            } else {
              return countColorScale(d.Count)
            }
          }
    }
    var rMax = d3.max(data, (d) => {return d.Count })
    console.log(rMax)
    var r = d3.scaleSqrt().domain([0, rMax]).range([ 0, rMax]);
    statsIndustry.selectAll('#myBubbles')
    .data(data).enter()
    .append('circle')
      .attr("id", "myBubbles")
      .attr("cx", function(d) { 
        return statsIndustry_x(d.title) + 5 })
      .attr("cy", function(d) { return statsIndustry_y(d.Valuation) })
      .attr("r", function(d) { return r(d.Count) })
      .style("fill", d => countColorScale(d.Count))
    .on("mouseover", mouseOver )
    .on("mouseleave", mouseLeave )
    .on("mousemove", mouseMove)

  } else {
    d3.select("#vol_2").on("input", updateGraph )
    // updateGraph();
    statsIndustry.append("text").text("Slider Value (number of start ups): " + 0).attr("class", "mytext")
    .attr("transform", "translate(" + (width / 2 - 125) + "," + 0 + ")").style("fill", "white")
    function updateGraph() {
      statsIndustry.selectAll(".mytext").remove()
      statsIndustry.append("text").text("Slider Value (number of start ups): " + this.value).attr("class", "mytext")
      .attr("transform", "translate(" + (width / 2 - 125) + "," + 0 + ")").style("fill", "white")
      // console.log(this.value)
      let value = this.value
        // Add dots
      console.log(value)
      statsIndustry.selectAll("circle")
          .attr("id", "myBubbles")
          .style("fill", function (d) { return resetColor(d); } )
        function resetColor(d) {
            if (statsIndustry_y(d.Count) >= statsIndustry_y(value)){
              return "red"
            } else {
              return countColorScale(d.Count)
            }
          }
    }
    textX.attr("fill", "white")
    textY.attr("fill", "white")
    var rMax = d3.max(data, (d) => {return d.Count })
    var r = d3.scaleSqrt().domain([0, rMax]).range([ 0, rMax / 3]);
    statsIndustry.selectAll('#myBubbles')
    .data(data).enter()
    .append('circle')
      .attr("id", "myBubbles")
      .attr("cx", function(d) { 
        return statsIndustry_x(d.title) + 15 })
      .attr("cy", function(d) { return statsIndustry_y(d.Valuation) })
      .attr("r", function(d) { return r(d.Count) })
      .style("fill", d => countColorScale(d.Count))
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
      .on("mousemove", mouseMove)

  }

  //#endregion

  //#region Pie chart



  
  var pie = d3.pie().value(function(d) {return d[1]; })
            .sort(function(a, b) {return d3.descending(a.key, b.key);} )
  data.sort(function(a, b) {return b.Valuation - a.Valuation;});
  let top_5_val_data = data.slice(0,5)
  data.sort(function(a, b) {return b.Count - a.Count;});
  let top_5_count_data = data.slice(0,5)
  let value_pie_data = {}
  let number_pie_data = {}
  let temp_v = 0
  let temp_c = 0
  for(var i = 0; i < 5; i++){
    value_pie_data[top_5_val_data[i].title] = Math.round((top_5_val_data[i].Valuation * 100 / totalValuation) * 100) / 100
    temp_v = temp_v + Math.round((top_5_val_data[i].Valuation * 100 / totalValuation) * 100) / 100
    number_pie_data[top_5_count_data[i].title] = Math.round((top_5_count_data[i].Count * 100 / totalCout) * 100) / 100
    temp_c = temp_c + Math.round((top_5_count_data[i].Count * 100 / totalCout) * 100) / 100
  }
  value_pie_data['Others'] = 100 - temp_v 
  number_pie_data['Others'] = 100 - temp_c 
 const pie_svg_in = d3.select("#pie" + selectedOption).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
  var pie_w = 350,
  height = 450,
  margin = 0;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = pie_w / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var pie_chart = pie_svg_in
  .attr("height", height)
.append("g")
  .attr("transform", `translate(${width / 2 + pie_w / 2}, ${pie_w/2})`);

  // var pie_g = pie_svg_in.append("g").attr("class", "pie_g")
  //     .attr("transform", `translate(${pie_w / 2 + pie_margin.left}, ${pie_w / 2})`)
// create 2 data_set

if (selectedOption == "Industry"){
  d3.select("#pieSelectIndustry").on("change", async function(d) {
    var option = d3.select(this).property("value")
    // console.log(option)
    if (option == "Count"){
      update(value_pie_data)
  
    } else {
    // console.log('afsdddddddddddd')
  
      update(number_pie_data)
  
    }
  })

} else {
  d3.select("#pieSelectCountry").on("change", async function(d) {
    var option = d3.select(this).property("value")
    // console.log(option)
    if (option == "Count"){
      update(value_pie_data)
  
    } else {
    // console.log('afsdddddddddddd')
  
      update(number_pie_data)
  
    }
  })
}

// set the color scale
const color = d3.scaleOrdinal()
// .domain(["a", "b", "c", "d", "e", "f"])
.range(d3.schemeDark2);
  // const color1 = d3.scaleOrdinal().domain(["Others"]).range(d3.schemePaired);
  var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
  var darcGenerator = d3.arc().innerRadius(100).outerRadius(radius)

// A function that create / update the plot for a given variable:
function update(data) {
  console.log(data)
  // var data_count = pie(Object.entries(data))

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d[1]; })
  .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
var data_ready = pie(Object.entries(data))

// map to data
var u = pie_chart.selectAll("path")
  .data(data_ready)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
u
  .join('path')
  .transition()
  .duration(1000)
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data[0])) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 1)
  var t = pie_chart.selectAll("text")
    .data(data_ready)
  t.enter().append('text')
    .text(function(d){
      return d.data[0] +" : "+ + Math.round(d.data[1] * 100) / 100 + "%"})
    .attr("transform", function(d) { return "translate(" + darcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle").style("font-size", 14)

}

// Initialize the plot with the first dataset
update(value_pie_data)


  // var u = pie_g.selectAll("path").data(data_count)
  // u
  //   .join('path')
  //   .attr('d', arcGenerator)
  //   .style("opacity", 0.65)
  //   .attr('fill', function(d){ return(color1(d.data[0])) })
  //   .attr("stroke", "white")
  //   .style("stroke-width", "2px")


  //   var pie_g_2 = pie_svg_in
  //   .append("g")
  //     .attr("class", "pie_g_2")
  //     .attr("transform", `translate(${width / 2 + pie_margin.left + pie_margin.gap}, ${pie_w / 2})`)

  //   var data_value = pie(Object.entries(value_pie_data))
  //   var u = pie_g_2.selectAll("path").data(data_value)
  //   u
  //   .enter()
  //   .append('path')
  //   .merge(u)
  //   .style("opacity", 0.65)
  //   .transition()
  //   .duration(1000)
  //   .attr('d', arcGenerator)
  //   .attr('fill', function(d){ return(color1(d.data[0])) })
  //   .attr("stroke", "white")
  //   .style("stroke-width", "2px")
  //   var t = pie_g_2.selectAll("text")
  //   .data(data_value)
  //   t.enter().append('text')
  //     .text(function(d){return d.data[0] +" : "+ + Math.round(d.data[1] * 100) / 100 + "%"})
  //     .attr("transform", function(d) { return "translate(" + darcGenerator.centroid(d)+ ")";  })
  //     .style("text-anchor", "middle")
  //     .style("font-size", 14)
  //   if (selectedOption == "Industry"){
  //     var title = pie_g.append('text').text("5 Top Industries in Number")
  //     var title_2 = pie_g_2.append('text').text("5 Top Industries in Valuation")
  //   } else {
  //     indx_txt_1.attr("fill", "white")
  //     indx_txt_2.attr("fill", "white")
  //     var title = pie_g.append('text').text("5 Top Countries in Number").attr("fill", "white")
  //     var title_2 = pie_g_2.append('text').text("5 Top Countries in Valuation").attr("fill", "white")
  //   }
  //   title.attr("transform", `translate( ${-120}, ${pie_w / 2})`).style("font-weight", "bold")
  //   title_2.attr("transform", `translate( ${-120}, ${pie_w / 2})`).style("font-weight", "bold")

  //#endregion


}
function drawLastChart(data, selectedOption){

}

