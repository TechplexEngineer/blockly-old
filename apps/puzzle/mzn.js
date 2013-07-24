// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof puzzlepage == 'undefined') { var puzzlepage = {}; }


puzzlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="MSG" style="display: none"><span id="country1">استرالیا</span><span id="country1Flag">flag_au.png</span><span id="country1FlagHeight">50</span><span id="country1FlagWidth">100</span><span id="country1Language">اینگلیسی</span><span id="country1City1">ملبورن</span><span id="country1City2">سیدنی</span><span id="country1HelpUrl">http://mzn.wikipedia.org/wiki/استرالیا</span><span id="country2">آلمان</span><span id="country2Flag">flag_de.png</span><span id="country2FlagHeight">60</span><span id="country2FlagWidth">100</span><span id="country2Language">آلمانی</span><span id="country2City1">برلین</span><span id="country2City2">مونیخ</span><span id="country2HelpUrl">http://en.wikipedia.org/wiki/Germany</span><span id="country3">چین</span><span id="country3Flag">flag_cn.png</span><span id="country3FlagHeight">66</span><span id="country3FlagWidth">100</span><span id="country3Language">چینی</span><span id="country3City1">پکن</span><span id="country3City2">شانگهای</span><span id="country3HelpUrl">http://en.wikipedia.org/wiki/China</span><span id="country4">برزیل</span><span id="country4Flag">flag_br.png</span><span id="country4FlagHeight">70</span><span id="country4FlagWidth">100</span><span id="country4Language">پرتغال</span><span id="country4City1">ریو دوژانیرو</span><span id="country4City2">سائوپائولو</span><span id="country4HelpUrl">http://mzn.wikipedia.org/wiki/برزیل</span><span id="flag">پرچم:</span><span id="language">زوون:</span><span id="languageChoose">چینه...</span><span id="cities">شهر:</span><span id="error0">خاره!\nتموم  %1 بلوک\u200Cها درست هسته.</span><span id="error1">تقریباً! اتا بلوک غلطه.</span><span id="error2"> %1 بلوک\u200Cها غلط هستنه.</span><span id="tryAgain">پررنگ بلوک غلطه.\nاَی دِباره تِلاش هاکن.</span></div>';
};


puzzlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<table id="header" width="100%"><tr><td valign="bottom"><h1><span id="title"><a href="../index.html">Blockly</a> : پازل</span></h1></td><td><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select>&nbsp; &nbsp;<button id="helpButton" onclick="Puzzle.showHelp();">کومک</button>&nbsp; &nbsp;<button id="checkButton" class="launch" onclick="Puzzle.checkAnswers();">جوابِ بررسی</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="shadow"></div><div id="help"><div style="padding-bottom: 0.7ex">هر کشور وسّه (سَوز)، وشونِ پرچم پَلی، زوون ره چینه هاکن و ونه شهرون فهرست ره بساز</div><iframe src="help.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '" style="height: 200px; width: 100%; border: none;"></iframe><div class="farSide" style="padding: 1ex 3ex 0"><button id="okButton" onclick="Puzzle.hideHelp()">خا</button></div></div>';
};


puzzlepage.help = function(opt_data, opt_ignored, opt_ijData) {
  return puzzlepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div><div id="notouch"></div>';
};
