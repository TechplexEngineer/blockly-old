// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">אוסטרליה</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">אנגלית</span><span id="country1City1">מלבורן</span><span id="country1City2">סידני</span><span id="country1HelpUrl">https://he.wikipedia.org/wiki/אוסטרליה</span><span id="country2">גרמניה</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">גרמנית</span><span id="country2City1">ברלין</span><span id="country2City2">מינכן</span><span id="country2HelpUrl">https://he.wikipedia.org/wiki/גרמניה</span><span id="country3">סין</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">סינית</span><span id="country3City1">בייג\'ינג</span><span id="country3City2">שאנגחאי</span><span id="country3HelpUrl">https://he.wikipedia.org/wiki/הרפובליקה_העממית_של_סין</span><span id="country4">ברזיל</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">פורטוגזית</span><span id="country4City1">ריו דה ז\'ניירו</span><span id="country4City2">סאו פאולו</span><span id="country4HelpUrl">https://he.wikipedia.org/wiki/ברזיל</span><span id="flag">דגל:</span><span id="language">שפה:</span><span id="languageChoose">בחירה...</span><span id="cities">ערים:</span><span id="error0">מושלם!\nכל %1 הבלוקים נכונים.</span><span id="error1">כמעט! בלוק אחד לא נכון.</span><span id="error2">%1 בלוקים אינם נכונים.</span><span id="tryAgain">הבלוק המודגש אינו נכון.\nנסו שוב.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : פאזל</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp(true);">עזרה</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">בדיקת התשובות</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="helpBorder"></div><div id="help"><div style="padding-bottom: 0.7ex">בשביל כל מדינה (בירוק), צרפו את הדגל, בחרו את השפה, ועשו ערימה של הערים שלה.</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp(true)">אישור</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};
