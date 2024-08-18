/**
 * @license
 * Copyright 2022 MIT
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plugin test.
 */

import * as Blockly from 'blockly';
import {toolboxCategories} from '@blockly/dev-tools';
import {Multiselect} from '../src/index';
import {ScrollOptions, ScrollBlockDragger, ScrollMetricsManager} from '@blockly/plugin-scroll-options';
import {Backpack} from '@blockly/workspace-backpack';
import {NavigationController} from '@blockly/keyboard-navigation';

const navigationController = new NavigationController();
/**
 * Create a workspace.
 * @param {HTMLElement} blocklyDiv The blockly container div.
 * @param {!Blockly.BlocklyOptions} options The Blockly options.
 * @returns {!Blockly.WorkspaceSvg} The created workspace.
 */
function createWorkspace(blocklyDiv, options) {
  const workspace = Blockly.inject(blocklyDiv, options);

  // Initialize scroll options plugin.
  const plugin = new ScrollOptions(workspace);
  plugin.init();

  // Initialize backpack plugin.
  const backpack = new Backpack(workspace);
  backpack.init();

  navigationController.addWorkspace(workspace);

  // Initialize multiselect plugin.
  const multiselectPlugin = new Multiselect(workspace);
  multiselectPlugin.init(options);

  return workspace;
}

Blockly.ContextMenuItems.registerCommentOptions();
// Initialize keyboard nav plugin.
navigationController.init();

document.addEventListener('DOMContentLoaded', function() {
  const defaultOptions = {
    toolbox: toolboxCategories,
    useDoubleClick: true,
    bumpNeighbours: false,
    multiFieldUpdate: true,
    multiselectIcon: {
      hideIcon: false,
      weight: 3,
      enabledIcon: 'media/select.svg',
      disabledIcon: 'media/unselect.svg',
    },
    multiSelectKeys: ['Shift'],
    multiselectCopyPaste: {
      crossTab: true,
      menu: true,
    },
    grid: {
      spacing: 25,
      length: 3,
      colour: '#ccc',
      snap: true,
    },
    move: {
      wheel: true,
    },
    zoom: {
      wheel: true,
    },
    plugins: {
      // These are both required.
      // Note that the ScrollBlockDragger drags things besides blocks.
      // Block is included in the name for backwards compatibility.
      blockDragger: ScrollBlockDragger,
      metricsManager: ScrollMetricsManager,
    },
  };
  createWorkspace(document.getElementById('primaryDiv'),
      defaultOptions);
  createWorkspace(document.getElementById('secondaryDiv'),
      defaultOptions);
});
