const NEW_REGIME_SLABS = [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 0.05 },
  { limit: 1200000, rate: 0.10 },
  { limit: 1600000, rate: 0.15 },
  { limit: 2000000, rate: 0.20 },
  { limit: 2400000, rate: 0.25 },
  { limit: Infinity, rate: 0.30 },
];

const OLD_REGIME_SLABS = [
  { limit: 250000, rate: 0 },
  { limit: 500000, rate: 0.05 },
  { limit: 1000000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
];

const CESS_RATE = 0.04;
const NEW_REGIME_STD_DEDUCTION = 75000;
const OLD_REGIME_STD_DEDUCTION = 50000;

function computeSlabTax(income, slabs) {
  let tax = 0;
  let prev = 0;
  for (const { limit, rate } of slabs) {
    if (income <= prev) break;
    const taxable = Math.min(income, limit) - prev;
    tax += taxable * rate;
    prev = limit;
  }
  return tax;
}

export function calculateIncomeTax(grossIncome, regime = 'new') {
  const stdDeduction = regime === 'new' ? NEW_REGIME_STD_DEDUCTION : OLD_REGIME_STD_DEDUCTION;
  const taxableIncome = Math.max(0, grossIncome - stdDeduction);
  const slabs = regime === 'new' ? NEW_REGIME_SLABS : OLD_REGIME_SLABS;
  const baseTax = computeSlabTax(taxableIncome, slabs);
  const cess = baseTax * CESS_RATE;
  return { taxableIncome, baseTax, cess, totalTax: baseTax + cess };
}

export function marginalRate(grossIncome, regime = 'new') {
  const stdDeduction = regime === 'new' ? NEW_REGIME_STD_DEDUCTION : OLD_REGIME_STD_DEDUCTION;
  const taxableIncome = Math.max(0, grossIncome - stdDeduction);
  const slabs = regime === 'new' ? NEW_REGIME_SLABS : OLD_REGIME_SLABS;
  let rate = 0;
  let prev = 0;
  for (const slab of slabs) {
    if (taxableIncome <= prev) break;
    rate = slab.rate;
    prev = slab.limit;
  }
  return rate * (1 + CESS_RATE);
}

export function calculatePerquisiteTax(salary, perquisiteValue, regime = 'new') {
  const taxWithPerq = calculateIncomeTax(salary + perquisiteValue, regime).totalTax;
  const taxWithout = calculateIncomeTax(salary, regime).totalTax;
  return taxWithPerq - taxWithout;
}

/**
 * @param {'listed'|'startup'|'unlisted'} companyType
 * @param {number} holdingMonths
 * @param {number} gain - capital gain amount
 * @param {number} salary - for slab rate on STCG unlisted
 * @param {'new'|'old'} regime
 */
export function calculateCapitalGainsTax(companyType, holdingMonths, gain, salary = 0, regime = 'new') {
  if (gain <= 0) return { rate: 0, tax: 0, type: 'No Gain' };

  const isListed = companyType === 'listed';
  const ltcgThreshold = isListed ? 12 : 24;
  const isLTCG = holdingMonths > ltcgThreshold;

  if (isLTCG) {
    const rate = 0.125;
    const cess = gain * rate * CESS_RATE;
    return { rate, tax: gain * rate + cess, type: 'LTCG' };
  }

  if (isListed) {
    const rate = 0.20;
    const cess = gain * rate * CESS_RATE;
    return { rate, tax: gain * rate + cess, type: 'Listed STCG' };
  }

  const taxOnSalaryPlusGain = calculateIncomeTax(salary + gain, regime).totalTax;
  const taxOnSalary = calculateIncomeTax(salary, regime).totalTax;
  return { rate: null, tax: taxOnSalaryPlusGain - taxOnSalary, type: 'Unlisted STCG (slab)' };
}
