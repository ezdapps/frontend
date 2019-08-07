/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import themed from 'components/Theme/themed';
import Sections from 'containers/Main/Navigator/Sections';

const StyledWrapper = themed.div`
    background-color: #f6f8fa;
    position: relative;
`;

export interface IMainProps {
    section: string;
    page: string;
    stylesheet: string;
}

const StyledContent = themed.section`
    margin-left: 0 !important;
    && { background: ${props => props.theme.contentBackground}; }
    color: ${props => props.theme.contentForeground};
    transition: none !important;
`;

const Navigator: React.SFC<IMainProps> = props => (
    <StyledWrapper className="wrapper">
        <style type="text/css">
            {props.stylesheet}
        </style>
        <StyledContent>
            <Sections section={props.section} page={props.page} />
        </StyledContent>
    </StyledWrapper>
);

export default Navigator;