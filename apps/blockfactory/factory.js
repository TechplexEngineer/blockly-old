/**
 * Blockly Apps: Block Factory
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
 * @fileoverview JavaScript for Blockly's Block Factory application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * The uneditable container block that everything else attaches to.
 * @type {Blockly.Block}
 */
var rootBlock = null;

/**
 * The type of the generated block.
 */
var blockType = '';

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Function} updateFunc Function to update the preview.
 */
function initPreview(updateFunc) {
  updatePreview.updateFunc = updateFunc;
  updatePreview();
}

/**
 * When the workspace changes, update the three other displays.
 */
function onchange() {
  var name = rootBlock.getTitleValue('NAME');
  blockType = name.replace(/\W/g, '_').replace(/^(\d)/, '_\\1').toLowerCase();
  updateLanguage();
  updateGenerator();
  updatePreview();
}

/**
 * Update the language code.
 */
function updateLanguage() {
  // Generate name.
  var code = [];
  code.push('Blockly.Language.' + blockType + ' = {');
  code.push('  helpUrl: \'http://www.example.com/\',');
  code.push('  init: function() {');
  // Generate colour.
  var colourBlock = rootBlock.getInputTargetBlock('COLOUR');
  if (colourBlock) {
    var hue = parseInt(colourBlock.getTitleValue('HUE'), 10);
    code.push('    this.setColour(' + hue + ');');
  }
  // Generate inputs.
  var TYPES = {'input_value': 'appendValueInput',
               'input_statement': 'appendStatementInput',
               'input_dummy': 'appendDummyInput'};
  var inputVarDefined = false;
  var contentsBlock = rootBlock.getInputTargetBlock('INPUTS');
  while (contentsBlock) {
    var align = contentsBlock.getTitleValue('ALIGN');
    var titles = getTitles(contentsBlock.getInputTargetBlock('TITLES'));
    var name = '';
    // Dummy inputs don't have names.  Other inputs do.
    if (contentsBlock.type != 'input_dummy') {
      name = escapeString(contentsBlock.getTitleValue('INPUTNAME'));
    }
    var check = getOptTypesFrom(contentsBlock, 'TYPE');
    code.push('    this.' + TYPES[contentsBlock.type] +
        '(' + name + ')');
    if (check && check != 'null') {
      code.push('        .setCheck(' + check + ')');
    }
    if (align != 'LEFT') {
      code.push('        .setAlign(Blockly.ALIGN_' + align + ')');
    }
    for (var x = 0; x < titles.length; x++) {
      code.push('        .appendTitle(' + titles[x] + ')');
    }
    // Add semicolon to last line to finish the statement.
    code[code.length - 1] += ';';
    contentsBlock = contentsBlock.nextConnection &&
        contentsBlock.nextConnection.targetBlock();
  }
  // Generate inline/external switch.
  if (rootBlock.getTitleValue('INLINE') == 'INT') {
    code.push('    this.setInputsInline(true);');
  }
  // Generate output, or next/previous connections.
  switch (rootBlock.getTitleValue('CONNECTIONS')) {
    case 'LEFT':
      code.push(connectionLine_('setOutput', 'OUTPUTTYPE'));
      break;
    case 'BOTH':
      code.push(connectionLine_('setPreviousStatement', 'TOPTYPE'));
      code.push(connectionLine_('setNextStatement', 'BOTTOMTYPE'));
      break;
    case 'TOP':
      code.push(connectionLine_('setPreviousStatement', 'TOPTYPE'));
      break;
    case 'BOTTOM':
      code.push(connectionLine_('setNextStatement', 'BOTTOMTYPE'));
      break;
  }
  code.push('    this.setTooltip(\'\');');
  code.push('  }');
  code.push('};');

  injectCode(code, 'languagePre');
}

/**
 * Create JS code required to create a top, bottom, or value connection.
 * @param {string} functionName JavaScript function name.
 * @param {string} typeName Name of type input.
 * @return {string} Line of JavaScript code to create connection.
 * @private
 */
function connectionLine_(functionName, typeName) {
  var type = getOptTypesFrom(rootBlock, typeName);
  if (type) {
    type = ', ' + type;
  }
  return '    this.' + functionName + '(true' + type + ');';
}

/**
 * Returns a title string and any config.
 * @param {!Blockly.Block} block Title block.
 * @return {string} Title string.
 */
