/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import themed from 'components/Theme/themed';

export default themed.div`
    border-radius: 2px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 20px;
    background: #fff;
    display: flex;
    flex-direction: column;

    @media (max-width: 800px) {
        height: 100%;
        border-radius: 0;
    }
`;
