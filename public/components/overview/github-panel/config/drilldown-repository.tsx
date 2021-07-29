/*
 * Wazuh app - GitHub Panel tab - Drilldown layout configuration
 * Copyright (C) 2015-2021 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React from 'react';
import { VisCard } from '../../../common/modules/panel/';
import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import { SecurityAlerts } from '../../../visualize/components';


export const DrilldownConfigRepository = {
  rows: [
    {
      height: 300,
      columns: [
        {
          width: 30,
          component: (props) => <VisCard id='Wazuh-App-Overview-GitHub-Top-Ten-Actions' tab='github' {...props} />
        },
        {
          width: 30,
          component: (props) => <VisCard id='Wazuh-App-Overview-GitHub-Top-Ten-Actors' tab='github' {...props} />
        },
        {
          width: 30,
          component: (props) => <VisCard id='Wazuh-App-Overview-GitHub-Top-Ten-Organizations' tab='github' {...props} />
        },
      ]
    },
    {
      height: 300,
      columns: [
        {
          width: 50,
          component: (props) => <VisCard id='Wazuh-App-Overview-GitHub-Countries' tab='github' {...props} />
        },
        {
          width: 50,
          component: (props) => <VisCard id='Wazuh-App-Overview-GitHub-Alert-Level-Evolution' tab='github' {...props} />
        },
      ]
    },
    {
      height: 800,
      columns: [
        {
          width: 100,
          component: () => <EuiFlexItem><EuiPanel paddingSize={'s'} ><SecurityAlerts /></EuiPanel></EuiFlexItem>
        },
      ]
    },
  ]
};