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

import 'rxjs';
import 'lib/external/fsa';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { moveTreeTag } from '../actions';
import moveTreeTagEpic from './moveTreeTagEpic';
import dependencies from 'modules/dependencies';
import mockStore from 'test/mockStore';

describe('moveTreeTagEpic', () => {
    it('move tree tag', () => {

        const action$ = ActionsObservable.of<Action>(moveTreeTag({
            treeData: [
                {
                    title: 'p: Paragraph text here',
                    children: null,
                    expanded: true,
                    id: 'tag_1',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: true,
                    tag: {
                        tag: 'p',
                        attr: {
                            'class': 'text-primary'
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'Paragraph text here',
                                id: 'tag_2'
                            }
                        ],
                        id: 'tag_1',
                        childrenText: 'Paragraph text here'
                    }
                },
                {
                    title: 'form',
                    children: [
                        {
                            title: 'label: Firstname:',
                            children: null,
                            expanded: true,
                            id: 'tag_4',
                            selected: false,
                            logic: false,
                            canMove: true,
                            canDrop: true,
                            tag: {
                                tag: 'label',
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Firstname:',
                                        id: 'tag_5'
                                    }
                                ],
                                id: 'tag_4',
                                childrenText: 'Firstname:'
                            }
                        },
                        {
                            title: 'input',
                            children: null,
                            expanded: true,
                            id: 'tag_6',
                            selected: false,
                            logic: false,
                            canMove: true,
                            canDrop: false,
                            tag: {
                                tag: 'input',
                                attr: {
                                    'class': 'form-control',
                                    name: 'sample input'
                                },
                                id: 'tag_6'
                            }
                        }
                    ],
                    expanded: true,
                    id: 'tag_3',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: true,
                    tag: {
                        tag: 'form',
                        children: [
                            {
                                tag: 'label',
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Firstname:',
                                        id: 'tag_5'
                                    }
                                ],
                                id: 'tag_4',
                                childrenText: 'Firstname:'
                            },
                            {
                                tag: 'input',
                                attr: {
                                    'class': 'form-control',
                                    name: 'sample input'
                                },
                                id: 'tag_6'
                            }
                        ],
                        id: 'tag_3',
                        childrenText: null
                    }
                },
                {
                    title: 'form',
                    children: [
                        {
                            title: 'label: Lastname:',
                            children: null,
                            expanded: true,
                            id: 'tag_8',
                            selected: false,
                            logic: false,
                            canMove: true,
                            canDrop: true,
                            tag: {
                                tag: 'label',
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Lastname:',
                                        id: 'tag_9'
                                    }
                                ],
                                id: 'tag_8',
                                childrenText: 'Lastname:'
                            }
                        },
                        {
                            title: 'input',
                            children: null,
                            expanded: true,
                            id: 'tag_10',
                            selected: false,
                            logic: false,
                            canMove: true,
                            canDrop: false,
                            tag: {
                                tag: 'input',
                                attr: {
                                    'class': 'form-control',
                                    name: 'sample input'
                                },
                                id: 'tag_10'
                            }
                        },
                        {
                            title: 'button: Submit',
                            children: null,
                            expanded: true,
                            id: 'tag_11',
                            selected: false,
                            logic: false,
                            canMove: true,
                            canDrop: true,
                            tag: {
                                tag: 'button',
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Submit',
                                        id: 'tag_12'
                                    }
                                ],
                                id: 'tag_11',
                                childrenText: 'Submit'
                            }
                        }
                    ],
                    expanded: true,
                    id: 'tag_7',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: true,
                    tag: {
                        tag: 'form',
                        children: [
                            {
                                tag: 'label',
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Lastname:',
                                        id: 'tag_9'
                                    }
                                ],
                                id: 'tag_8',
                                childrenText: 'Lastname:'
                            },
                            {
                                tag: 'input',
                                attr: {
                                    'class': 'form-control',
                                    name: 'sample input'
                                },
                                id: 'tag_10'
                            },
                            {
                                tag: 'button',
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Submit',
                                        id: 'tag_12'
                                    }
                                ],
                                id: 'tag_11',
                                childrenText: 'Submit'
                            }
                        ],
                        id: 'tag_7',
                        childrenText: null
                    }
                },
                {
                    title: 'table',
                    children: null,
                    expanded: true,
                    id: 'tag_13',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: false,
                    tag: {
                        tag: 'table',
                        id: 'tag_13',
                        attr: {
                            source: 'keysStr',
                            columns: 'KEY_ID=id,MONEY=amount'
                        }
                    }
                },
                {
                    title: 'image',
                    children: null,
                    expanded: true,
                    id: 'tag_0',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: false,
                    tag: {
                        tag: 'image',
                        attr: {
                            alt: 'Image',
                            src: '/img/dummy.png'
                        },
                        id: 'tag_0'
                    }
                }
            ],
            tagID: 'tag_0'

        }));

        const expectedOutput: any = [
            {
                payload: {
                    destinationTagID: 'tag_13',
                    position: 'after',
                    tag: {
                        attr: {
                            alt: 'Image',
                            src: '/img/dummy.png'
                        },
                        id: 'tag_0',
                        tag: 'image'
                    }
                },
                type: 'editor/MOVE_TAG_STARTED'
            }
        ];

        dependencies.constructorModule.idGenerator.setCounter(15);

        moveTreeTagEpic(action$, mockStore, { constructorModule: dependencies.constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});