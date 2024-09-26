import React from 'react'
import { useSelector } from 'react-redux';
import TutorialHub from './Affiliates/TutorialHub';
// import AffiliateDashboard from './Affiliates/Dashboard';
import LinksMananger from './Affiliates/LinksMananger';

export default function AffiliatePagesHub() {
    const seen_tutorial = useSelector(state => state.mainRememberReducer.seen_affiliate_tutorial);
    return (
        seen_tutorial
            ? <LinksMananger />
            : <TutorialHub />
    )
}