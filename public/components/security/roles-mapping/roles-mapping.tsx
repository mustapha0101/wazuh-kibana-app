import React, { useState, useEffect } from 'react';
import {
    EuiPageContent,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageContentBody,
    EuiButton,
    EuiTitle,
    EuiOverlayMask,
} from '@elastic/eui';
import { RolesMappingTable } from './roles-mapping-table';
import { RolesMappingEdit } from './roles-mapping-edit';
import { RolesMappingCreate } from './roles-mapping-create';
import { WzRequest } from '../../../react-services/wz-request';

export const RolesMapping = () => {
    const [isEditingRule, setIsEditingRule] = useState(false);
    const [isCreatingRule, setIsCreatingRule] = useState(false);
    const [rules,setRules] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const [selectedRule, setSelectedRule] = useState({});
    const [rolesEquivalences, setRolesEquivalences] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        initData();
    }, []);


    const initData = async() => {
        setLoadingTable(true);
        const roles = await WzRequest.apiReq(
            'GET',
            '/security/roles',
            {}
        );
        const roles_data = (((roles || {}).data || {}).data || {}).affected_items || [];
        setRoles(roles_data);

        const rolesObject = {};
        roles_data.forEach((item) => {
            rolesObject[item.id] = item.name;
        })
        setRolesEquivalences(rolesObject);

        const request = await WzRequest.apiReq(
            'GET',
            '/security/rules',
            {}
        );
        const rules = (((request || {}).data || {}).data || {}).affected_items || [];
        setRules(rules);

        

        setLoadingTable(false);
    }


    const setIsFlyoutVisible = (isVisible) => {
        setIsEditingRule(isVisible);
    }
    
    const setIsCreateFlyoutVisible = (isVisible) => {
        setIsCreatingRule(isVisible);
    }


    let editFlyout;
    if(isEditingRule){
        editFlyout = ( <EuiOverlayMask onClick={() => {
            setIsFlyoutVisible(false)
        }}>
            <RolesMappingEdit rule={selectedRule} closeFlyout={(isVisible) => {setIsFlyoutVisible(isVisible); initData() }} rolesEquivalences={rolesEquivalences} roles={roles}/>
        </EuiOverlayMask>)
    }
    let createFlyout;
    if(isCreatingRule){
        editFlyout = ( <EuiOverlayMask onClick={() => {
            setIsCreateFlyoutVisible(false)
        }}>
            <RolesMappingCreate  closeFlyout={(isVisible) => {setIsCreateFlyoutVisible(isVisible); initData() }} rolesEquivalences={rolesEquivalences} roles={roles}/>
        </EuiOverlayMask>)
    }
   
    return (
        <EuiPageContent>
            <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                    <EuiTitle>
                        <h2>Roles mapping</h2>
                    </EuiTitle>
                </EuiPageContentHeaderSection>
                <EuiPageContentHeaderSection>
                    <div>
                        <EuiButton
                            onClick={() => setIsCreateFlyoutVisible(true)}>
                            Create role mapping
                                </EuiButton>
                        {createFlyout}
                        {editFlyout}
                    </div>
                </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
               <RolesMappingTable rolesEquivalences={rolesEquivalences} loading={loadingTable} rules={rules} editRule={(item) => {setSelectedRule(item); setIsEditingRule(true);}} updateRules={async() => await initData()}></RolesMappingTable>
            </EuiPageContentBody>
        </EuiPageContent>
    );
};