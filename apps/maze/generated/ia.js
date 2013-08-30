// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">un ambiente de programmation visual</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Vider le codice JavaScript generate.</span><span id="linkTooltip">Salveguardar e ligar a blocos. </span><span id="runTooltip">Executar le programma definite per le blocos in \\nle spatio de travalio. </span><span id="runProgram">Executar programma</span><span id="resetProgram">Reinitialisar</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logica</span><span id="catLoops">Buclas</span><span id="catMath">Mathematica</span><span id="catText">Texto</span><span id="catLists">Listas</span><span id="catColour">Color</span><span id="catVariables">Variabiles</span><span id="catProcedures">Proceduras</span><span id="httpRequestError">Il habeva un problema con le requesta.</span><span id="linkAlert">Divide tu blocos con iste ligamine:\n\n%1</span><span id="hashError">Infelicemente, \'%1\' non corresponde a alcun programma salveguardate.</span><span id="xmlError">Impossibile cargar le file salveguardate. Pote esser que illo ha essite create con un altere version de Blockly?</span><span id="listVariable">lista</span><span id="textVariable">texto</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">avantiar</span><span id="Maze_turnLeft">girar a sinistra</span><span id="Maze_turnRight">girar a dextra</span><span id="Maze_doCode">face</span><span id="Maze_elseCode">si non</span><span id="Maze_pathAhead">si cammino avante</span><span id="Maze_pathLeft">si cammino a sinistra</span><span id="Maze_pathRight">si cammino a dextra</span><span id="Maze_repeatUntil">repeter usque a</span><span id="Maze_moveForwardTooltip">Face le jocator avantiar un spatio.</span><span id="Maze_turnTooltip">Gira le jocator a sinistra o a dextra de 90 grados.</span><span id="Maze_ifTooltip">Si existe un cammino in le direction \\nspecificate, alora face certe actiones. </span><span id="Maze_ifelseTooltip">Si existe un cammino in le direction \\nspecificate, alora face le prime bloco \\nde actiones. Si non, face le secunde \\nbloco de actiones. </span><span id="Maze_whileTooltip">Repeter le actiones continite usque al puncto de \\nfin. </span><span id="Maze_capacity0">Te resta <span id=\'capacityNumber\'>0</span> blocos.</span><span id="Maze_capacity1">Te resta <span id=\'capacityNumber\'>1</span> bloco.</span><span id="Maze_capacity2">Te resta <span id=\'capacityNumber\'>%1</span> blocos.</span><span id="Maze_nextLevel">Felicitationes! Es tu preste pro le nivello %1?</span><span id="Maze_finalLevel">Felicitationes! Tu ha resolvite le nivello final.</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : Labyrintho</span> &nbsp; ';
  for (var i194 = 1; i194 < 11; i194++) {
    output += ' ' + ((i194 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i194) + '</span>' : (i194 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i194) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i194) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += 'Un programma es un sequentia de blocos. Impila un par de blocos \'avantiar\' pro adjutar me a attinger le fin.';
      break;
    case 2:
      output += 'Qual es le sequentia de passos pro sequer iste cammino?';
      break;
    case 3:
      output += 'Le memoria de computatores es limitate. Attinge le fin de iste cammino con solmente duo blocos. Usa \'repeter\' pro executar un bloco plus de un vice.';
      break;
    case 4:
      output += 'Attinge le fin con solmente cinque blocos.';
      break;
    case 5:
      output += 'Pegman debera girar a sinistra quando ille non pote avantiar toto recte.';
      break;
    case 6:
      output += 'Un bloco \'si\' face qualcosa solmente si le condition es satisfacite. Essaya girar a sinistra si existe un cammino a sinistra.';
      break;
    case 7:
      output += 'Iste labyrintho sembla plus complexe que le previe, ma non lo es.';
      break;
    case 8:
      output += 'Es possibile usar plure blocos \'si\'.';
      break;
    case 9:
      output += 'Un bloco "si/si non" face o le prime cosa o le altere.';
      break;
    case 10:
      output += 'Pote tu solver iste labyrintho complexe? Essaya a sequer le muro sinistre. Programmatores experte solmente!';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="Vider le codice JavaScript generate." onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="Salveguardar e ligar a blocos. " onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="Face le character facer lo que le blocos dice."><img src="../../media/1x1.gif" class="run icon21"> Executar programma</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="Remitter le character al initio del labyrintho."><img src="../../media/1x1.gif" class="stop icon21"> Reinitialisar</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>In iste nivello, tu debe impilar tote le blocos in le spatio de travalio blanc.</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};
