import { utils } from 'web3';

export default function scientificToInteger(scientificNotation) {

    function roundUpToNearest(value, nearest) {
        return Math.round(value / nearest) * nearest;
    }

    if (scientificNotation.toString().includes('e')) {

        let [coefficient, exponent] = scientificNotation.toString().split('e+'),
            exp = parseInt(exponent) - 18,
            multiplier = (Math.pow(10, Number(exp))),
            // abc = roundUpToNearest(Number(coefficient), 0.01) * multiplier;
            abc = (Number(coefficient)) * multiplier;

        // console.log('scientificNotation:', scientificNotation, 'exp', exp, 'multiplier:', multiplier, 'coefficient:', coefficient)
        // console.log(parseFloat(abc).toFixed(1).toString(), 'abc')

        // let k = utils.fromWei(scientificNotation.toString(), 'ether');
        // console.log(k, 'kkkkkkkk')
        return parseFloat(abc).toFixed(1).toString();
    }
    else {
        return scientificNotation;
    }
}