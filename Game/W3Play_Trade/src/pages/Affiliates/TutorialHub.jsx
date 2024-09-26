import React, {useState} from 'react'
import TutorialPage1 from './TutorialStep1'
import TutorialPage2 from './TutorialStep2'
import TutorialPage3 from './TutorialStep3'
import HelmetManager from '../../comp/HelmetManager'

var step_components = {
    '1': TutorialPage1,
    '2': TutorialPage2,
    '3': TutorialPage3,
}

export default function TutorialHub(){
    var [step, setStep] = useState(1),
    StepComp = step_components[step];
    return ( 
        <>
            <HelmetManager
                title="Share"
                description="Referral Program: Spread the Word About Our Platform and Earn Commission. Generate a referral link to get started."
                keywords="Crypto Referral program,igmaing affilite , rev share commision, content creator earnings, UpvsDown"
                canonical="/share"
            />
            <StepComp setStep={setStep}/>
        </>
    )
}