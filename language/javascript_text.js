/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/google-blockly/
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
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.text = function() {
  // Text value.
  return Blockly.JavaScript.quote_(this.getTitleText(1));
};

Blockly.JavaScript.text_length = function() {
  // String length.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0) || '\'\'';
  return argument0 + '.length';
};

Blockly.JavaScript.text_isEmpty = function() {
  // Is the string null?
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0) || '\'\'';
  return '!' + argument0 + '.length';
};

Blockly.JavaScript.text_charAt = function(opt_dropParens) {
  // Indexing into a string is the same as indexing into a list.
  return Blockly.JavaScript.lists_getIndex.call(this, opt_dropParens);
};

Blockly.JavaScript.text_changecase = function() {
  // Change capitalization.
  var operator = Blockly.JavaScript.text_changecase.MAP_[this.getValueLabel(0)];
  var code;
  if (operator) {
    // Upper and lower case are functions built into JavaScript.
    var argument0 = Blockly.JavaScript.valueToCode_(this, 0) || '\'\'';
    code = argument0 + '.' + operator + '()';
  } else {
    if (!Blockly.JavaScript.definitions_['toTitleCase']) {
      // Title case is not a native JavaScript function.  Define one.
      var func = [];
      func.push('function Blockly_toTitleCase(str) {');
      func.push('  return str.replace(/\\w\\S*/g,');
      func.push('      function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});');
      func.push('}');
      Blockly.JavaScript.definitions_['toTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.JavaScript.valueToCode_(this, 0, true) || '\'\'';
    code = 'Blockly_toTitleCase(' + argument0 + ')';
  }
  return code;
};

Blockly.JavaScript.text_changecase.MAP_ = {};
Blockly.JavaScript.text_changecase.MAP_[Blockly.Language.text_changecase.MSG_UPPERCASE] = 'toUpperCase';
Blockly.JavaScript.text_changecase.MAP_[Blockly.Language.text_changecase.MSG_LOWERCASE] = 'toLowerCase';
Blockly.JavaScript.text_changecase.MAP_[Blockly.Language.text_changecase.MSG_UPPERCASE] = null;

Blockly.JavaScript.text_print = function() {
  // Print statement.
  var argument0 = Blockly.JavaScript.valueToCode_(this, 0, true) || '\'\'';
  return 'window.alert(' + argument0 + ');\n';
};
