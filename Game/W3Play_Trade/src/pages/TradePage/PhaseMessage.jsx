import React from 'react'
import APP from '../../app';

function PhaseMessage({ dir }) {
    return (
        <div className="phase_message">
            {APP.term('phase_message_a')}
            <div className="small">{APP.term('phase_message_b')}</div>
        </div>
    )
}

export default PhaseMessage
