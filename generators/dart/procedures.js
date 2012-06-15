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
 * @fileoverview Generating Dart for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Dart = Blockly.Generator.get('Dart');

Blockly.Dart.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.Dart.variableDB_.getName(this.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Dart.statementToCode(this, 'STACK');
  var returnValue = Blockly.Dart.valueToCode(this, 'RETURN', true) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var returnType = returnValue ? 'dynamic' : 'void';
  var code = returnType + ' ' + funcName + '() {\n' +
      branch + returnValue + '}\n';
  code = Blockly.Dart.scrub_(this, code);
  Blockly.Dart.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Dart.procedures_defnoreturn = Blockly.Dart.procedures_defreturn;

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Dart.procedures_defnoreturn = Blockly.Dart.procedures_defreturn;

Blockly.Dart.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.Dart.variableDB_.getName(this.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var code = funcName + '()';
  return code;
};

Blockly.Dart.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.Dart.variableDB_.getName(this.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var code = funcName + '();\n';
  return code;
};
