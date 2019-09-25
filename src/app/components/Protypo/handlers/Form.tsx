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
import propTypes from 'prop-types';
import StyledComponent from './StyledComponent';
import ValidatedForm from 'components/Validation/ValidatedForm';
import InteractionManager, { TConditionMap } from '../interaction';

export interface IFormProps {
    'class'?: string;
    'className'?: string;
}

interface IFormState {
    form: ValidatedForm;
    conditionMap: {
        [id: string]: TConditionMap;
    };
}

class Form extends React.Component<IFormProps, IFormState> {
    private _interactionManager = new InteractionManager();

    static childContextTypes = {
        form: propTypes.instanceOf(ValidatedForm),
        interactionManager: propTypes.instanceOf(InteractionManager),
        conditionMap: propTypes.object
    };

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            form: null,
            conditionMap: {}
        };
    }

    getChildContext() {
        return {
            form: this.state.form,
            interactionManager: this._interactionManager,
            conditionMap: this.state.conditionMap
        };
    }

    bindForm(form: ValidatedForm) {
        if (!this.state.form) {
            this.setState({
                form
            });
            form.onUpdate(e => {
                this._interactionManager.on('input_change', {
                    name: e.name,
                    value: String(e.value)
                });

                this.setState({
                    conditionMap: this._interactionManager.getConditionMap()
                });
            });
        }
    }

    render() {
        return (
            <ValidatedForm ref={this.bindForm.bind(this)} className={[this.props.class, this.props.className].join(' ')}>
                {this.props.children}
            </ValidatedForm>
        );
    }
}

export default StyledComponent(Form);