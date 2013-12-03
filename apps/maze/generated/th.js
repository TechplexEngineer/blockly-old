// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly (บล็อค-ลี่)</span><span id="codeTooltip">ดูโค้ด JavaScript ที่ถูกสร้างขึ้น.</span><span id="linkTooltip">บันทึกและเชื่อมโยงไปยังบล็อค</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">เรียกใช้โปรแกรม</span><span id="resetProgram"> ตั้งค่าใหม่</span><span id="dialogOk">OK</span><span id="dialogCancel">Cancel</span><span id="catLogic">Logic</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lists</span><span id="catColour">Colour</span><span id="catVariables">Variables</span><span id="catProcedures">Procedures</span><span id="httpRequestError">มีปัญหาเกี่ยวกับการร้องขอ</span><span id="linkAlert">แบ่งปันบล็อคต่างๆของคุณด้วยลิงก์นี้:\n\n%1</span><span id="hashError">ขอโทษด้วย, \'%1\' ไม่สอดคล้องกับไฟล์ Blockly ที่บันทึกไว้</span><span id="xmlError">ไม่สามารถโหลดไฟล์ที่บันทึกไว้ของคุณได้\nบางทีมันอาจจะถูกสร้างขึ้นด้วย Blockly เวอร์ชันที่แตกต่างกัน?</span><span id="listVariable">list</span><span id="textVariable">text</span></div>';
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
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">เคลื่อน ไปข้างหน้า</span><span id="Maze_turnLeft">หัน ซ้าย</span><span id="Maze_turnRight">หัน ขวา</span><span id="Maze_doCode">ทำ</span><span id="Maze_elseCode">นอกเหนือจากนี้</span><span id="Maze_helpIfElse">คำสั่ง \'ถ้า-นอกเหนือจากนี้\' จะทำสิ่งหนึ่ง หรือ อื่นๆ</span><span id="Maze_pathAhead">ถ้า เส้นทาง ไปข้างหน้า</span><span id="Maze_pathLeft">ถ้า เส้นทาง ไปทางซ้าย</span><span id="Maze_pathRight">ถ้า เส้นทาง ไปทางขวา</span><span id="Maze_repeatUntil">ทำซ้ำจนกว่าจะ</span><span id="Maze_moveForwardTooltip">เคลื่อน Pegman ไปข้างหน้า หนึ่งช่อง.</span><span id="Maze_turnTooltip">หัน Pegman ไปทางซ้ายหรือขวา 90 องศา.</span><span id="Maze_ifTooltip">ถ้ามีเส้นทางไปทางทิศทางที่กำหนด \\nแล้วให้กระทำการบางอย่าง </span><span id="Maze_ifelseTooltip">ถ้ามีเส้นทางไปทางทิศทางที่ระบุ \\nแล้วให้ทำการกระทำต่างๆภายในบล็อคแรก \\nไม่เช่นนั้น ให้ทำการกระทำต่างๆภายในบล็อคที่สอง </span><span id="Maze_whileTooltip">ทำซ้ำทุกการกระทำภายใน จนกว่าจะถึงจุดสิ้นสุด.</span><span id="Maze_capacity0">คุณมีบล็อคเหลือ %0</span><span id="Maze_capacity1">คุณมีบล็อคเหลือ %1</span><span id="Maze_capacity2">คุณมีบล็อคเหลือ %2</span><span id="Maze_nextLevel">ยินดีด้วย! คุณพร้อมที่จะไปต่อที่ระดับ %1 แล้วหรือยัง?</span><span id="Maze_finalLevel">ยินดีด้วย! คุณได้ไขปัญหาในระดับสุดท้ายสำเร็จแล้ว</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">Blockly (บล็อค-ลี่)</a> : เขาวงกต</span> &nbsp; ';
  for (var i163 = 1; i163 < 11; i163++) {
    output += ' ' + ((i163 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i163) + '</span>' : (i163 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i163) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i163) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i163) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i163) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu"></select> &nbsp; <button id="pegmanButton"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button id="codeButton" class="notext" title="ดูโค้ด JavaScript ที่ถูกสร้างขึ้น."><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="บันทึกและเชื่อมโยงไปยังบล็อค"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" title="Makes the player do what the blocks say."><img src="../../media/1x1.gif" class="run icon21"> เรียกใช้โปรแกรม</button><button id="resetButton" class="primary" style="display: none" title="Put the player back at the start of the maze."><img src="../../media/1x1.gif" class="stop icon21">  ตั้งค่าใหม่</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><svg version="1.1" height="1px" width="1px"><text id="arrowTest" style="font-family: sans-serif; font-size: 11pt;">⟲⟳</text></svg><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="help.png"></td><td>&nbsp;</td><td>ต่อบล็อค \'เคลื่อน ไปข้างหน้า\' สองอันเข้าด้วยกัน เพื่อช่วยให้ฉันถึงจุดหมายปลายทาง</td><td valign="top"><img src="help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="help.png"></td><td>&nbsp;</td><td>ในระดับนี้ คุณต้องต่อทุกบล็อคเข้าด้วยกันบนพื้นที่ว่างสีขาว<iframe id="iframeOneTopBlock" src=""></iframe></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>Run your program to see what happens.</td><td rowspan=2><img src="help.png"></td></tr><tr><td><div><img src="help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div><div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>Your program didn\'t solve the maze.  Press \'Reset\' and try again.</td><td rowspan=2><img src="help.png"></td></tr><tr><td><div><img src="help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div><div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="help_up.png"></td><td>คอมพิวเตอร์มีหน่วยความจำที่จำกัด -> ไปให้ถึงปลายทางนี้โดยใช้เพียงสองบล็อค -> ใช้ \'ทำซ้ำ\' เพื่อเรียกใช้บล็อคมากกว่าหนึ่งครั้ง</td><td><img src="help.png"></td></tr></table></div><div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="help.png"></td><td>&nbsp;</td><td>You have used up all the blocks for this level.  To create a new block, you first need to delete an existing block.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="help_up.png"></td><td>ถึงจุดหมายปลายทางโดยใช้เพียงห้าบล็อค</td><td><img src="help.png"></td></tr></table></div><div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="help.png"></td><td>Choose your favourite player from this menu.</td><td><img src="help_up.png"></td></tr></table></div><div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="help_up.png"></td><td>เงื่อนไข \'ถ้า\' จะทำอะไรบางอย่างก็ต่อเมื่อเงื่อนไขเป็นจริงเท่านั้น -> ลองหันซ้ายถ้ามีเส้นทางไปทางซ้าย</td><td><img src="help.png"></td></tr></table></div><div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="help_up.png"></td><td id="helpMenuText">Click on %1 in the \'if\' block to change its condition.</td><td><img src="help.png"></td></tr></table></div><div id="dialogHelpIfElse" class="dialogHiddenContent"><table><tr><td><img src="help_down.png"></td><td>คำสั่ง \'ถ้า-นอกเหนือจากนี้\' จะทำสิ่งหนึ่ง หรือ อื่นๆ</td><td><img src="help.png"></td></tr></table></div><div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="help.png"></td><td>&nbsp;</td><td>คุณสามารถไขปัญหาเขาวงกตที่ซับซ้อนนี้ได้หรือไม่? -> ลองตามผนังด้านซ้ายมือดู' + apps.ok(null, null, opt_ijData) + '</td></tr></table></div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};
