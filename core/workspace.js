/**
 * Visual Blocks Editor
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
 * @fileoverview Object representing a workspace.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Workspace');

// TODO(scr): Fix circular dependencies
// goog.require('Blockly.Block');
goog.require('Blockly.Component');
goog.require('Blockly.ScrollbarPair');
goog.require('Blockly.Trashcan');
goog.require('Blockly.Xml');



/**
 * Class for a workspace.
 * @param {boolean} editable Is this workspace freely interactive?
 * @constructor
 * @extends {Blockly.Component}
 */
Blockly.Workspace = function(editable) {
  Blockly.Workspace.superClass_.constructor.call(this);

  /** @type {boolean} */
  this.editable = editable;
  
  /**
   * @type {!Array.<Blockly.Block>}
   * @private
   */
  this.topBlocks_ = [];

  Blockly.ConnectionDB.init(this);
};
goog.inherits(Blockly.Workspace, Blockly.Component);


/**
 * Can this workspace be dragged around (true) or is it fixed (false)?
 * @type {boolean}
 */
Blockly.Workspace.prototype.dragMode = false;


/**
 * Current horizontal scrolling offset.
 * @type {number}
 */
Blockly.Workspace.prototype.scrollX = 0;


/**
 * Current vertical scrolling offset.
 * @type {number}
 */
Blockly.Workspace.prototype.scrollY = 0;


/**
 * The workspace's trashcan (if any).
 * @type {Blockly.Trashcan}
 */
Blockly.Workspace.prototype.trashcan = null;


/**
 * PID of upcoming firing of a change event.  Used to fire only one event
 * after multiple changes.
 * @type {?number}
 * @private
 */
Blockly.Workspace.prototype.fireChangeEventPid_ = null;


/**
 * This workspace's scrollbars, if they exist.
 * @type {Blockly.ScrollbarPair}
 */
Blockly.Workspace.prototype.scrollbar = null;


/**
 * Create the trash can elements.
 * @override
 */
Blockly.Workspace.prototype.createDom = function() {
  /*
  <g>
    [Trashcan may go here]
    <g></g>
    <g></g>
  </g>
  */
  this.svgGroup_ = Blockly.createSvgElement('g', {}, null);
  this.setElementInternal(this.svgGroup_);
  this.svgBlockCanvas_ = Blockly.createSvgElement('g', {}, this.svgGroup_);
  this.svgBubbleCanvas_ = Blockly.createSvgElement('g', {}, this.svgGroup_);
};


/** @override */
Blockly.Workspace.prototype.enterDocument = function() {
  Blockly.Workspace.superClass_.enterDocument.call(this);
  // TODO(scr): when all blocks are components, this shouldn't be needed.
  this.renderBlocks();
  this.fireChangeEvent();
};


/**
 * Dispose of this workspace.
 * Unlink from all DOM elements to prevent memory leaks.
 * @override
 */
Blockly.Workspace.prototype.disposeInternal = function() {
  if (this.svgGroup_) {
    goog.dom.removeNode(this.svgGroup_);
    this.svgGroup_ = null;
  }
  this.svgBlockCanvas_ = null;
  this.svgBubbleCanvas_ = null;
  this.trashcan = null;
  Blockly.Workspace.superClass_.disposeInternal.call(this);
};


/**
 * Add a trashcan.
 * @param {!Function} getMetrics A function that returns workspace's metrics.
 */
Blockly.Workspace.prototype.addTrashcan = function(getMetrics) {
  if (Blockly.Trashcan && this.editable) {
    this.trashcan = new Blockly.Trashcan(getMetrics);
    this.addChild(this.trashcan);
    this.trashcan.renderBefore(this.svgBlockCanvas_);
  }
};


/**
 * Get the SVG element that forms the drawing surface.
 * @return {!Element} SVG element.
 */
Blockly.Workspace.prototype.getCanvas = function() {
  return this.svgBlockCanvas_;
};


/**
 * Get the SVG element that forms the bubble surface.
 * @return {!Element} SVG element.
 */
Blockly.Workspace.prototype.getBubbleCanvas = function() {
  return this.svgBubbleCanvas_;
};


/**
 * Add a block to the list of top blocks.
 * @param {!Blockly.Block} block Block to remove.
 */
Blockly.Workspace.prototype.addTopBlock = function(block) {
  this.topBlocks_.push(block);
  this.fireChangeEvent();
};


/**
 * Remove a block from the list of top blocks.
 * @param {!Blockly.Block} block Block to remove.
 */
Blockly.Workspace.prototype.removeTopBlock = function(block) {
  var found = false;
  for (var child, x = 0; child = this.topBlocks_[x]; x++) {
    if (child == block) {
      this.topBlocks_.splice(x, 1);
      found = true;
      break;
    }
  }
  if (!found) {
    throw 'Block not present in workspace\'s list of top-most blocks.';
  }
  this.fireChangeEvent();
};


/**
 * Finds the top-level blocks and returns them.  Blocks are optionally sorted
 * by position; top to bottom.
 * @param {boolean} ordered Sort the list if true.
 * @return {!Array.<!Blockly.Block>} The top-level block objects.
 */
