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
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) {
  Blockly.Language = {};
}

Blockly.Language.lists_create_empty = {
  // Create an empty list.
  category: 'Lists',
  helpUrl: 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists',
  init: function() {
    this.setColour('blue');
    this.setOutput(true);
    this.addTitle('create empty list');
    this.setTooltip('Returns a list, of length 0, containing no data records');
  }
};

Blockly.Language.lists_create_with = {
  // Create a list with any number of elements of any type.
  category: 'Lists',
  helpUrl: '',
  init: function() {
    this.setColour('blue');
    this.addTitle('create list with');
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.addInput('', '', Blockly.INPUT_VALUE);
    this.setOutput(true);
    this.setMutator(new Blockly.Mutator(this, ['lists_create_with_item']));
    this.setTooltip('Create a list with any number of items.');
    this.itemCount_ = 3;
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(container) {
    while (this.inputList.length) {
      this.removeInput(0);
    }
    this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      this.addInput('', '', Blockly.INPUT_VALUE);
    }
  },
  decompose: function(workspace) {
    var listBlock = new Blockly.Block(workspace, 'lists_create_with_container');
    listBlock.editable = false;
    var connection = listBlock.inputList[0];
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'lists_create_with_item');
      // Store a pointer to any connected blocks.
      itemBlock.valueInput_ = this.inputList[x].targetConnection;
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return listBlock;
  },
  compose: function(listBlock) {
    // Disconnect all input blocks.
    for (var x = 0; x < this.inputList.length; x++) {
      var child = this.inputList[x].targetBlock();
      if (child) {
        child.setParent(null);
      }
    }
    // Destroy all inputs.
    while (this.inputList.length) {
      this.removeInput(0);
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = listBlock.getStatementInput(0);
    while (itemBlock) {
      this.addInput('', '', Blockly.INPUT_VALUE);
      // Reconnect any child blocks.
      if (itemBlock.valueInput_) {
        this.inputList[this.itemCount_].connect(itemBlock.valueInput_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.lists_create_with_container = {
  // Container.
  init: function() {
    this.setColour('blue');
    this.addTitle('add');
    this.addInput('', '', Blockly.NEXT_STATEMENT);
    this.setTooltip('Add, remove, or reorder sections to reconfigure this list block.');
    this.contextMenu = false;
  }
};

Blockly.Language.lists_create_with_item = {
  // Add items.
  init: function() {
    this.setColour('blue');
    this.addTitle('item');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add an item to the list.');
    this.contextMenu = false;
  }
};

Blockly.Language.lists_length = {
  // List length.
  category: 'Lists',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour('blue');
    this.addInput('length', '', Blockly.INPUT_VALUE);
    this.setOutput(true);
    this.setTooltip('Returns the length of a list.');
  }
};

Blockly.Language.lists_isEmpty = {
  // Is the list empty?
  category: 'Lists',
  helpUrl: 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html',
  init: function() {
    this.setColour('blue');
    this.addInput('is empty', '', Blockly.INPUT_VALUE);
    this.setOutput(true);
    this.setTooltip('Returns true if the list is empty.');
  }
};

Blockly.Language.lists_contains = {
  // Does the list contain a value?
  category: 'Lists',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    this.setColour('blue');
    this.setOutput(true);
    this.addInput('is item', '', Blockly.INPUT_VALUE);
    this.addInput('in list', '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
    this.setTooltip('Returns true if a specified item is in a list.');
  }
};

Blockly.Language.lists_getIndex = {
  // Get element at index.
  category: 'Lists',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    this.setColour('blue');
    this.setOutput(true);
    this.addTitle('get item');
    this.addInput('at', '', Blockly.INPUT_VALUE);
    this.addInput('in list', '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
    this.setTooltip('Returns the value at the specified position in a list.');
  }
};

Blockly.Language.lists_setIndex = {
  // Set element at index.
  category: 'Lists',
  helpUrl: 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm',
  init: function() {
    this.setColour('blue');
    this.addTitle('set item');
    this.addInput('at', '', Blockly.INPUT_VALUE);
    this.addInput('in list', '', Blockly.INPUT_VALUE);
    this.addInput('to', '', Blockly.INPUT_VALUE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Sets the value at the specified position in a list.');
  }
};

// this.setTooltip('Returns the position of the specified item in a list.\nReturns 0 if the item is not present.');
