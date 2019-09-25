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

declare module 'apla/content' {
    import { TProtypoElement } from 'apla/protypo';
    import { Location } from 'history';

    interface IMenu {
        readonly name: string;
        readonly content: TProtypoElement[];
    }

    type TBreadcrumbType =
        'MENU' | 'PAGE' | 'IGNORE';

    type TPageParams = {
        [key: string]: string;
    }

    interface IBreadcrumb {
        readonly caller: string;
        readonly type: TBreadcrumbType;
        readonly section: string;
        readonly title: string;
        readonly page: string;
        readonly params: TPageParams;
    }

    type TPageStatus =
        'PENDING' | 'LOADED' | 'ERROR';

    interface IPage {
        readonly name: string;
        readonly status: TPageStatus;
        readonly static: boolean;
        readonly content: TProtypoElement[];
        readonly params: TPageParams;
        readonly error?: string;
        readonly location: Location;
    }

    interface ISection {
        readonly index: number;
        readonly name: string;
        readonly title: string;
        readonly defaultPage: string;
        readonly breadcrumbs: IBreadcrumb[];
        readonly menus: IMenu[];
        readonly page?: IPage;
    }
}