Blockly.Workspace.prototype.getTopBlocks = function(ordered) {
  // Copy the topBlocks_ list.
  var blocks = [].concat(this.topBlocks_);
  if (ordered && blocks.length > 1) {
    blocks.sort(function(a, b)
        {return a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y;});
  }
  return blocks;
};


/**
 * Find all blocks in workspace.  No particular order.
 * @return {!Array.<!Blockly.Block>} Array of blocks.
 */
Blockly.Workspace.prototype.getAllBlocks = function() {
  var blocks = this.getTopBlocks(false);
  for (var x = 0; x < blocks.length; x++) {
    blocks = blocks.concat(blocks[x].getChildren());
  }
  return blocks;
};


/**
 * Dispose of all blocks in workspace.
 */
Blockly.Workspace.prototype.clear = function() {
  Blockly.hideChaff();
  while (this.topBlocks_.length) {
    this.topBlocks_[0].dispose();
  }
};


/**
 * Render all blocks in workspace.
 */
Blockly.Workspace.prototype.renderBlocks = function() {
  var renderList = this.getAllBlocks();
  for (var x = 0, block; block = renderList[x]; x++) {
    if (!block.getChildren().length) {
      block.render();
    }
  }
};


/**
 * Finds the block with the specified ID in this workspace.
 * @param {string} id ID of block to find.
 * @return {Blockly.Block} The matching block, or null if not found.
 */
Blockly.Workspace.prototype.getBlockById = function(id) {
  // If this O(n) function fails to scale well, maintain a hash table of IDs.
  var blocks = this.getAllBlocks();
  for (var x = 0, block; block = blocks[x]; x++) {
    if (block.id == id) {
      return block;
    }
  }
  return null;
};


/**
 * Turn the visual trace functionality on or off.
 * @param {boolean} armed True if the trace should be on.
 */
Blockly.Workspace.prototype.traceOn = function(armed) {
  this.traceOn_ = armed;
  if (this.traceWrapper_) {
    Blockly.unbindEvent_(this.traceWrapper_);
    this.traceWrapper_ = null;
  }
  if (armed) {
    this.traceWrapper_ = Blockly.bindEvent_(this.svgBlockCanvas_,
        'blocklySelectChange', this, function() {this.traceOn_ = false});
  }
};


/**
 * Highlight a block in the workspace.
 * @param {?string} id ID of block to find.
 */
Blockly.Workspace.prototype.highlightBlock = function(id) {
  if (!this.traceOn_) {
    return;
  }
  var block = null;
  if (id) {
    block = this.getBlockById(id);
    if (!block) {
      return;
    }
  }
  // Temporary turn off the listener for selection changes, so that we don't
  // trip the monitor for detecting user activity.
  this.traceOn(false);
  // Select the current block.
  if (block) {
    block.select();
  } else if (Blockly.selected) {
    Blockly.selected.unselect();
  }
  // Restore the monitor for user activity.
  this.traceOn(true);
};


/**
 * Fire a change event for this workspace.  Changes include new block, dropdown
 * edits, mutations, connections, etc.  Groups of simultaneous changes (e.g.
 * a tree of blocks being deleted) are merged into one event.
 * Applications may hook workspace changes by listening for
 * 'blocklyWorkspaceChange' on Blockly.mainWorkspace.getCanvas().
 */
Blockly.Workspace.prototype.fireChangeEvent = function() {
  if (this.fireChangeEventPid_) {
    window.clearTimeout(this.fireChangeEventPid_);
  }
  var canvas = this.svgBlockCanvas_;
  if (canvas) {
    this.fireChangeEventPid_ = window.setTimeout(function() {
        Blockly.fireUiEvent(canvas, 'blocklyWorkspaceChange');
      }, 0);
  }
};


/**
 * Paste the provided block onto the workspace.
 * @param {!Element} xmlBlock XML block element.
 */
Blockly.Workspace.prototype.paste = function(xmlBlock) {
  var block = Blockly.Xml.domToBlock_(this, xmlBlock);
  // Move the duplicate to original position.
  var blockX = parseInt(xmlBlock.getAttribute('x'), 10);
  var blockY = parseInt(xmlBlock.getAttribute('y'), 10);
  if (!isNaN(blockX) && !isNaN(blockY)) {
    if (Blockly.RTL) {
      blockX = -blockX;
    }
    // Offset block until not clobering another block.
    do {
      var collide = false;
      var allBlocks = this.getAllBlocks();
      for (var x = 0, otherBlock; otherBlock = allBlocks[x]; x++) {
        var otherXY = otherBlock.getRelativeToSurfaceXY();
        if (Math.abs(blockX - otherXY.x) <= 1 &&
            Math.abs(blockY - otherXY.y) <= 1) {
          if (Blockly.RTL) {
            blockX -= Blockly.SNAP_RADIUS;
          } else {
            blockX += Blockly.SNAP_RADIUS;
          }
          blockY += Blockly.SNAP_RADIUS * 2;
          collide = true;
        }
      }
    } while (collide);
    block.moveBy(blockX, blockY);
  }
  block.select();
};