function getTitles(block) {
  var titles = [];
  while (block) {
    switch (block.type) {
      case 'title_static':
        // Result: 'hello'
        titles.push(escapeString(block.getTitleValue('TEXT')));
        break;
      case 'title_input':
        // Result: new Blockly.FieldTextInput('Hello'), 'GREET'
        titles.push('new Blockly.FieldTextInput(' +
            escapeString(block.getTitleValue('TEXT')) + '), ' +
            escapeString(block.getTitleValue('TITLENAME')));
        break;
      case 'title_angle':
        // Result: new Blockly.FieldAngle(90), 'ANGLE'
        titles.push('new Blockly.FieldAngle(' +
            escapeString(block.getTitleValue('ANGLE')) + '), ' +
            escapeString(block.getTitleValue('TITLENAME')));
        break;
      case 'title_checkbox':
        // Result: new Blockly.FieldCheckbox('TRUE'), 'CHECK'
        titles.push('new Blockly.FieldCheckbox(' +
            escapeString(block.getTitleValue('CHECKED')) + '), ' +
            escapeString(block.getTitleValue('TITLENAME')));
        break;
      case 'title_colour':
        // Result: new Blockly.FieldColour('#ff0000'), 'COLOUR'
        titles.push('new Blockly.FieldColour(' +
            escapeString(block.getTitleValue('COLOUR')) + '), ' +
            escapeString(block.getTitleValue('TITLENAME')));
        break;
      case 'title_variable':
        // Result:
        // new Blockly.FieldVariable('item'), 'VAR'
        var varname = block.getTitleValue('TEXT');
        varname = varname ? escapeString(varname) : 'null';
        titles.push('new Blockly.FieldVariable(' + varname + '), ' +
            escapeString(block.getTitleValue('TITLENAME')));
        break;
      case 'title_dropdown':
        // Result:
        // new Blockly.FieldDropdown([['yes', '1'], ['no', '0']]), 'TOGGLE'
        var options = [];
        for (var x = 0; x < block.optionCount_; x++) {
          options[x] = '[' + escapeString(block.getTitleValue('USER' + x)) +
              ', ' + escapeString(block.getTitleValue('CPU' + x)) + ']';
        }
        if (options.length) {
          titles.push('new Blockly.FieldDropdown([' +
              options.join(', ') + ']), ' +
              escapeString(block.getTitleValue('TITLENAME')));
        }
        break;
      case 'title_image':
        // Result: new Blockly.FieldImage('http://...', 80, 60)
        var src = escapeString(block.getTitleValue('SRC'));
        var width = Number(block.getTitleValue('WIDTH'));
        var height = Number(block.getTitleValue('HEIGHT'));
        titles.push('new Blockly.FieldImage(' +
            src + ', ' + width + ', ' + height + ')');
        break;
    }
    block = block.nextConnection && block.nextConnection.targetBlock();
  }
  return titles;
}

/**
 * Escape a string.
 * @param {string} string String to escape.
 * @return {string} Escaped string surrouned by quotes.
 */
