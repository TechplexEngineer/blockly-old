// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">一个可视化编程环境</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">查看生成的JavaScript代码。</span><span id="linkTooltip">保存模块并生成链接。</span><span id="runTooltip">于工作区中运行块所定义的程式。</span><span id="runProgram">运行程序</span><span id="resetProgram">重置</span><span id="dialogOk">确认</span><span id="dialogCancel">Cancel</span><span id="catLogic">逻辑</span><span id="catLoops">循环</span><span id="catMath">数学</span><span id="catText">文本</span><span id="catLists">列表</span><span id="catColour">颜色</span><span id="catVariables">变量</span><span id="catProcedures">程序</span><span id="httpRequestError">请求存在问题。</span><span id="linkAlert">点击链接分享您的模块：\n\n%1</span><span id="hashError">对不起，没有任何已保存的程序对应\'%1\' 。</span><span id="xmlError">无法载入您保存的文件。您是否是使用其他版本的Blockly创建的？</span><span id="listVariable">列表</span><span id="textVariable">文本</span></div>';
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
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">确认</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof mazepage == 'undefined') { var mazepage = {}; }


mazepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Maze_moveForward">向前移动</span><span id="Maze_turnLeft">向左转</span><span id="Maze_turnRight">向右转</span><span id="Maze_doCode">执行</span><span id="Maze_elseCode">其他</span><span id="Maze_pathAhead">如前方有路</span><span id="Maze_pathLeft">如果路径向左</span><span id="Maze_pathRight">如果路径向右</span><span id="Maze_repeatUntil">重复直到</span><span id="Maze_moveForwardTooltip">小人前移1步</span><span id="Maze_turnTooltip">将小人向左或向右转动90度</span><span id="Maze_ifTooltip">如果在某一指定方向存在路径，那么执行特定操作。</span><span id="Maze_ifelseTooltip">若某方向有路可行，就去执行第一个块指定的动作。若否，执行第二个块指定的动作。.</span><span id="Maze_whileTooltip">重复包含的动作直至到达终点。</span><span id="Maze_capacity0">你还有%0个块。</span><span id="Maze_capacity1">你还有%1块。</span><span id="Maze_capacity2">你还有%2块。</span><span id="Maze_nextLevel">恭喜！你准备好前进至第%1级别了吗?</span><span id="Maze_finalLevel">恭喜！你已完成最终关卡。</span></div>';
};


mazepage.start = function(opt_data, opt_ignored, opt_ijData) {
  var output = mazepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly</a> : 迷宫</span> &nbsp; ';
  for (var i158 = 1; i158 < 11; i158++) {
    output += ' ' + ((i158 == opt_ijData.level) ? '<span class="tab" id="selected">' + soy.$$escapeHtml(i158) + '</span>' : (i158 < opt_ijData.level) ? '<a class="tab previous" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>' : '<a class="tab" href="?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '&level=' + soy.$$escapeHtml(i158) + '&skin=' + soy.$$escapeHtml(opt_ijData.skin) + '">' + soy.$$escapeHtml(i158) + '</a>');
  }
  output += '</h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select> &nbsp; <button id="pegmanButton" onmousedown="Maze.showPegmanMenu();"><img src="../../media/1x1.gif"><span>&#x25BE;</span></button></td></tr></table><div id="visualization"><div id="hintBubble"><div id="hint">';
  switch (opt_ijData.level) {
    case 1:
      output += '程序是由一系列模块组成的。将数个“前移”模块堆砌起来，帮助我实现目标。';
      break;
    case 2:
      output += '要沿着该路径行走，应该以何种顺序完成各步骤？';
      break;
    case 3:
      output += '计算机的内存有限。仅适用两个模块来达到此路径的终点。使用“重复”来再次运行某一模块。';
      break;
    case 4:
      output += '仅使用5个模块来达成目标。';
      break;
    case 5:
      output += '小人在无法直行时将会左转。';
      break;
    case 6:
      output += '“if”模块只有在条件为真时才会执行。尝试在有向左路径时左转。';
      break;
    case 7:
      output += '这个迷宫看起来比先前的那个要复杂，但并不是。';
      break;
    case 8:
      output += '你可以使用不止一个“if”模块。';
      break;
    case 9:
      output += '“If-else”模块可以在两种事件中选择。';
      break;
    case 10:
      output += '你能否解开这个复杂的迷宫？尝试沿着左手边的墙壁行走。仅限高级程序员！';
      break;
  }
  output += '</div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="450px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><button class="notext" title="查看生成的JavaScript代码。" onclick="BlocklyApps.showCode(this);"><img src="../../media/1x1.gif" class="code icon21"></button><button id="linkButton" class="notext" title="保存模块并生成链接。" onclick="BlocklyStorage.link();"><img src="../../media/1x1.gif" class="link icon21"></button></td><td><button id="runButton" class="primary" onclick="Maze.runButtonClick();" title="让人物按照块的指令去做。"><img src="../../media/1x1.gif" class="run icon21"> 运行程序</button><button id="resetButton" class="primary" onclick="Maze.resetButtonClick();" style="display: none" title="将人物放在迷宫前端。"><img src="../../media/1x1.gif" class="stop icon21"> 重置</button></td></tr></table><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + mazepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div><div id="pegmanMenu"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData) + '<div id="dialogDone" class="dialogHiddenContent"><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><img src="../../media/1x1.gif" id="pegSpin"><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"></div></div><div id="dialogOneTopBlock" class="dialogHiddenContent"><div>在此关，你需要于白色的工作区中堆叠所有块。</div><iframe id="iframeOneTopBlock" src=""></iframe>' + apps.ok(null, null, opt_ijData) + '</div>';
  return output;
};


mazepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none;"><block type="maze_moveForward"></block><block type="maze_turn"><title name="DIR">turnLeft</title></block><block type="maze_turn"><title name="DIR">turnRight</title></block>' + ((opt_ijData.level > 2) ? '<block type="maze_forever"></block>' + ((opt_ijData.level == 6) ? '<block type="maze_if"><title name="DIR">isPathLeft</title></block>' : (opt_ijData.level > 6) ? '<block type="maze_if"></block>' + ((opt_ijData.level > 8) ? '<block type="maze_ifElse"></block>' : '') : '') : '') + '</xml>';
};


mazepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return mazepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script><div id="blockly"></div>';
};
