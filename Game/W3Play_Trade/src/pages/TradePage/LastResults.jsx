import React from 'react';
import ResultTile from './ResultTile';
import useDimension from '../../hooks/useDimension';
import SystemStats from './SystemStats';
import APP from '../../app';
import useAppState from '../../hooks/useAppState';
import lastResultsLength from '../../utils/lastResultsLength';

const LastResults = () => {

    const history = useAppState('history_list'),
        skin_idx = useAppState('skin_idx'),
        isMobilePortrait = useDimension(),
        betsToRender = isMobilePortrait ? 6 : lastResultsLength(skin_idx);

    return (
        <div className="last_results">
            <SystemStats />
            <div className="results">
                {/*history?.length && */ history?.sort((a, b) => (b?.timestamp - a?.timestamp))
                    ?.filter((item, i) => i < betsToRender)
                    .map((item, i) => <ResultTile key={item?.timestamp} {...item} />)}
            </div>
        </div>
    );

};

export default React.memo(LastResults, ({ prev }, { next }) => prev === next);