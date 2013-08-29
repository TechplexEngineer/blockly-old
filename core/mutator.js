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
 * @fileoverview Object representing a mutator dialog.  A mutator allows the
 * user to change the shape of a block using a nested blocks editor.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Mutator');

goog.require('Blockly.Bubble');
goog.require('Blockly.Icon');


/**
 * Class for a mutator dialog.
 * @param {!Array.<string>} quarkNames List of names of sub-blocks for flyout.
 * @extends {Blockly.Icon}
 * @constructor
 */
Blockly.Mutator = function(quarkNames) {
  Blockly.Mutator.superClass_.constructor.call(this, null);
  this.quarkXml_ = [];
  // Convert the list of names into a list of XML objects for the flyout.
  for (var x = 0; x < quarkNames.length; x++) {
    var element = goog.dom.createDom('block');
    element.setAttribute('type', quarkNames[x]);
    this.quarkXml_[x] = element;
  }
};
goog.inherits(Blockly.Mutator, Blockly.Icon);

/**
 * Width of workspace.
 * @private
 */
Blockly.Mutator.prototype.workspaceWidth_ = 0;

/**
 * Height of workspace.
 * @private
 */
Blockly.Mutator.prototype.workspaceHeight_ = 0;

/**
 * Create the icon on the block.
 */
Blockly.Mutator.prototype.createIcon = function() {
  Blockly.Icon.prototype.createIcon_.call(this);
  /* Here's the markup that will be generated:
  <rect class="blocklyIconShield" width="16" height="16"/>
  <path class="blocklyMutatorMark" d="..."></path>
  */
  var quantum = Blockly.Icon.RADIUS / 4;
  var iconShield = Blockly.createSvgElement('rect',
      {'class': 'blocklyIconShield',
       'width': 8 * quantum,
       'height': 8 * quantum,
       'rx': 2 * quantum,
       'ry': 2 * quantum}, this.iconGroup_);
  if (!Blockly.Mutator.plusPath_) {
    // Draw the plus sign once, and save it for future use.
    var path = [];
    path.push('M', (3.5 * quantum) + ',' + (3.5 * quantum));
    path.push('v', -2 * quantum, 'h', quantum);
    path.push('v', 2 * quantum, 'h', 2 * quantum);
    path.push('v', quantum, 'h', -2 * quantum);
    path.push('v', 2 * quantum, 'h', -quantum);
    path.push('v', -2 * quantum, 'h', -2 * quantum);
    path.push('v', -quantum, 'z');
    Blockly.Mutator.plusPath_ = path.join(' ');
  }
  if (!Blockly.Mutator.minusPath_) {
    // Draw the minus sign once, and save it for future use.
    var path = [];
    path.push('M', (1.5 * quantum) + ',' + (3.5 * quantum));
    path.push('h', 5 * quantum, 'v', quantum);
    path.push('h', -5 * quantum, 'z');
    Blockly.Mutator.minusPath_ = path.join(' ');
  }
  this.iconMark_ = Blockly.createSvgElement('path',
      {'class': 'blocklyIconMark',
       'd': Blockly.Mutator.plusPath_}, this.iconGroup_);
};

/**
 * Create the editor for the mutator's bubble.
 * @return {!Element} The top-level node of the editor.
 * @private
 */
Blockly.Mutator.prototype.createEditor_ = function() {
  /* Create the editor.  Here's the markup that will be generated:
  <svg>
    <rect class="blocklyMutatorBackground" />
    [Flyout]
    [Workspace]
  </svg>
  */
  this.svgDialog_ = Blockly.createSvgElement('svg',
      {'x': Blockly.Bubble.BORDER_WIDTH, 'y': Blockly.Bubble.BORDER_WIDTH},
      null);
  this.svgBackground_ = Blockly.createSvgElement('rect',
      {'class': 'blocklyMutatorBackground',
       'height': '100%', 'width': '100%'}, this.svgDialog_);

  var mutator = this;
  this.workspace_ = new Blockly.Workspace(
      function() {return mutator.getFlyoutMetrics_();}, null);
  this.flyout_ = new Blockly.Flyout();
  this.flyout_.autoClose = false;
  this.svgDialog_.appendChild(this.flyout_.createDom());
  this.svgDialog_.appendChild(this.workspace_.createDom());
  return this.svgDialog_;
};

/**
 * Callback function triggered when the bubble has resized.
 * Resize the workspace accordingly.
 * @private
 */
Blockly.Mutator.prototype.resizeBubble_ = function() {
  var doubleBorderWidth = 2 * Blockly.Bubble.BORDER_WIDTH;
  var workspaceSize = this.workspace_.getCanvas().getBBox();
  var flyoutMetrics = this.flyout_.getMetrics_();
  var width;
  if (Blockly.RTL) {
    width = -workspaceSize.x;
  } else {
    width = workspaceSize.width + workspaceSize.x;
  }
  var height = Math.max(workspaceSize.height + doubleBorderWidth * 3,
                        flyoutMetrics.contentHeight + 20);
  width += doubleBorderWidth * 3;
  // Only resize if the size difference is significant.  Eliminates shuddering.
  if (Math.abs(this.workspaceWidth_ - width) > doubleBorderWidth ||
      Math.abs(this.workspaceHeight_ - height) > doubleBorderWidth) {
    // Record some layout information for getFlyoutMetrics_.
    this.workspaceWidth_ = width;
    this.workspaceHeight_ = height;
    // Resize the bubble.
    this.bubble_.setBubbleSize(width + doubleBorderWidth,
                               height + doubleBorderWidth);
    this.svgDialog_.setAttribute('width', this.workspaceWidth_);
    this.svgDialog_.setAttribute('height', this.workspaceHeight_);
  }

  if (Blockly.RTL) {
    // Scroll the workspace to always left-align.
    var translation = 'translate(' + this.workspaceWidth_ + ',0)';
    this.workspace_.getCanvas().setAttribute('transform', translation);
  }
};

