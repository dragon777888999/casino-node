import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import APP from '../../app';
import '../../styles/pages/partners.css';
import poolSwitch from '../../utils/poolSwitcher';

export const PositionsHeader = ({ back, currentPageIdx }) => {

    let positions: number[] = [...Array(5).keys()],
        currentPoolDetails = useSelector((state: RootStateOrAny) => state.mainRememberReducer.currentPool),
        validBtn = (currentPageIdx == positions?.length) ? false : true;

    // position val/symbol according to the progress
    function positionSymbol(currentPageIdx: number, itm: number) {
        if (itm + 1 < currentPageIdx) return '✔';
        else return itm + 1;
    }

    // check last page to validate back btn
    function validBackBtn(valid: boolean) {
        if (valid) back();
        else { };
    }

    return (
        <div className="partners_slide_header">
            <div className="partners_slide_backbtn" onClick={() => validBackBtn(validBtn)}
                style={{
                    cursor: !validBtn ? '' : 'pointer',
                    border: !validBtn ? 'none' : ''
                }}>
                {currentPageIdx == positions?.length ? null
                    : <p className="partners_slide_backbtn_txt">{APP.term('partners_slide_back')}</p>
                }
            </div>
            <div className="partners_slide_positions_row">
                {positions.map(itm => (
                    <div key={itm} className="partners_slide_position_wrap">
                        <div className="partners_slide_header_position"
                            style={{
                                borderColor: itm + 1 < currentPageIdx ? 'transparent' : currentPageIdx == itm + 1 ? '#f4d56f' : '',
                                background: itm + 1 < currentPageIdx ? '#4db61a' : ''
                            }}>
                            <p className="partners_slide_pos_idx"
                                style={{
                                    color: itm + 1 < currentPageIdx ? '#fff' : currentPageIdx == itm + 1 ? '#f4d56f' : ''
                                }}>
                                {positionSymbol(currentPageIdx, itm)}
                            </p>
                        </div>
                        {itm + 1 == positions.length ? null :
                            <div className="partners_slide_header_prog_pos"
                                style={{ background: itm + 1 < currentPageIdx ? '#388712' : '' }} />}
                    </div>
                ))}

            </div>
            <div className="partners_slide_closebtn" style={{ border: !validBtn ? 'none' : '' }}>
                {currentPageIdx == positions?.length ? null
                    : <Link to={{ pathname: poolSwitch(currentPoolDetails) }}>
                        <p className="partners_slide_closebtn_txt">{APP.term('partners_slide_close')}</p>
                    </Link>
                }
            </div>
        </div>
    )
}