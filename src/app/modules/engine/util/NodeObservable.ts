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
import { IAPIDependency } from 'modules/dependencies';

const NodeObservable = (params: { nodes: string[], count: number, timeout?: number, concurrency?: number, api: IAPIDependency }) =>
    Observable.from(params.nodes)
        .distinct()
        .flatMap(l => {
            const client = params.api({ apiHost: l });
            return Observable.from(client.getUid())
                .map(() => l)

                // Set request timeout, try the next one
                .timeout(params.timeout || 60000)
                .catch(timeout => Observable.empty<never>());
        }, params.concurrency)
        .take(params.count);

export default NodeObservable;