function escapeString(string) {
  if (JSON && JSON.stringify) {
    return JSON.stringify(string);
  }
  // Hello MSIE 8.
  return '"' + string.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

/**
 * Fetch the type(s) defined in the given input.
 * Format as a string for appending to the generated code.
 * @param {!Blockly.Block} block Block with input.
 * @param {string} name Name of the input.
 * @return {string} String defining the types.
 */
function getOptTypesFrom(block, name) {
  var types = getTypesFrom_(block, name);
  if (types.length == 0) {
    return '';
  } else if (types.length == 1) {
    return types[0];
  } else if (types.indexOf('null') != -1) {
    return 'null';
  } else {
    return '[' + types.join(', ') + ']';
  }
}

/**
 * Fetch the type(s) defined in the given input.
 * @param {!Blockly.Block} block Block with input.
 * @param {string} name Name of the input.
 * @return {!Array.<string>} List of types.
 * @private
 */
function getTypesFrom_(block, name) {
  var typeBlock = block.getInputTargetBlock(name);
  var types;
  if (!typeBlock) {
    types = [];
  } else if (typeBlock.type == 'type_other') {
    types = [escapeString(typeBlock.getTitleValue('TYPE'))];
  } else if (typeBlock.type == 'type_group') {
    types = [];
    for (var n = 0; n < typeBlock.typeCount_; n++) {
      types = types.concat(getTypesFrom_(typeBlock, 'TYPE' + n));
    }
    // Remove duplicates.
    var hash = {};
    for (var n = types.length - 1; n >= 0; n--) {
      if (hash['X_' + types[n]]) {
        types.splice(n, 1);
        continue;
      }
      hash['X_' + types[n]] = true;
    }
  } else {
    types = [escapeString(typeBlock.valueType)];
  }
  return types;
}

/**
 * Update the generator code.
 */
function updateGenerator() {
  function makeVar(root, name) {
    name = name.toLowerCase().replace(/\W/g, '_');
    return '  var ' + root + '_' + name;
  }
  var language = document.getElementById('language').value;
  var code = [];
  code.push('Blockly.' + language + '.' + blockType + ' = function() {');
  // Loop through every block, and generate getters for any fields or inputs.
  var blocks = rootBlock.getDescendants();
  for (var x = 0, block; block = blocks[x]; x++) {
    switch (block.type) {
      case 'title_input':
        var name = block.getTitleValue('TITLENAME');
        code.push(makeVar('text', name) +
                  ' = this.getTitleValue(\'' + name + '\');');
        break;
      case 'title_angle':
        var name = block.getTitleValue('TITLENAME');
        code.push(makeVar('angle', name) +
                  ' = this.getTitleValue(\'' + name + '\');');
        break;
      case 'title_dropdown':
        var name = block.getTitleValue('TITLENAME');
        code.push(makeVar('dropdown', name) +
                  ' = this.getTitleValue(\'' + name + '\');');
        break;
      case 'title_checkbox':
        var name = block.getTitleValue('TITLENAME');
        code.push(makeVar('checkbox', name) +
                  ' = this.getTitleValue(\'' + name + '\') == \'TRUE\';');
        break;
      case 'title_colour':
        var name = block.getTitleValue('TITLENAME');
        code.push(makeVar('colour', name) +
                  ' = this.getTitleValue(\'' + name + '\');');
        break;
      case 'title_variable':
        var name = block.getTitleValue('TITLENAME');
        code.push(makeVar('variable', name) +
                  ' = Blockly.' + language +
                  '.variableDB_.getName(this.getTitleValue(\'' + name +
                  '\'), Blockly.Variables.NAME_TYPE);');
        break;
      case 'input_value':
        var name = block.getTitleValue('INPUTNAME');
        code.push(makeVar('value', name) +
                  ' = Blockly.' + language + '.valueToCode(this, \'' + name +
                  '\', Blockly.' + language + '.ORDER_ATOMIC);');
        break;
      case 'input_statement':
        var name = block.getTitleValue('INPUTNAME');
        code.push(makeVar('statements', name) +
                  ' = Blockly.' + language + '.statementToCode(this, \'' +
                  name + '\');');
        break;
    }
  }
  code.push('  // TODO: Assemble ' + language + ' into code variable.');
  code.push('  var code = \'...\'');
  if (rootBlock.getTitleValue('CONNECTIONS') == 'LEFT') {
    code.push('  // TODO: Change ORDER_NONE to the correct strength.');
    code.push('  return [code, Blockly.' + language + '.ORDER_NONE];');
  } else {
    code.push('  return code;');
  }
  code.push('};');

  injectCode(code, 'generatorPre');
}

var oldDir = 'ltr';

/**
 * Update the preview display.
 */
function updatePreview() {
  var newDir = document.getElementById('direction').value;
  if (oldDir != newDir) {
    document.getElementById('previewFrame').src = 'preview.html?' + newDir;
    oldDir = newDir;
  } else if (updatePreview.updateFunc) {
    var code = document.getElementById('languagePre').textContent;
    updatePreview.updateFunc(blockType, code);
  }
}

/**
 * Inject code into a pre tag, with syntax highlighting.
 * Safe from HTML/script injection.
 * @param {!Array.<string>} code Array of lines of code.
 * @param {string} id ID of <pre> element to inject into.
 */
function injectCode(code, id) {
  var pre = document.getElementById(id);
  pre.innerHTML = '';
  // Inject the code as a textNode, then extract with innerHTML, thus escaping.
  pre.appendChild(document.createTextNode(code.join('\n')));
  code = pre.innerHTML;
  code = prettyPrintOne(code, 'js');
  pre.innerHTML = code;
}

/**
 * Initialize Blockly and layout.  Called on page load.
 */
function init() {
  var expandList = [
    document.getElementById('blockly'),
    document.getElementById('previewFrame'),
    document.getElementById('languagePre'),
    document.getElementById('generatorPre')
  ];
  var onresize = function(e) {
    for (var i = 0, expand; expand = expandList[i]; i++) {
      expand.style.width = (expand.parentNode.offsetWidth - 2) + 'px';
      expand.style.height = (expand.parentNode.offsetHeight - 2) + 'px';
    }
  };
  onresize();
  window.addEventListener('resize', onresize);

  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blockly'),
                 {path: '../../', toolbox: toolbox});

  // Create the root block.
  rootBlock = new Blockly.Block(Blockly.mainWorkspace, 'factory_base');
  rootBlock.initSvg();
  rootBlock.render();
  rootBlock.setMovable(false);
  rootBlock.setDeletable(false);

  Blockly.addChangeListener(onchange);
}
window.addEventListener('load', init);
