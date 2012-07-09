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
 * @fileoverview Generating Dart for math blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Dart = Blockly.Generator.get('Dart');

Blockly.Dart.math_number = function() {
  // Numeric value.
  var code = window.parseFloat(this.getTitleText('NUM'));
  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
      Blockly.Dart.ORDER_UNARY_PREFIX : Blockly.Dart.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Dart.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getTitleValue('OP');
  var tuple = Blockly.JavaScript.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Dart.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Dart.valueToCode(this, 'B', order) || '0';
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Dart.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Dart.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.Dart.ORDER_ADDITIVE],
  MINUS: [' - ', Blockly.Dart.ORDER_ADDITIVE],
  MULTIPLY: [' * ', Blockly.Dart.ORDER_MULTIPLICATIVE],
  DIVIDE: [' / ', Blockly.Dart.ORDER_MULTIPLICATIVE],
  POWER: [null, Blockly.Dart.ORDER_NONE]
};

Blockly.Dart.math_change = function() {
  // Add to a variable in place.
  var argument0 = Blockly.Dart.valueToCode(this, 'DELTA',
      Blockly.Dart.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Dart.variableDB_.getName(this.getTitleText('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = (' + varName + ' is num ? ' + varName + ' : 0) + ' +
      argument0 + ';\n';
};

Blockly.Dart.math_single = function() {
  // Math operators with single operand.
  var operator = this.getTitleValue('OP');
  var code;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedents.
    var argument = Blockly.Dart.valueToCode(this, 'NUM',
        Blockly.Dart.ORDER_UNARY_PREFIX) || '0';
    if (argument.charAt(0) == '-') {
      // --3 is not legal in Dart.
      argument = ' ' + argument;
    }
    code = '-' + argument;
    return [code, Blockly.Dart.ORDER_UNARY_PREFIX];
  }
  var argNaked = Blockly.Dart.valueToCode(this, 'NUM',
      Blockly.Dart.ORDER_NONE) || '0';
  var argMultiplicative = Blockly.Dart.valueToCode(this, 'NUM',
      Blockly.Dart.ORDER_MULTIPLICATIVE) || '0';
  var argPostfix = Blockly.Dart.valueToCode(this, 'NUM',
      Blockly.Dart.ORDER_UNARY_POSTFIX) || '0';
  // First, handle cases which generate values that don't need parentheses.
  switch (operator) {
    case 'ABS':
      code = argPostfix + '.abs()';
      break;
    case 'ROOT':
      code = 'Math.sqrt(' + argNaked + ')';
      break;
    case 'LN':
      code = 'Math.log(' + argNaked + ')';
      break;
    case 'EXP':
      code = 'Math.exp(' + argNaked + ')';
      break;
    case '10POW':
      code = 'Math.pow(10,' + argNaked + ')';
    case 'ROUND':
      code = argPostfix + '.round()';
      break;
    case 'ROUNDUP':
      code = argPostfix + '.ceil()';
      break;
    case 'ROUNDDOWN':
      operator = argPostfix + '.floor()';
      break;
    case 'SIN':
      code = 'Math.sin(' + argMultiplicative + ' / 180 * Math.PI)';
      break;
    case 'COS':
      code = 'Math.cos(' + argMultiplicative + ' / 180 * Math.PI)';
      break;
    case 'TAN':
      code = 'Math.tan(' + argMultiplicative + ' / 180 * Math.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.Dart.ORDER_UNARY_POSTFIX];
  }
  // Second, handle cases which generate values that may need parentheses.
  switch (operator) {
    case 'LOG10':
      code = 'Math.log(' + argNaked + ') / Math.log(10)';
      break;
    case 'ASIN':
      code = 'Math.asin(' + argNaked + ') / Math.PI * 180';
      break;
    case 'ACOS':
      code = 'Math.acos(' + argNaked + ') / Math.PI * 180';
      break;
    case 'ATAN':
      code = 'Math.atan(' + argNaked + ') / Math.PI * 180';
      break;
    default:
      throw 'Unknown math operator.';
  }
  return [code, Blockly.Dart.ORDER_MULTIPLICATIVE];
};

// Rounding functions have a single operand.
Blockly.Dart.math_round = Blockly.Dart.math_single;
// Trigonometry functions have a single operand.
Blockly.Dart.math_trig = Blockly.Dart.math_single;

Blockly.Dart.math_on_list = function() {
  // Math functions for lists.
  func = this.getTitleValue('OP');
  list = Blockly.Dart.valueToCode(this, 'LIST',
      Blockly.Dart.ORDER_NONE) || '[]';
  var code;
  switch (func) {
    case 'SUM':
      if (!Blockly.Dart.definitions_['math_sum']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_sum', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_sum = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(List myList) {');
        func.push('  var sumVal = 0;');
        func.push('  myList.forEach((num entry) {sumVal += entry;});');
        func.push('  return sumVal;');
        func.push('}');
        Blockly.Dart.definitions_['math_sum'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_sum + '(' + list + ')';
      break;
    case 'MIN':
      if (!Blockly.Dart.definitions_['math_min']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_min', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_min = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(List myList) {');
        func.push('  if (myList.isEmpty()) return;');
        func.push('  var minVal = myList[0];');
        func.push('  myList.forEach((num entry) {minVal = Math.min(minVal, entry);});');
        func.push('  return minVal;');
        func.push('}');
        Blockly.Dart.definitions_['math_min'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_min + '(' + list + ')';
      break;
    case 'MAX':
      if (!Blockly.Dart.definitions_['math_max']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_max', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_max = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(List myList) {');
        func.push('  if (myList.isEmpty()) return;');
        func.push('  var maxVal = myList[0];');
        func.push('  myList.forEach((num entry) {maxVal = Math.max(maxVal, entry);});');
        func.push('  return maxVal;');
        func.push('}');
        Blockly.Dart.definitions_['math_max'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_max + '(' + list + ')';
      break;
    case 'AVERAGE':
      if (!Blockly.Dart.definitions_['math_average']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_average', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_average = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(List myList) {');
        func.push('  if (myList.isEmpty()) return;');
        func.push('  var sumVal = 0;');
        func.push('  myList.forEach((num entry) {sumVal += entry;});');
        func.push('  return sumVal / myList.length;');
        func.push('}');
        Blockly.Dart.definitions_['math_average'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_average + '(' + list + ')';
      break;
    case 'MEDIAN':
      if (!Blockly.Dart.definitions_['math_median']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_median', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_median = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(List myList) {');
        func.push('  // First filter list for numbers only, then sort, then return middle value');
        func.push('  // or the average of two middle values if list has an even number of elements.');
        func.push('  List localList = myList.filter((a) => a is num);');
        func.push('  if (localList.isEmpty()) return;');
        func.push('  localList.sort((a, b) => (a - b));');
        func.push('  int index = (localList.length / 2).toInt();');
        func.push('  if (localList.length.isOdd()) {');
        func.push('    return localList[index];');
        func.push('  } else {');
        func.push('    return (localList[index - 1] + localList[index]) / 2;');
        func.push('  }');
        func.push('}');
        Blockly.Dart.definitions_['math_median'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_median + '(' + list + ')';
      break;
    case 'MODE':
      if (!Blockly.Dart.definitions_['math_modes']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_modes', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_modes = functionName;
        // As a list of numbers can contain more than one mode,
        // the returned result is provided as an array.
        // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
        var func = [];
        func.push('Dynamic ' + functionName + '(values) {');
        func.push('  var modes = [];');
        func.push('  var counts = [];');
        func.push('  var maxCount = 0;');
        func.push('  for (var i = 0; i < values.length; i++) {');
        func.push('    var value = values[i];');
        func.push('    var found = false;');
        func.push('    var thisCount;');
        func.push('    for (var j = 0; j < counts.length; j++) {');
        func.push('      if (counts[j][0] === value) {');
        func.push('        thisCount = ++counts[j][1];');
        func.push('        found = true;');
        func.push('        break;');
        func.push('      }');
        func.push('    }');
        func.push('    if (!found) {');
        func.push('      counts.add([value, 1]);');
        func.push('      thisCount = 1;');
        func.push('    }');
        func.push('    maxCount = Math.max(thisCount, maxCount);');
        func.push('  }');
        func.push('  for (var j = 0; j < counts.length; j++) {');
        func.push('    if (counts[j][1] == maxCount) {');
        func.push('        modes.add(counts[j][0]);');
        func.push('    }');
        func.push('  }');
        func.push('  return modes;');
        func.push('}');
        Blockly.Dart.definitions_['math_modes'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_modes + '(' + list + ')';
      break;
    case 'STD_DEV':
      if (!Blockly.Dart.definitions_['math_standard_deviation']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_standard_deviation', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_standard_deviation = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(myList) {');
        func.push('  List numbers = myList.filter((a) => a is num);');
        func.push('  if (numbers.isEmpty()) return;');
        func.push('  var n = numbers.length;');
        func.push('  var sum = 0;');
        func.push('  numbers.forEach((x) => sum += x);');
        func.push('  var mean = sum / n;');
        func.push('  var sumSquare = 0;');
        func.push('  numbers.forEach((x) => sumSquare += Math.pow(x - mean, 2));');
        func.push('  var standard_dev = Math.sqrt(sumSquare / n);');
        func.push('  return standard_dev;');
        func.push('}');
        Blockly.Dart.definitions_['math_standard_deviation'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_standard_deviation + '(' + list + ')';
      break;
    case 'RANDOM':
      if (!Blockly.Dart.definitions_['math_random_item']) {
        var functionName = Blockly.Dart.variableDB_.getDistinctName(
            'math_random_item', Blockly.Generator.NAME_TYPE);
        Blockly.Dart.math_on_list.math_random_item = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(List myList) {');
        func.push('  int x = (Math.random() * myList.length).floor().toInt();');
        func.push('  return myList[x];');
        func.push('}');
        Blockly.Dart.definitions_['math_random_item'] = func.join('\n');
      }
      code = Blockly.Dart.math_on_list.math_random_item + '(' + list + ')';
      break;
    default:
      throw 'Unknown operator.';
  }
  return [code, Blockly.Dart.ORDER_UNARY_POSTFIX];
};

Blockly.Dart.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.Dart.valueToCode(this, 'VALUE',
      Blockly.Dart.ORDER_NONE) || '0';
  var argument1 = Blockly.Dart.valueToCode(this, 'LOW',
      Blockly.Dart.ORDER_NONE) || '0';
  var argument2 = Blockly.Dart.valueToCode(this, 'HIGH',
      Blockly.Dart.ORDER_NONE) || '0';
  var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' + argument2 + ')';
  return [code, Blockly.Dart.ORDER_UNARY_POSTFIX];
};

Blockly.Dart.math_modulo = function() {
  // Remainder computation.
  var argument0 = Blockly.Dart.valueToCode(this, 'DIVIDEND',
      Blockly.Dart.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.Dart.valueToCode(this, 'DIVISOR',
      Blockly.Dart.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Dart.ORDER_MULTIPLICATIVE];
};

Blockly.Dart.math_random_int = function() {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Dart.valueToCode(this, 'FROM',
      Blockly.Dart.ORDER_NONE) || '0';
  var argument1 = Blockly.Dart.valueToCode(this, 'TO',
      Blockly.Dart.ORDER_NONE) || '0';
  if (!Blockly.Dart.definitions_['math_random_int']) {
    var functionName = Blockly.Dart.variableDB_.getDistinctName(
        'math_random_int', Blockly.Generator.NAME_TYPE);
    Blockly.Dart.math_random_int.random_function = functionName;
    var func = [];
    func.push('Dynamic ' + functionName + '( myList) {');
    func.push('  if (a > b) {');
    func.push('    // Swap a and b to ensure a is smaller.');
    func.push('    var c = a;');
    func.push('    a = b;');
    func.push('    b = c;');
    func.push('  }');
    func.push('  return (Math.random() * (b - a + 1) + a).floor();');
    func.push('}');
    Blockly.Dart.definitions_['math_random_int'] = func.join('\n');
  }
  code = Blockly.Dart.math_random_int.random_function +
      '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Dart.ORDER_UNARY_POSTFIX];
};

Blockly.Dart.math_random_float = function() {
  // Random fraction between 0 and 1.
  return ['Math.random()', Blockly.Dart.ORDER_UNARY_POSTFIX];
};
