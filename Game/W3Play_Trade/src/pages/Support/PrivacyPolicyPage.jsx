import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import policyAPI from '../../API/policy';
import APP from '../../app';
import PageHeader from '../../comp/page_header';
import useAppState from '../../hooks/useAppState';
import HelmetManager from '../../comp/HelmetManager';

export default function PrivacyPolicyPage() {

    const wrap_ref = useRef();
    const lang = useSelector(state => state.mainRememberReducer.app_lang) || 'en';
    const [content, setContent] = useState('');

    // privacy policy content
    async function getData(lang) {
        const res = await policyAPI.getPolicy(lang?.code || 'en');
        (res?.data?.content && !res?.error) ? setContent(res.data) : getData('en');
    }

    useEffect(() => {
        if (lang) getData(lang);
    }, [])

    return (

        <div className="page text_page privacy_policy">
            <HelmetManager
                title="Policy"
                description="Game Policy: Read Our Policies on Trading, Privacy, Fair Gaming, DeFi Integration, and Earnings."
                keywords="game policy, trading policies, privacy policy, fair gaming, DeFi integration, earnings policies, UpvsDown"
                canonical="/policy"
            />
            <PageHeader title={content?.title || ''} text_scale={.62}
                skipHistory={true}
                goldTxtstyles={{ marginTop: '.7em' }} />

            <div className="content_wrap" ref={wrap_ref}>

                <div className="content">
                    <p className="text_content" dangerouslySetInnerHTML={{ __html: content?.content }} style={{
                        textAlign: 'left',
                    }} />
                </div>

            </div>

        </div>

    );

};