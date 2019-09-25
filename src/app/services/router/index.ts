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

import Route from 'route-parser';
import querystring from 'query-string';

export interface IRouteMatch {
    parts: {
        [name: string]: string;
    };
    query: {
        [param: string]: string;
    };
}

export const matchRoute = (path: string, match: string): IRouteMatch | undefined => {
    const route = new Route(path).match(match);
    if (!route) {
        return undefined;
    }

    return {
        parts: route,
        query: querystring.parseUrl(match).query
    };
};

export const generateRoute = (path: string, params?: { [name: string]: string }) => {
    const query = params ? querystring.stringify(params) : '';
    return `${path}${query && '?' + query}`;
};

export const routeToBrowser = (section: string, page: string, params?: { [name: string]: string }) =>
    generateRoute(`/browse/${section}/${page}`, params);