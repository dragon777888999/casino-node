import {first_100_primes} from './primes'
import {num_asc} from './array'

const {round} = Math;

export function add_commas(num, tail) {
    if (tail !== undefined) num = Number(num).toFixed(tail);
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return parts.join('.');
}

export function to_precision(num, precision){
    return Number(num.toFixed(precision));
}

export function round_up_to(num, base){
    return num - (num % base) + base;
}
export function round_down_to(num, base){
    return num - (num % base);
}

// can factorize numbers below 299209 (the 101th prime squared)
export function factorize(num){
    var factors = [],
        i = 0,
        p = first_100_primes[i];
    
    while (round(num/p) >= p && i < 99){
        if(num % p == 0){
            num = round(num/p);
            factors.push(p)
        }
        else{
            i++
            p = first_100_primes[i]
        }
    }
    factors.push(num);
    return factors;
}

// find the minimal representation of a ratio of 2 numbers
export function minimal_ratio(a, b){
    if (a==0 && b==0) return [1,1];
    if (a==0 || b==0) return [a,b];

    let ratio = [1, 1],
        a_facts = factorize(a).sort(num_asc),
        b_facts = factorize(b).sort(num_asc);

    while(a_facts.length || b_facts.length){
        let af = a_facts[0],
            bf = b_facts[0];
            
        if(af == bf){// cancel common factor
            a_facts.shift();
            b_facts.shift();
        }
        else if(af < bf || bf === undefined){
            ratio[0] *= a_facts.shift();
        }
        else if(af > bf || af === undefined){
            ratio[1] *= b_facts.shift();
        }
    }

    return ratio;
}