/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import themed from 'components/Theme/themed';

export default themed.div`
    background: ${props => props.theme.toolbarBackground};
    border-bottom: solid 1px ${props => props.theme.uiBorderLight};
    min-height: ${props => props.theme.toolbarHeight}px;
    height: ${props => props.theme.toolbarHeight}px;
    line-height: ${props => props.theme.toolbarHeight}px;
    color: ${props => props.theme.toolbarForeground};
    padding: 0 20px;
    margin: 0;
    position: relative;
    z-index: 110;
    white-space: nowrap;
`;