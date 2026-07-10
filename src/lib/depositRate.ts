/** Standard course/dive booking deposit (pay now). */
export const COURSE_DEPOSIT_RATE = 0.1;

export const DEPOSIT_PERCENT_LABEL = '10%';

export function depositFromTotal(totalMajor: number) {
  return totalMajor > 0 ? Math.round(totalMajor * COURSE_DEPOSIT_RATE) : 0;
}

export function totalFromDeposit(depositMajor: number) {
  return depositMajor > 0 ? Math.round(depositMajor / COURSE_DEPOSIT_RATE) : 0;
}
