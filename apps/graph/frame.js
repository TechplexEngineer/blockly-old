/**
 * Visual Blocks Language
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
 * @fileoverview Blocks for Graphing Calculator application.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

var MSG = window.parent.MSG;
var toolbox = window.parent.document.getElementById('toolbox');

Blockly.Language.graph_get_x = {
  // x variable getter.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_VARIABLES_GET_TITLE)
        .appendTitle('x');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP);
  }
};

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.graph_get_x = function() {
  // x variable getter.
  return ['x', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Language.graph_set_y = {
  // y variable setter.
  helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
  deletable: false,
  init: function() {
    this.setColour(330);
    this.appendValueInput('VALUE')
        .appendTitle(Blockly.LANG_VARIABLES_SET_TITLE)
        .appendTitle('y');
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP);
  }
};

Blockly.JavaScript.graph_set_y = function() {
  // y variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '';
  return argument0 + ';';
};

/**
 * Initialize Blockly.
 */
function init() {
  Blockly.inject(document.body, {path: '../../', toolbox: toolbox});

  if (window.parent.Graph) {
    // Let the top-level application know that Blockly is ready.
    window.parent.Graph.init(Blockly);
  } else {
    // Attempt to diagnose the problem.
    var msg = 'Error: Unable to communicate between frames.\n\n';
    if (window.parent == window) {
      msg += 'Try loading index.html instead of frame.html';
    } else if (window.location.protocol == 'file:') {
      msg += 'This may be due to a security restriction preventing\n' +
          'access when using the file:// protocol.\n' +
          'http://code.google.com/p/chromium/issues/detail?id=47416';
    }
    alert(msg);
  }
}
