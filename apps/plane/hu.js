// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof planepage == 'undefined') { var planepage = {}; }


planepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="MSG" style="display: none"><span id="rows">Sorok száma: %1</span><span id="getRows">Sorok száma (%1)</span><span id="rows1">1. osztály: %1 sor</span><span id="getRows1">1. osztály sorai (%1)</span><span id="rows2">2. osztály: %1 sor</span><span id="getRows2">2. osztály sorai (%1)</span><span id="seats">Ülések száma összesen: %1</span><span id="setSeats">Ülések száma =</span></div><div style="display: none;"><select id="languageMenu" onchange="Plane.changeLanguage();"></select></div><h1><span id="title"><a href="../index.html"><span id="blocklyName">Blockly</span></a> : Repülőgép</span> &nbsp; ';
  for (var i34 = 1; i34 < 4; i34++) {
    output += ' ' + ((i34 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i34) + '</span>' : (i34 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i34) + '">' + soy.$$escapeHtml(i34) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i34) + '">' + soy.$$escapeHtml(i34) + '</a>');
  }
  output += '</h1><script type="text/javascript" src="../slider.js"><\/script><svg id="plane" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="600" height="256" viewBox="0 142 600 256"><defs><g id="row1st"><rect class="seat1st" width="10" height="10" x="75" y="245" /><rect class="seat1st" width="10" height="10" x="75" y="256" /><rect class="seat1st" width="10" height="10" x="75" y="274" /><rect class="seat1st" width="10" height="10" x="75" y="285" /></g><g id="row2nd"><rect class="seat2nd" width="10" height="8" x="75" y="245" /><rect class="seat2nd" width="10" height="8" x="75" y="253" /><rect class="seat2nd" width="10" height="8" x="75" y="271" /><rect class="seat2nd" width="10" height="8" x="75" y="279" /><rect class="seat2nd" width="10" height="8" x="75" y="287" /></g><linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0" /><stop offset="100%" style="stop-color:#fff;stop-opacity:1" /></linearGradient><linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0" /><stop offset="100%" style="stop-color:#fff;stop-opacity:1" /></linearGradient></defs><path d="M 404,1 373,15 230,244 230,297 373,524 404,542 330,351 330,189 z" id="wing" /><path d="m 577,269 22,-93 -27,6 -44,88 44,88 27,6 z" id="tail" /><path d="m 483,296 h -407 c -38,0 -75,-13 -75,-26 c 0,-13 38,-26 75,-26 h 407 l 94,24 z" id="fuselage" /><rect width="610" height="100" x="-5" y="142" fill="url(#grad1)" /><rect width="610" height="100" x="-5" y="298" fill="url(#grad2)" /><text id="row1stText" x="55" y="380"></text><text id="row2ndText" x="350" y="380"></text><text x="55" y="210"><tspan id="seatText"></tspan><tspan id="seatYes" style="fill: #0c0;" dy="10">&#x2713;</tspan><tspan id="seatNo" style="fill: #f00;" dy="10">&#x2717;</tspan></text>' + ((opt_ijData.level > 1) ? '<rect id="crew_right" class="crew" width="10" height="10" x="35" y="256" /><rect id="crew_left" class="crew" width="10" height="10" x="35" y="274" />' : '') + '</svg><p>';
  switch (opt_ijData.level) {
    case 1:
      output += 'Egy repülőgépnek az utasok több sorban ülnek az utastérben.  Az utastér minden sorában négy szék van.';
      break;
    case 2:
      output += 'Egy repülőgépnek 2 ülése van a pilótafülkében (a pliótának és a másodpilótának), az utasok több sorban ülnek az utastérben.  Az utastér minden sorában négy szék van.';
      break;
    case 3:
      output += 'An airplane has two seats in the flight deck (for the pilot and co-pilot), and a number of rows of 1st class and 2nd class passenger seats.  Each 1st class row contains four seats. Each 2nd class row contains five seats.';
      break;
  }
  output += '</p><p>Készítsd el a képletet (lent) amivel kiszámolható, hogy hány ülés van összesen a repülőgépen annak függvényében, ahogy (fent) állítod a sorok számát.</p><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + planepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>';
  return output;
};


planepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_arithmetic"><title name="OP">MULTIPLY</title></block>' + ((opt_ijData.level <= 2) ? '<block type="plane_get_rows"></block>' : '<block type="plane_get_rows1st"></block><block type="plane_get_rows2nd"></block>') + '</xml>';
};
