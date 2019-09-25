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

import ProtypoConstructor from './ProtypoConstructor';
import Button from './handlers/Button';
import If from './handlers/If';
import ElseIf from './handlers/ElseIf';
import Else from './handlers/Else';
import Div from './handlers/Div';
import Span from './handlers/Span';
import Strong from './handlers/Strong';
import Em from './handlers/Em';
import Form from './handlers/Form';
import Image from './handlers/Image';
import ImageInput from './handlers/ImageInput';
import Input from './handlers/Input';
import Label from './handlers/Label';
import P from './handlers/P';
import RadioGroup from './handlers/RadioGroup';
import Hint from './handlers/Hint';

import Table from './handlers/Table';
import Logic from './handlers/Logic';

const handlers = {
    'button': Button,
    'if': If,
    'elseif': ElseIf,
    'else': Else,
    'div': Div,
    'span': Span,
    'strong': Strong,
    'em': Em,
    'form': Form,
    'image': Image,
    'imageinput': ImageInput,
    'input': Input,
    'label': Label,
    'p': P,
    'radiogroup': RadioGroup,
    'table': Table,
    'hint': Hint
};

export const resolveHandler = (name: string) => {
    return handlers[name] || Logic;
};

export default ProtypoConstructor;