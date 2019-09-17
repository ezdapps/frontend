/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';
import { IPage, IBreadcrumb } from 'apla/content';

import Page from '../Page';
import themed from 'components/Theme/themed';
import ResizeHandle from 'containers/Main/Navigator/Menu/ResizeHandle';
import media from 'components/Theme/media';

interface Props {
    name: string;
    page?: IPage;
    breadcrumbs: IBreadcrumb[];
    folded: boolean;
    menuActive: boolean;
}

const StyledSection = themed.div`
    background: ${props => props.theme.contentBackground};
    box-shadow: rgba(0,0,0,0.06) -5px 0 10px;
    position: relative;
    z-index: 100;
    transition: margin-left ease-in-out .12s, transform ease-in-out .12s;
    height: 100%;
    // margin-left: ${props => props.theme.menuSize}px;
    // padding-right: ${props => props.theme.menuSizeFolded}px;
    
    &.section_folded {
        margin-left: ${props => props.theme.menuSizeFolded}px;

        &.section_unfolded {
            margin-left: 0;
            transform: translateX(${props => props.theme.menuSize}px);
        }
    }

    @media (${media.md}) {
        &&&&& {
            margin-left: 0;
            transform: none;
        }

        &.section_folded {
            &.section_unfolded {
                margin-left: ${props => props.theme.menuSizeFolded}px;
                transform: none;
            }
        }
    }

    @media (${media.sm}) {
        padding-right: 0;

        &.section_folded {
            margin-left: 0;
        }
    }
`;

const Section: React.SFC<Props> = props => (
    <StyledSection
        className={classNames('fullscreen', {
            section_folded: props.folded,
            section_unfolded: props.menuActive
        })}
    >
        <ResizeHandle />
        {props.page && <Page value={props.page} section={props.name} />}
    </StyledSection>
);

export default Section;
