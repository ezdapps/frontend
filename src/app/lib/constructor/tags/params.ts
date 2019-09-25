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

export const params = {
    'alt': 'Alt',
    'app': 'App',
    'appid': 'AppID',
    'body': 'Body',
    'class': 'Class',
    'cancelbutton': 'CancelButton',
    'column': 'Column',
    'columns': 'Columns',
    'colors': 'Colors',
    'condition': 'Condition',
    'confirmbutton': 'ConfirmButton',
    'contract': 'Contract',
    'data': 'Data',
    'datetime': 'DateTime',
    'disabled': 'Disabled',
    'exp': 'Exp',
    'fieldlabel': 'FieldLabel',
    'fieldvalue': 'FieldValue',
    'for': 'For',
    'format': 'Format',
    'from': 'From',
    'icon': 'Icon',
    'hmap': 'Hmap',
    'index': 'Index',
    'interval': 'Interval',
    'lang': 'Lang',
    'limit': 'Limit',
    'maptype': 'MapType',
    'memberid': 'MemberID',
    'minlength': 'minLength',
    'maxlength': 'maxLength',
    'name': 'Name',
    'namecolumn': 'NameColumn',
    'page': 'Page',
    'pageparams': 'PageParams',
    'params': 'Params',
    'placeholder': 'Placeholder',
    'prec': 'Prec',
    'prefix': 'Prefix',
    'ratio': 'Ratio',
    'source': 'Source',
    'src': 'Src',
    'step': 'Step',
    'style': 'Style',
    'table': 'table',
    'text': 'Text',
    'time1': 'Time1',
    'time2': 'Time2',
    'title': 'Title',
    'to': 'To',
    'type': 'Type',
    'value': 'Value',
    'valuecolumn': 'ValueColumn',
    'vde': 'Vde',
    'width': 'Width',
    'where': 'Where'
};

const LogicTagNames = {
    'getvar': 'GetVar',
    'setvar': 'SetVar',
    'addtoolbutton': 'AddToolButton',
    'linkpage': 'LinkPage',
    'and': 'And',
    'calculate': 'Calculate',
    'cmptime': 'CmpTime',
    'datetime': 'DateTime',
    'dbfind': 'DBFind',
    'now': 'Now',
    'or': 'Or',
    'code': 'Code',
    'chart': 'Chart',
    'forlist': 'ForList',
    'menugroup': 'MenuGroup',
    'menuitem': 'MenuItem',
    'qrcode': 'QRcode',
    'address': 'Address',
    'appparam': 'AppParam',
    'data': 'Data',
    'ecosysparam': 'EcosysParam',
    'jsontosource': 'JsonToSource',
    'langres': 'LangRes',
    'range': 'Range',
    'sysparam': 'SysParam',
    'binary': 'Binary',
    'settitle': 'SetTitle',
    'inputerr': 'InputErr',
    'select': 'Select',
    'inputmap': 'InputMap',
    'inputMap': 'InputMap',
    'map': 'Map',
    'include': 'Include'
};

const TailTagNames = {
    'alert': 'Alert',
    'columns': 'Columns',
    'count': 'Count',
    'custom': 'Custom',
    'ecosystem': 'Ecosystem',
    'limit': 'Limit',
    'offset': 'Offset',
    'order': 'Order',
    'popup': 'Popup',
    'style': 'Style',
    'vars': 'Vars',
    'validate': 'Validate',
    'where': 'Where',
    'whereid': 'WhereId'
};

export function getTailTagName(name: string) {
    return TailTagNames[name] || name;
}

export function getLogicTagName(name: string) {
    return LogicTagNames[name] || name;
}

export default function getParamName(name: string) {
    return params[name] || name;
}