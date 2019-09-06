/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import themed from 'components/Theme/themed';
import media from 'components/Theme/media';

export default themed.div`
    border-radius: 2px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 20px;
    background: #fff;

    @media (${media.md}) {
        height: 100%;
        border-radius: 0;
    }
`;
