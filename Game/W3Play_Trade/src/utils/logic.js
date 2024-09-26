// condition a result by relation of 2 numbers with ">", "=", and "<" cases, in that order.
export function relation_cases(num1, num2, case_big, case_eq, case_sml){
	return num1 == num2 ? case_eq : (num1 > num2 ? case_big : case_sml);
}