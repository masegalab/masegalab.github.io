---
layout: home
title: Network Chart
---

<link href="https://rawgithub.com/poderopedia/panama-network/master/css/index.css" rel="stylesheet">
<script src="https://rawgithub.com/poderopedia/panama-network/master/js/lib/d3.min.js"></script>
<script src="https://rawgithub.com/poderopedia/panama-network/master/src/pty.js"></script>
<link href="https://rawgithub.com/poderopedia/panama-network/master/css/font-awesome.min.css" rel="stylesheet">

<div>
    <h1 class="text-center"> A Network Chart</h1>
</div>

<div class="row" style="margin-top:1cm">
    <div class="col-lg-8 col-lg-offset-2">
        <div id="demo"></div>
    </div>
</div>

<div class="project-review" style="margin-top:1.5cm; margin-left:4cm;margin-right:4cm;">

    <p style="margin-bottom:0.5cm;">
        Masega developed a web tool for <a href:"http://www.poderopedia.org/"> Poderopedia Foundation </a> aimed at visualizing the influence networks of candidates for the Panama 2014 elections. The application is based on our Network-Chart script (link to demo).
    </p>

    <img src="/../panama1.jpg" style="height:8cm;"/>

    <p style="margin-top:0.5cm; margin-bottom:0.5cm;">
        The above is a partial view of the relation map of candidate Marta Linares. Below, a closer look at the relation map of Presidential candidate José Domingo Arias.
    </p>

    <img src="/../panama2.jpg" style="height:8cm">

    <p style="margin-top:0.5cm">
        The project is hosted at this <a href:"http://candidatos2014.prensa.com/"> URL </a>.
    </p>

</div>

<div class="row" style="margin-top:1cm">
    <div class="col-lg-8 col-lg-offset-2">
        <div id="huge-demo"></div>
    </div>
</div>



<script>
d3.json('https://rawgithub.com/poderopedia/panama-network/master/data/A.json', function(error, data) {

    if (error) { return error; }

    var width = parseInt(d3.select('#demo').style('width'), 10),
        height = 400;

    var legend = [
        {name: 'Persona',     type: 'persona'},
        {name: 'Candidato',   type: 'candidato'},
        {name: 'Institución', type: 'institucion'}
    ];

    var chart01 = pty.chart.network()
        .width(width)
        .height(height)
        .nodeRadius(15)
        .nodeLabel(function(d) { return d.name; })
        .nodeClass(function(d) { return d.type; })
        .nodeBaseURL(function(d) { return 'https://rawgithub.com/poderopedia/panama-network/master/data/' + d.id + '.json'; })
        .nodeURL(function(d) { return 'https://rawgithub.com/poderopedia/panama-network/master/pages/' + d.id; })
        .legendItems(legend);

    d3.select('div#demo').data([data]).call(chart01);
});
</script>

<script>
d3.json('https://rawgithub.com/poderopedia/panama-network/master/data/A.json', function(error, data) {

    if (error) { return error; }

    var width = parseInt(d3.select('#huge-demo').style('width'), 10),
        height = 400; 

    var chart01 = pty.chart.network()
        .width(width)
        .height(height)
        .nodeRadius(15)
        .nodeClass(function(d) { return d.type; })
        .nodeBaseURL(function(d) { return 'https://rawgithub.com/poderopedia/panama-network/master/data/' + d.id + '.json'; });
        

    d3.select('div#huge-demo').data([data]).call(chart01);
});
</script>