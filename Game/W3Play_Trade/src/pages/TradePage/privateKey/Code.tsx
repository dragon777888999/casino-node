import React from 'react';
import APP from '../../../app';

const Code = ({ email, err, setError, val, onChange }) => (

    <div className="content">

        <p className="desc">
            <span>{APP.term('private_key_code_desc1')} {email} {APP.term('private_key_code_desc2')}</span>
        </p>
        
        <div className={"inputbox " + (err ? 'error' : '')}>
            <input placeholder={APP.term('private_key_input_placeholder')}
                onChange={onChange} />
        </div>

        {err &&
        (<p className="err_msg">
            <span>{APP.term('private_key_code_err')}</span>
        </p>)}
        
        <div className={"next_btn " + (val ? 'active' : '')} onClick={setError}>
            <p><span>{APP.term('private_key_code_next')}</span></p>
        </div>

    </div>
)

export default Code;