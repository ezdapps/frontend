/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import themed from 'components/Theme/themed';

export default themed.p`
    font-size: 14px;
    padding: 0 15px;
    color: ${props => props.theme.dropdownMenuPrimary};
`;