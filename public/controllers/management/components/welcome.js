import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EuiCard,
  EuiIcon,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer
} from '@elastic/eui';

export class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Administration">
              <EuiSpacer size="m" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="indexRollupApp" />}
                    title="Ruleset"
                    data-test-subj="managementWelcomeRuleset"
                    onClick={() => this.props.switchTab('ruleset', true)}
                    description="Manage your Wazuh cluster ruleset."
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="usersRolesApp" />}
                    title="Groups"
                    data-test-subj="managementWelcomeGroups"
                    onClick={() => this.props.switchTab('groups', true)}
                    description="Manage your agent groups."
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="devToolsApp" />}
                    title="Configuration"
                    data-test-subj="managementWelcomeConfiguration"
                    onClick={() => this.props.switchTab('configuration', true)}
                    description="Manage your Wazuh cluster configuration."
                  />
                </EuiFlexItem>
                <EuiFlexItem />
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel betaBadgeLabel="Status and reports">
              <EuiSpacer size="m" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="uptimeApp" />}
                    title="Status"
                    data-test-subj="managementWelcomeStatus"
                    onClick={() => this.props.switchTab('status', true)}
                    description="Manage your Wazuh cluster status."
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="indexPatternApp" />}
                    title="Cluster"
                    data-test-subj="managementWelcomeCluster"
                    onClick={() => this.props.switchTab('monitoring', true)}
                    description="Visualize your Wazuh cluster."
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="filebeatApp" />}
                    title="Logs"
                    data-test-subj="managementWelcomeLogs"
                    onClick={() => this.props.switchTab('logs', true)}
                    description="Logs from your Wazuh cluster."
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiCard
                    layout="horizontal"
                    icon={<EuiIcon size="xl" type="reportingApp" />}
                    title="Reporting"
                    data-test-subj="managementWelcomeReporting"
                    onClick={() => this.props.switchTab('reporting', true)}
                    description="Check your stored Wazuh reports."
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

WelcomeScreen.propTypes = {
  switchTab: PropTypes.func
};
