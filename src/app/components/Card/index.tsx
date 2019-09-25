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
import themed from 'components/Theme/themed';
import key from './key.svg';
import media from 'components/Theme/media';

interface Props {
    className?: string;
    name: string;
    account: string;
}

const Card: React.SFC<Props> = props => {
    const slices = props.account.split('-');
    return (
        <div className={props.className}>
            <div className="card__logo">
                <img src="/img/logoHeader.png" />
            </div>
            <div className="card__info">
                <div className="card__labels">Address</div>
                <div className="card__address">
                    <div>{slices[0]}</div>
                    <em className="separator" />
                    <div>{slices[1]}</div>
                    <em className="separator" />
                    <div>{slices[2]}</div>
                    <em className="separator" />
                    <div>{slices[3]}</div>
                    <em className="separator" />
                    <div>{slices[4]}</div>
                </div>
                <div className="card__owner">{props.name}</div>
            </div>
        </div>
    );
};

export default themed(Card)`
    background: url(${key}) -60px -25px #2F5C85 no-repeat;
    box-shadow: rgba(0,0,0,0.3) 3px 3px 10px;
    border-radius: 5px;
    max-width: 370px;

    .card__logo {
        position: relative;
        background: rgba(0,0,0,0.2);
        overflow: hidden;
        height: 60px;

        > img {
            position: absolute;
            max-height: 100%; 
            top: 50%;
            left: 6%;
            bottom: 0;
            height: 26px;
            transform: translateY(-50%);
        }
    }

    .card__info {
        padding: 20px 30px 15px;
    }

    .card__labels {
        color: #D7E5F1;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 500;
        margin-bottom: 3px;
    }

    .card__address {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 6px;
        border-bottom: solid 1px #4C7396;
        margin-bottom: 25px;

        > div {
            color: #fff;
            font-size: 25px;
            line-height: 25px;
        }

        > em {
            font-size: 0;
            line-height: 25px;

            &:before {
                content: '-';
                color: #617B91;
                font-size: 25px;
                font-weight: 600;
            }
        }
    }

    .card__owner {
        font-size: 19px;
        font-weight: 300;
        color: #D7E5F1;
        text-transform: uppercase;
    }

    @media (${media.lg}) {
        min-width: 280px;
        max-width: 350px;
        
        .card__logo {
            height: 55px;
        }
        
        .card__info {
            padding: 15px 23px 15px;
        }
        
        .card__address {
            margin-bottom: 20px;
            
            > div {
                font-size: 20px;
                line-height: 20px;
            }

            > em {
                line-height: 20px;
                
                &:before {
                    font-size: 20px;
                }
            }
        }
        
        .card__owner {
            font-size: 17px;
        }
    }

    @media (${media.xs}) {
        min-width: 245px;
        max-width: 280px;

        .card__address {
            margin-bottom: 17px;
            
            > div {
                font-size: 18px;
                line-height: 18px;
            }

            > em {
                line-height: 18px;

                &:before {
                    font-size: 18px;
                }
            }
        }
    }
`;
