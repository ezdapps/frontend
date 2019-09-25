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

import Button from './Button';
import Div from './Div';
import Em from './Em';
import Form from './Form';
import Image from './Image';
import ImageInput from './ImageInput';
import Input from './Input';
import Label from './Label';
import P from './P';
import RadioGroup from './RadioGroup';
import Span from './Span';
import Strong from './Strong';
import Table from './Table';
import If from './If';
import ElseIf from './ElseIf';
import Else from './Else';
import Data from './Data';
import Hint from './Hint';
import Logic from './Logic';

const tagHandlers = {
    list: {
        'button': Button,
        'div': Div,
        'em': Em,
        'form': Form,
        'image': Image,
        'imageinput': ImageInput,
        'input': Input,
        'label': Label,
        'p': P,
        'radiogroup': RadioGroup,
        'span': Span,
        'strong': Strong,
        'table': Table,
        'if': If,
        'elseif': ElseIf,
        'else': Else,
        'data': Data,
        'hint': Hint
    },
    default: Logic
};

const resolveTagHandler = (name: string) => {
    return tagHandlers.list[name] || tagHandlers.default;
};

export default resolveTagHandler;
