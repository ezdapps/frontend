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

import ValidatedCheckbox from './ValidatedCheckbox';
import ValidatedControl from './ValidatedControl';
import ValidatedFile from './ValidatedFile';
import ValidatedImage from 'containers/Validation/ValidatedImage';
import ValidatedMap from 'containers/Validation/ValidatedMap';
import ValidatedSelect from './ValidatedSelect';
import ValidationMessage from './ValidationMessage';
import ValidatedTextarea from './ValidatedTextarea';
import ValidatedForm from './ValidatedForm';
import ValidatedFormGroup from './ValidatedFormGroup';
import ValidatedRadioGroup from './ValidatedRadioGroup';
import ValidatedSubmit from './ValidatedSubmit';
import * as validators from './Validators';

export default {
    components: {
        ValidatedCheckbox,
        ValidatedControl,
        ValidatedFile,
        ValidatedImage,
        ValidatedMap,
        ValidatedSelect,
        ValidatedTextarea,
        ValidatedForm,
        ValidatedFormGroup,
        ValidatedRadioGroup,
        ValidatedSubmit,
        ValidationMessage
    },
    validators
};