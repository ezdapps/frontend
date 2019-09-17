// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

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
    grid-template-rows: max-content 1fr;
    grid-template-columns: minmax(100%, 100vw);
    grid-template-areas:
        'toolbar'
        'content';
    justify-content: stretch;
    align-content: stretch;
    height: 100%;
    padding-bottom: 50px;
    margin-bottom: env(safe-area-inset-bottom);

    .content__toolbar {
        background: ${props => props.theme.toolbarBackground};
        position: relative;
        grid-area: toolbar;
        box-shadow: rgba(0,0,0,0.07) 0 2px 5px;
        border-bottom: solid 1px ${props => props.theme.uiBorderLight};
        z-index: 500;
        height: 40px;
    }

    .content__content {
        position: relative;
        grid-area: content;
        z-index: 400;
        overflow: hidden;
    }

    @media (${media.md}) {
        grid-template-rows: auto max-content;
        grid-template-areas:
            'content'
            'toolbar';

        .content__toolbar {
            box-shadow: rgba(0,0,0,0.15) 0 -2px 5px;
            border-top: solid 1px ${props => props.theme.uiBorderLight};
            height: 50px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            box-sizing: content-box;
            padding-bottom: env(safe-area-inset-bottom);
            margin-bottom: -1px;
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
