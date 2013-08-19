/**
 * Blockly Apps: Code
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code application.
 * @author fraser@google.com (Neil Fraser)
 */

// Supported languages.
BlocklyApps.LANGUAGES = {
  // Format: ['Language name', 'direction', 'XX_compressed.js']
  en: ['English', 'ltr', 'en_compressed.js'],
  de: ['Deutsch', 'ltr', 'de_compressed.js'],
  hu: ['Magyar', 'ltr', 'en_compressed.js'],
  vi: ['Tiếng Việt', 'ltr', 'vi_compressed.js'],
  'zh-tw': ['中國的', 'ltr', 'zh_tw_compressed.js']
};
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'javascript', 'python', 'xml'];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
Code.tabClick = function(id) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(BlocklyApps.getMsg('Code_badXml').replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

  // Deselect all tabs and hide all panes.
  for (var x in Code.TABS_) {
    var name = Code.TABS_[x];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = id.replace('tab_', '');
  document.getElementById(id).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + Code.selected).style.visibility =
      'visible';
  Code.renderContent();
  Blockly.fireUiEvent(window, 'resize');
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    var code = Blockly.Generator.workspaceToCode('JavaScript');
    if (typeof prettyPrintOne == 'function') {
      code = prettyPrintOne(code, 'js');
    }
    content.innerHTML = code;
  } else if (content.id == 'content_python') {
    code = Blockly.Generator.workspaceToCode('Python');
    if (typeof prettyPrintOne == 'function') {
      code = prettyPrintOne(code, 'py');
    }
    content.innerHTML = code;
  }
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.LANGUAGES[BlocklyApps.LANG][1] == 'rtl';
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('content_blocks'),
      {path: '../../',
       rtl: rtl,
       toolbox: toolbox});

  // Add to reserved word list: Local variables in execution evironment (runJS)
  // and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var top = BlocklyApps.getBBox_(container).y + 'px';
    // Deselect all tabs and hide all panes.
    for (var x in Code.TABS_) {
      document.getElementById('content_' + Code.TABS_[x]).style.top = top;
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.Toolbox.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Blockly.Toolbox.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  BlocklyApps.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  }

  Code.tabClick('tab_' + Code.selected);
  Blockly.fireUiEvent(window, 'resize');

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
};

window.addEventListener('load', Code.init);

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code.runJS = function() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
  var timeouts = 0;
  var checkTimeout = function() {
    if (timeouts++ > 1000000) {
      throw BlocklyApps.getMsg('Code_timeout');
    }
  };
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(BlocklyApps.getMsg('Code_badCode').replace('%1', e));
  }
};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(BlocklyApps.getMsg('Code_discard').replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
};
