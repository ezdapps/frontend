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
import styled from 'styled-components';
import platform from 'lib/platform';

export interface ITitlebarProps {
    maximizable?: boolean;
}

const StyledControls = styled.div`
    position: relative;
    z-index: 20000;

    .window-title {
        position: absolute;
        text-align: center;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
`;

const Titlebar = platform.select<React.SFC<ITitlebarProps>>({
    web: () => null,
    desktop: props => {
        const DarwinTitlebar = require('./DarwinTitlebar').default;
        const LinuxTitlebar = require('./LinuxTitlebar').default;
        const WinTitlebar = require('./WinTitlebar').default;

        return (
            <StyledControls>
                {platform.select({
                    darwin: (<DarwinTitlebar {...props} />),
                    linux: (<LinuxTitlebar {...props} />),
                    win32: (<WinTitlebar {...props} />),

                    // Fallback for unsupported platforms
                    desktop: (<LinuxTitlebar {...props} />)
                })}
                <div className="window-title">{props.children}</div>
            </StyledControls>
        );
    }
});

export default Titlebar;