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
import classNames from 'classnames';
import { IBreadcrumb } from 'apla/content';
import { FormattedMessage } from 'react-intl';

import themed from 'components/Theme/themed';
import Toolbar from 'components/Main/Toolbar';
import Breadcrumb from './Breadcrumb';
import ToolButton from 'components/Main/Toolbar/ToolButton';
import media from 'components/Theme/media';

interface Props {
    values: IBreadcrumb[];
    onRefresh: () => void;
}

const StyledBreadcrumbs = themed.ul`
    height: 100%;
    margin: 0;
    padding: 0 10px;
    font-size: 0;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style-type: none;
    
    > li {
        font-size: 13px;
        font-weight: 400;
        color: ${props => props.theme.toolbarForegroundActive};
        margin-right: 10px;
        vertical-align: top;

        &:first-child:before {
            content: none;
        }

        &:before {
            content: '/';
            font-size: 13px;
            color: ${props => props.theme.toolbarSpacerForeground};
            display: inline-block;
            margin-right: 8px;
        }
    }


    @media(${media.md}) {
        > li.breadcrumbs__breadcrumb_normal {
            display: none;
        }
    }
`;

const Breadcrumbs: React.SFC<Props> = props => (
    <Toolbar>
        <StyledBreadcrumbs>
            {props.values.map((breadcrumb, i) => (
                <li
                    key={i}
                    className={classNames({
                        breadcrumbs__breadcrumb_home: 0 === i,
                        breadcrumbs__breadcrumb_normal:
                            props.values.length - 1 > i && 0 !== i,
                        breadcrumbs__breadcrumb_current:
                            props.values.length - 1 === i
                    })}
                >
                    <Breadcrumb
                        home={i === 0}
                        active={i !== props.values.length - 1}
                        section={breadcrumb.section}
                        page={breadcrumb.page}
                        params={breadcrumb.params}
                    >
                        {breadcrumb.title}
                    </Breadcrumb>
                </li>
            ))}
            {1 === props.values.length && (
                <li className="breadcrumbs__breadcrumb_current">
                    <Breadcrumb section="" page="" params={{}}>
                        <FormattedMessage
                            id="navigation.default_page"
                            defaultMessage="Home page"
                        />
                    </Breadcrumb>
                </li>
            )}
        </StyledBreadcrumbs>
        <ToolButton icon="icon-refresh" onClick={props.onRefresh}>
            <FormattedMessage
                id="navigation.refresh"
                defaultMessage="Refresh"
            />
        </ToolButton>
    </Toolbar>
);

export default Breadcrumbs;