/**
 * Show or hide the mutator bubble.
 * @param {boolean} visible True if the bubble should be visible.
 */
Blockly.Mutator.prototype.setVisible = function(visible) {
  if (visible == this.isVisible()) {
    // No change.
    return;
  }
  if (visible) {
    this.iconMark_.setAttribute('d', Blockly.Mutator.minusPath_);
    // Create the bubble.
    this.bubble_ = new Blockly.Bubble(this.block_.workspace,
        this.createEditor_(), this.block_.svg_.svgGroup_,
        this.iconX_, this.iconY_, null, null);
    var thisObj = this;
    this.flyout_.init(this.workspace_, false);
    this.flyout_.show(this.quarkXml_);

    this.rootBlock_ = this.block_.decompose(this.workspace_);
    var blocks = this.rootBlock_.getDescendants();
    for (var i = 0, child; child = blocks[i]; i++) {
      child.render();
    }
    // The root block should not be dragable or deletable.
    this.rootBlock_.setMovable(false);
    this.rootBlock_.setDeletable(false);
    var margin = this.flyout_.CORNER_RADIUS * 2;
    var x = this.flyout_.width_ + margin;
    if (Blockly.RTL) {
      x = -x;
    }
    this.rootBlock_.moveBy(x, margin);
    // Save the initial connections, then listen for further changes.
    if (this.block_.saveConnections) {
      this.block_.saveConnections(this.rootBlock_);
      this.sourceListener_ = Blockly.bindEvent_(
          this.block_.workspace.getCanvas(),
          'blocklyWorkspaceChange', this.block_,
          function() {thisObj.block_.saveConnections(thisObj.rootBlock_)});
    }
    this.resizeBubble_();
    // When the mutator's workspace changes, update the source block.
    Blockly.bindEvent_(this.workspace_.getCanvas(), 'blocklyWorkspaceChange',
        this.block_, function() {thisObj.workspaceChanged_();});
    this.updateColour();
  } else {
    this.iconMark_.setAttribute('d', Blockly.Mutator.plusPath_);
    // Dispose of the bubble.
    this.svgDialog_ = null;
    this.svgBackground_ = null;
    this.flyout_.dispose();
    this.flyout_ = null;
    this.workspace_.dispose();
    this.workspace_ = null;
    this.rootBlock_ = null;
    this.bubble_.dispose();
    this.bubble_ = null;
    this.workspaceWidth_ = 0;
    this.workspaceHeight_ = 0;
    if (this.sourceListener_) {
      Blockly.unbindEvent_(this.sourceListener_);
      this.sourceListener_ = null;
    }
  }
};

/**
 * Update the source block when the mutator's blocks are changed.
 * Delete or bump any block that's out of bounds.
 * Fired whenever a change is made to the mutator's workspace.
 * @private
 */
Blockly.Mutator.prototype.workspaceChanged_ = function() {
  if (Blockly.Block.dragMode_ == 0) {
    var blocks = this.workspace_.getTopBlocks(false);
    var MARGIN = 20;
    for (var b = 0, block; block = blocks[b]; b++) {
      var blockXY = block.getRelativeToSurfaceXY();
      var blockHW = block.getHeightWidth();
      if (Blockly.RTL ? blockXY.x > -this.flyout_.width_ + MARGIN :
           blockXY.x < this.flyout_.width_ - MARGIN) {
        // Delete any block that's sitting on top of the flyout.
        block.dispose(false, true);
      } else if (blockXY.y + blockHW.height < MARGIN) {
        // Bump any block that's above the top back inside.
        block.moveBy(0, MARGIN - blockHW.height - blockXY.y);
      }
    }
  }

  // When the mutator's workspace changes, update the source block.
  if (this.rootBlock_.workspace == this.workspace_) {
    // Switch off rendering while the source block is rebuilt.
    var savedRendered = this.block_.rendered;
    this.block_.rendered = false;
    // Allow the source block to rebuild itself.
    this.block_.compose(this.rootBlock_);
    // Restore rendering and show the changes.
    this.block_.rendered = savedRendered;
    if (this.block_.rendered) {
      this.block_.render();
    }
    this.resizeBubble_();
    // The source block may have changed, notify its workspace.
    this.block_.workspace.fireChangeEvent();
  }
};

/**
 * Return an object with all the metrics required to size scrollbars for the
 * mutator flyout.  The following properties are computed:
 * .viewHeight: Height of the visible rectangle,
 * .absoluteTop: Top-edge of view.
 * .absoluteLeft: Left-edge of view.
 * @return {!Object} Contains size and position metrics of mutator dialog's
 *     workspace.
 * @private
 */
Blockly.Mutator.prototype.getFlyoutMetrics_ = function() {
  var left = 0;
  if (Blockly.RTL) {
    left += this.workspaceWidth_;
  }
  return {
    viewHeight: this.workspaceHeight_,
    viewWidth: 0,  // This seem wrong, but results in correct RTL layout.
    absoluteTop: 0,
    absoluteLeft: left
  };
};

/**
 * Dispose of this mutator.
 */
Blockly.Mutator.prototype.dispose = function() {
  this.block_.mutator = null;
  Blockly.Icon.prototype.dispose.call(this);
};
