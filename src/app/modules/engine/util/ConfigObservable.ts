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

import { Observable } from 'rxjs';
import platform from 'lib/platform';
import urlJoin from 'url-join';

const resolveConfig = (name: string) =>
    platform.select({
        web: urlJoin(process.env.PUBLIC_URL || location.origin, `${name}.json`),
        desktop: `./${name}.json`
    });

const ConfigObservable = (name: string) =>
    Observable.ajax.getJSON(resolveConfig(name))
        .catch(e => Observable.of({}))
        .defaultIfEmpty({});

export default ConfigObservable;