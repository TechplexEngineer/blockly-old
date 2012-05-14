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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) {
  Blockly.Language = {};
}

Blockly.Language.text = {
  // Text value.
  category: 'Text',
  helpUrl: 'http://en.wikipedia.org/wiki/String_(computer_science)',
  init: function() {
    this.setColour(160);
    this.addTitle('\u201C');
    this.addTitle(new Blockly.FieldTextInput(''));
    this.addTitle('\u201D');
    this.setOutput(true);
    this.setTooltip('A letter, word, or line of text.');
  }
};

Blockly.Language.text_length = {
  // String length.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour(160);
    this.addInput('length', '', Blockly.INPUT_VALUE);
    this.setOutput(true);
    this.setTooltip('Returns number of letters (including spaces)\nin the provided text.');
  }
};

Blockly.Language.text_isEmpty = {
  // Is the string null?
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour(160);
    this.addInput('is empty', '', Blockly.INPUT_VALUE);
    this.setOutput(true);
    this.setTooltip('Returns true if the provided text is empty.');
  }
};

Blockly.Language.text_indexOf = {
  // Find a substring in the text.
  category: 'Text',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(160);
    this.setOutput(true);
    this.addTitle('find');
    var menu = new Blockly.FieldDropdown(function() {
      return [thisBlock.MSG_FIRST, thisBlock.MSG_LAST];
    });
    this.addTitle(menu);
    this.addInput('occurrence of text', '', Blockly.INPUT_VALUE);
    this.addInput('in text', '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
    this.setTooltip('Returns the index of the first/last occurrence\nof first text in the second text.\nReturns 0 if text is not found.');
  },
  MSG_FIRST: 'first',
  MSG_LAST: 'last'
};

Blockly.Language.text_charAt = {
  // Get a character from the string.
  category: 'Text',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    this.setColour(160);
    this.addTitle('letter');
    this.setOutput(true);
    this.addInput('at', '', Blockly.INPUT_VALUE);
    this.addInput('in text', '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
    this.setTooltip('Returns the letter at the specified position.');
  }
};

Blockly.Language.text_changeCase = {
  // Change capitalization.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(160);
    this.addTitle('to');
    var menu = new Blockly.FieldDropdown(function() {
      return [thisBlock.MSG_UPPERCASE, thisBlock.MSG_LOWERCASE, thisBlock.MSG_TITLECASE];
    });
    this.addInput(menu, '', Blockly.INPUT_VALUE);
    this.setOutput(true);
    this.setTooltip('Return a copy of the text in a different case.');
  },
  MSG_UPPERCASE: 'UPPER CASE',
  MSG_LOWERCASE: 'lower case',
  MSG_TITLECASE: 'Title Case'
};

Blockly.Language.text_trim = {
  // Trim spaces.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(160);
    this.addTitle('trim spaces from');
    var menu = new Blockly.FieldDropdown(function() {
      return [thisBlock.MSG_BOTH, thisBlock.MSG_LEFT, thisBlock.MSG_RIGHT];
    }, function(text) {
      var newTitle = (text == thisBlock.MSG_BOTH) ? 'sides' : 'side';
      sideTitle.setText(newTitle);
      this.setText(text);
    });
    this.addTitle(menu);
    var sideTitle = this.addTitle('sides');
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.setOutput(true);
    this.setTooltip('Return a copy of the text with spaces\nremoved from one or both ends.');
  },
  MSG_BOTH: 'both',
  MSG_LEFT: 'left',
  MSG_RIGHT: 'right'
};

Blockly.Language.text_print = {
  // Print statement.
  category: 'Text',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour(160);
    this.addTitle('print');
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Print the specified text, number or other value.');
  }
};
