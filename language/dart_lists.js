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
 * @fileoverview Generating Dart for list blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Dart = Blockly.Generator.get('Dart');


Blockly.Dart.getIndex = function() {
  // Get element at index.
  var argument0 = Blockly.Dart.valueToCode_(this, 0) || '[]';
  var argument1 = Blockly.Dart.valueToCode_(this, 1) || '1';
  // Blockly uses one-based arrays.
  if (argument1.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument1 = parseInt(argument1, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument1 += ' - 1';
  }
  var code = argument0 + '[' + argument1 + ']';
  return Blockly.Dart.scrub_(this, code);
};
