import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const ComparisonTable = () => {

    return (

        <>
        
            <section className="entry-section comparison-table web-only block">

                <div className="main-flex">

                    <div className="caption">
                        <span>{APP.term('entry_comparison_table')}</span>
                    </div>

                    <div className="table-flex">

                        <div className="column options">
                            <div className="cell extend-top"></div>
                            <div className="cell description border"></div>
                            <div className="cell border"><span>{APP.term('entry_winning_withd')}</span></div>
                            <div className="cell border"><span>{APP.term('entry_deposit')}</span></div>
                            <div className="cell border"><span>{APP.term('entry_against_house')}</span></div>
                            <div className="cell border"><span>{APP.term('entry_win_chances')}</span></div>
                            <div className="cell border"><span>{APP.term('entry_peer_to_peer')}</span></div>
                            <div className="cell border"><span>{APP.term('entry_transparent')}</span></div>
                            <div className="cell extend-bottom"></div>
                        </div>

                        <div className="column gaming">
                            <div className="cell extend-top"></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>{APP.term('entry_gaming')}</span></div>
                                <div className="desc-middle-percentage"><span>30%</span></div>
                                <div className="desc-bottom-caption"><span>{APP.term('entry_comp_win_ratio')}</span></div>
                            </div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell extend-bottom"></div>
                        </div>

                        <div className="column up-vs-down">
                            <div className="cell extend-top"><span>{APP.term('entry_best_opt')}</span></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>{APP.term('entry_up_down')}</span></div>
                                <div className="desc-middle-percentage"><span>50%+</span></div>
                                <div className="desc-bottom-caption"><span>{APP.term('entry_comp_win_ratio')}</span></div>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_auto_pay')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_connect_wallet')}</span></p>
                            </div>
                            <div className="cell border">
                                <div className="option-status x-sign"></div>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_best')}</span></p>
                            </div>
                            <div className="cell border">
                                <div className="option-status v-sign"></div>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>100%</span></p>
                            </div>
                            <div className="cell extend-bottom">
                                <PlayNowButton />
                            </div>
                        </div>

                        <div className="column finance">
                            <div className="cell extend-top"></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>{APP.term('entry_finance')}</span></div>
                                <div className="desc-middle-percentage"><span>25%</span></div>
                                <div className="desc-bottom-caption"><span>{APP.term('entry_comp_win_ratio')}</span></div>
                            </div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell extend-bottom"></div>
                        </div>

                    </div>

                </div>

            </section>

            <section className="entry-section comparison-table mobile-only block">

                <div className="main-flex">

                    <div className="caption">
                        <span>{APP.term('entry_comparison_table')}</span>
                    </div>

                    <div className="table-flex">

                        <div className="column gaming">
                            <div className="cell extend-top"></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>{APP.term('entry_gaming')}</span></div>
                                <div className="desc-middle-percentage"><span>30%</span></div>
                                <div className="desc-bottom-caption"><span>{APP.term('entry_comp_win_ratio')}</span></div>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_winning_withd')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_deposit')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_against_house')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_win_chances')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_peer_to_peer')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_transparent')}</span></p>
                            </div>
                        </div>

                        <div className="column up-vs-down">
                            <div className="cell extend-top"><span>{APP.term('entry_best_opt')}</span></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>{APP.term('entry_up_down')}</span></div>
                                <div className="desc-middle-percentage"><span>50%+</span></div>
                                <div className="desc-bottom-caption"><span>{APP.term('entry_comp_win_ratio')}</span></div>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_win_go')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_connect_wallet_s')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_players_game')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_best_to_win')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_peer_to_peer')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_very_transparent')}</span></p>
                            </div>
                        </div>

                        <div className="column finance">
                            <div className="cell extend-top"></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>{APP.term('entry_finance')}</span></div>
                                <div className="desc-middle-percentage"><span>25%</span></div>
                                <div className="desc-bottom-caption"><span>{APP.term('entry_comp_win_ratio')}</span></div>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_winning_withd')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_deposit')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status v-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_against_house')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_win_chances')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_peer_to_peer')}</span></p>
                            </div>
                            <div className="cell border text">
                                <div className="option-status x-sign"></div>
                                <p className="option-caption"><span>{APP.term('entry_transparent')}</span></p>
                            </div>
                        </div>

                    </div>

                    <PlayNowButton />

                </div>

            </section>

        </>

    );

};

export default ComparisonTable;