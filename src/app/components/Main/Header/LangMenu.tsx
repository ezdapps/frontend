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
import { ILocale } from 'apla';

import HeaderButton from './HeaderButton';
import Heading from 'components/Dropdown/Heading';
import Item from 'components/Dropdown/Item';

interface Props {
    locale: string;
    locales: ILocale[];
    onChange?: (locale: string) => void;
}

const LangMenu: React.SFC<Props> = props => (
    <HeaderButton
        align="right"
        content={(
            <div>
                <Heading>Language</Heading>
                <div>
                    {props.locales.map(locale => (
                        <Item key={locale.key} disabled={locale.key === props.locale} onClick={() => props.onChange(locale.key)}>{locale.name}</Item>
                    ))}
                </div>
            </div>
        )}
    >
        <em className="icon icon-globe" />
    </HeaderButton>
);

export default LangMenu;