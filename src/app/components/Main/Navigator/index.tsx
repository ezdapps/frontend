/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { ISection } from 'apla/content';

import themed from 'components/Theme/themed';
import Sections from 'containers/Main/Navigator/Sections';
import Breadcrumbs from './Sections/Breadcrumbs';
import NotFound from './Page/NotFound';
import media from 'components/Theme/media';

const StyledWrapper = themed.div`
    background-color: #f6f8fa;
    position: relative;
    height: 100%;
`;

interface Props {
    section: string;
    sections: { [key: string]: ISection };
    page: string;
    stylesheet: string;
    onRefresh?: () => void;
}

const StyledContent = themed.section`
    margin-left: 0 !important;
    && { background: ${props => props.theme.contentBackground}; }
    color: ${props => props.theme.contentForeground};
    transition: none !important;
    overflow: hidden;
    display: grid;
    grid-template-rows: ${props => props.theme.toolbarHeight + 1}px auto;
    grid-template-columns: minmax(100%, 100vw);
    grid-template-areas:
        'toolbar'
        'content';
    justify-content: stretch;
    align-content: stretch;
    height: 100%;

    .content__toolbar {
        position: relative;
        grid-area: toolbar;
        box-shadow: rgba(0,0,0,0.07) 0 2px 5px;
        border-bottom: solid 1px ${props => props.theme.uiBorderLight};
        z-index: 500;
    }

    .content__content {
        position: relative;
        grid-area: content;
        height: 100%;
        z-index: 400;
    }

    @media (${media.md}) {
        grid-template-rows: auto ${props => props.theme.toolbarHeight + 1}px;
        grid-template-areas:
            'content'
            'toolbar';

        .content__toolbar {
            box-shadow: rgba(0,0,0,0.07) 0 -2px 5px;
            border-top: solid 1px ${props => props.theme.uiBorderLight};
        }
    }
`;

const Navigator: React.SFC<Props> = props => {
    const section = props.sections[props.section];

    return (
        <StyledWrapper>
            <style type="text/css">{props.stylesheet}</style>
            <StyledContent>
                {section ? (
                    <>
                        <div className="content__toolbar">
                            <Breadcrumbs
                                values={section.breadcrumbs}
                                onRefresh={props.onRefresh}
                            />
                        </div>
                        <div className="content__content">
                            <Sections
                                section={props.section}
                                values={props.sections}
                                page={props.page}
                            />
                        </div>
                    </>
                ) : (
                    <NotFound />
                )}
            </StyledContent>
        </StyledWrapper>
    );
};

export default Navigator;
