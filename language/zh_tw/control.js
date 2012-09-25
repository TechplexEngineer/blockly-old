/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
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
 * @fileoverview Control blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */

if (!Blockly.Language) Blockly.Language = {};

Blockly.Language.controls_for = {
  // For loop.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_FOR_HELPURL,
  init: function() {
    this.setColour(120);
    //this.appendTitle(Blockly.LANG_CONTROLS_FOR_TITLE_COUNT);
    var input = this.appendInput(Blockly.DUMMY_INPUT, '');
    input.appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_WITH);
    input.appendTitle(new Blockly.FieldVariable(null), 'VAR');
    this.appendInput(Blockly.INPUT_VALUE, 'FROM', Number)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
    this.appendInput(Blockly.INPUT_VALUE, 'TO', Number)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_TO);
    this.appendInput(Blockly.NEXT_STATEMENT, 'DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOR_TOOLTIP_1.replace('%1',
          thisBlock.getTitleText('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleText('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleText('VAR'))) {
      this.setTitleText(newName, 'VAR');
    }
  }
};
