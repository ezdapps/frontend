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

import DropdownButton from 'components/Button/DropdownButton';

interface Props {

}

const TransactionsMenu: React.SFC<Props> = props => (
    <DropdownButton
        align="right"
        menuWidth={300}
        content={(
            <div style={{ color: '#000' }}>
                <div>Content goes here</div>
                <div>Content goes here</div>
                <div>Content goes here</div>
                <div>Content goes here</div>
                <div>Content goes here</div>
            </div>
        )}
    >
        <em className="icon icon-hourglass" />
    </DropdownButton>
);

export default TransactionsMenu;