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

import AplaAPI from 'lib/aplaAPI';
import CodeGenerator, { setIds, convertToTreeData, findTagById, copyObject, idGenerator, updateChildrenText, html2childrenTags } from 'lib/constructor';
import Properties from 'lib/constructor/properties';
import getConstructorTemplate from 'lib/constructor/templates';
import resolveTagHandler from 'lib/constructor/tags';
import * as routerService from 'services/router';
import 'whatwg-fetch';

export interface IStoreDependencies {
    api: IAPIDependency;
    defaultKey: string;
    defaultPassword: string;
    constructorModule: IConstructorDependenies;
    routerService: typeof routerService;
}

export interface IAPIDependency {
    (options: { apiHost: string, sessionToken?: string }): AplaAPI;
}

interface IConstructorDependenies {
    setIds: typeof setIds;
    convertToTreeData: typeof convertToTreeData;
    findTagById: typeof findTagById;
    copyObject: typeof copyObject;
    getConstructorTemplate: typeof getConstructorTemplate;
    idGenerator: typeof idGenerator;
    updateChildrenText: typeof updateChildrenText;
    html2childrenTags: typeof html2childrenTags;
    resolveTagHandler: typeof resolveTagHandler;
    CodeGenerator: typeof CodeGenerator;
    Properties: typeof Properties;
}

const storeDependencies: IStoreDependencies = {
    api: (params: { apiHost: string, sessionToken?: string } = { apiHost: null }) => new AplaAPI({
        apiHost: params.apiHost,
        session: params.sessionToken
    }),
    defaultKey: 'e5a87a96a445cb55a214edaad3661018061ef2936e63a0a93bdb76eb28251c1f',
    defaultPassword: 'default',
    constructorModule: {
        setIds,
        convertToTreeData,
        findTagById,
        copyObject,
        getConstructorTemplate,
        idGenerator,
        updateChildrenText,
        html2childrenTags,
        resolveTagHandler,
        CodeGenerator,
        Properties
    },
    routerService
};

export default storeDependencies;