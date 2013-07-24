// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">Austrália</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">Inglês</span><span id="country1City1">Melbourne</span><span id="country1City2">Sidney</span><span id="country1HelpUrl">http://pt.wikipedia.org/wiki/Austr%C3%A1lia</span><span id="country2">Alemanha</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">Alemão</span><span id="country2City1">Berlim</span><span id="country2City2">Munique</span><span id="country2HelpUrl">http://pt.wikipedia.org/wiki/Alemanha</span><span id="country3">China</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">Chinês</span><span id="country3City1">Pequim</span><span id="country3City2">Xangai</span><span id="country3HelpUrl">http://pt.wikipedia.org/wiki/Rep%C3%BAblica_Popular_da_China</span><span id="country4">Brasil</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">Português</span><span id="country4City1">Rio de Janeiro</span><span id="country4City2">São Paulo</span><span id="country4HelpUrl">http://pt.wikipedia.org/wiki/Brasil</span><span id="flag">bandeira:</span><span id="language">língua:</span><span id="languageChoose">escolha...</span><span id="cities">cidades:</span><span id="error0">Perfeito!\nTodos os %1 blocos estão corretos.</span><span id="error1">Quase! Um bloco está incorreto.</span><span id="error2">%1 blocos estão incorretos.</span><span id="tryAgain">O bloco destacado está incorreto. Continue tentando.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : Puzzle</span></h1></td><td><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp();">Ajuda</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">Checar respostas</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="help"><div style="padding-bottom: 0.7ex">Para cada país (verde), anexe sua bandeira, escolha seu idioma, e agrupe suas cidades.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp()">OK</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};
