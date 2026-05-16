import { ToolResult, ToolInput } from '@/types/tool'

export const financeToolCalculations = {
  emi: {
    inputs: [
      { name: 'principal', type: 'number', label: 'Loan Amount', unit: 'currency', placeholder: 'e.g., 100000', required: true },
      { name: 'rate', type: 'number', label: 'Annual Interest Rate', unit: '%', placeholder: 'e.g., 10', required: true, step: 0.01 },
      { name: 'months', type: 'number', label: 'Loan Duration', unit: 'months', placeholder: 'e.g., 60', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const principal = parseFloat(inputs.principal)
      const ratePerMonth = parseFloat(inputs.rate) / 100 / 12
      const months = parseFloat(inputs.months)

      const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / (Math.pow(1 + ratePerMonth, months) - 1)
      const totalPayment = emi * months
      const totalInterest = totalPayment - principal

      return {
        outputs: [
          { label: 'Monthly EMI', value: emi.toFixed(2), unit: 'currency' },
          { label: 'Total Payment', value: totalPayment.toFixed(2), unit: 'currency' },
          { label: 'Total Interest', value: totalInterest.toFixed(2), unit: 'currency' },
        ],
        tips: [
          'EMI = Equated Monthly Installment',
          'Pay on time to avoid penalties',
          'Consider early repayment to save interest',
        ],
      }
    },
  },

  loan: {
    inputs: [
      { name: 'amount', type: 'number', label: 'Loan Amount', unit: 'currency', placeholder: 'e.g., 50000', required: true },
      { name: 'rate', type: 'number', label: 'Annual Interest Rate', unit: '%', placeholder: 'e.g., 8', required: true, step: 0.01 },
      { name: 'years', type: 'number', label: 'Loan Duration', unit: 'years', placeholder: 'e.g., 5', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const amount = parseFloat(inputs.amount)
      const rate = parseFloat(inputs.rate)
      const years = parseFloat(inputs.years)
      const months = years * 12
      const monthlyRate = rate / 100 / 12

      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const totalPayment = monthlyPayment * months
      const totalInterest = totalPayment - amount

      return {
        outputs: [
          { label: 'Monthly Payment', value: monthlyPayment.toFixed(2), unit: 'currency' },
          { label: 'Total Payment', value: totalPayment.toFixed(2), unit: 'currency' },
          { label: 'Total Interest', value: totalInterest.toFixed(2), unit: 'currency' },
        ],
        tips: [
          'Lower interest rates reduce total cost',
          'Shorter loan terms save on interest',
          'Compare offers from multiple lenders',
        ],
      }
    },
  },

  mortgage: {
    inputs: [
      { name: 'homePrice', type: 'number', label: 'Home Price', unit: 'currency', placeholder: 'e.g., 300000', required: true },
      { name: 'downPayment', type: 'number', label: 'Down Payment', unit: '%', placeholder: 'e.g., 20', required: true, step: 1 },
      { name: 'rate', type: 'number', label: 'Annual Interest Rate', unit: '%', placeholder: 'e.g., 4.5', required: true, step: 0.01 },
      { name: 'years', type: 'number', label: 'Mortgage Duration', unit: 'years', placeholder: 'e.g., 30', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const homePrice = parseFloat(inputs.homePrice)
      const downPaymentPercent = parseFloat(inputs.downPayment)
      const downPayment = homePrice * (downPaymentPercent / 100)
      const principal = homePrice - downPayment
      const rate = parseFloat(inputs.rate)
      const years = parseFloat(inputs.years)
      const months = years * 12
      const monthlyRate = rate / 100 / 12

      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const totalPayment = monthlyPayment * months
      const totalInterest = totalPayment - principal

      return {
        outputs: [
          { label: 'Down Payment', value: downPayment.toFixed(2), unit: 'currency' },
          { label: 'Loan Amount', value: principal.toFixed(2), unit: 'currency' },
          { label: 'Monthly Payment', value: monthlyPayment.toFixed(2), unit: 'currency' },
          { label: 'Total Payment', value: totalPayment.toFixed(2), unit: 'currency' },
          { label: 'Total Interest', value: totalInterest.toFixed(2), unit: 'currency' },
        ],
        tips: [
          'Higher down payment reduces loan amount',
          'Lock in rates when they are favorable',
          'Consider property taxes and insurance',
        ],
      }
    },
  },

  sip: {
    inputs: [
      { name: 'monthly', type: 'number', label: 'Monthly Investment', unit: 'currency', placeholder: 'e.g., 5000', required: true },
      { name: 'rate', type: 'number', label: 'Annual Return Rate', unit: '%', placeholder: 'e.g., 12', required: true, step: 0.1 },
      { name: 'years', type: 'number', label: 'Investment Duration', unit: 'years', placeholder: 'e.g., 20', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const monthlyInvestment = parseFloat(inputs.monthly)
      const annualRate = parseFloat(inputs.rate) / 100
      const monthlyRate = annualRate / 12
      const months = parseFloat(inputs.years) * 12

      const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
      const totalInvested = monthlyInvestment * months
      const gains = futureValue - totalInvested

      return {
        outputs: [
          { label: 'Total Invested', value: totalInvested.toFixed(2), unit: 'currency' },
          { label: 'Future Value', value: futureValue.toFixed(2), unit: 'currency' },
          { label: 'Total Gains', value: gains.toFixed(2), unit: 'currency' },
          { label: 'Gain %', value: ((gains / totalInvested) * 100).toFixed(2), unit: '%' },
        ],
        tips: [
          'SIP helps in disciplined investing',
          'Rupee cost averaging benefits long-term investors',
          'Higher returns require higher risk tolerance',
        ],
      }
    },
  },

  compoundInterest: {
    inputs: [
      { name: 'principal', type: 'number', label: 'Principal Amount', unit: 'currency', placeholder: 'e.g., 10000', required: true },
      { name: 'rate', type: 'number', label: 'Annual Interest Rate', unit: '%', placeholder: 'e.g., 5', required: true, step: 0.01 },
      { name: 'years', type: 'number', label: 'Time Period', unit: 'years', placeholder: 'e.g., 10', required: true },
      { name: 'compounding', type: 'select', label: 'Compounding', options: [
        { value: '1', label: 'Annually' },
        { value: '2', label: 'Semi-annually' },
        { value: '4', label: 'Quarterly' },
        { value: '12', label: 'Monthly' },
        { value: '365', label: 'Daily' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const principal = parseFloat(inputs.principal)
      const rate = parseFloat(inputs.rate) / 100
      const years = parseFloat(inputs.years)
      const n = parseFloat(inputs.compounding)

      const amount = principal * Math.pow(1 + rate / n, n * years)
      const ci = amount - principal

      return {
        outputs: [
          { label: 'Principal', value: principal.toFixed(2), unit: 'currency' },
          { label: 'Compound Interest', value: ci.toFixed(2), unit: 'currency' },
          { label: 'Final Amount', value: amount.toFixed(2), unit: 'currency' },
          { label: 'Effective Return', value: ((ci / principal) * 100).toFixed(2), unit: '%' },
        ],
        tips: [
          'More frequent compounding increases returns',
          'Time is your greatest asset in investing',
          'Start investing early to benefit from compounding',
        ],
      }
    },
  },

  taxCalculator: {
    inputs: [
      { name: 'income', type: 'number', label: 'Annual Income', unit: 'currency', placeholder: 'e.g., 600000', required: true },
      { name: 'country', type: 'select', label: 'Country', options: [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' },
        { value: 'uk', label: 'UK' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const income = parseFloat(inputs.income)
      let tax = 0

      if (inputs.country === 'india') {
        if (income <= 250000) tax = 0
        else if (income <= 500000) tax = (income - 250000) * 0.05
        else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.2
        else tax = 12500 + 100000 + (income - 1000000) * 0.3
      } else if (inputs.country === 'usa') {
        if (income <= 10000) tax = income * 0.1
        else if (income <= 40000) tax = 1000 + (income - 10000) * 0.12
        else tax = 1000 + 3600 + (income - 40000) * 0.22
      }

      const netIncome = income - tax
      const effectiveRate = (tax / income) * 100

      return {
        outputs: [
          { label: 'Gross Income', value: income.toFixed(2), unit: 'currency' },
          { label: 'Tax', value: tax.toFixed(2), unit: 'currency' },
          { label: 'Net Income', value: netIncome.toFixed(2), unit: 'currency' },
          { label: 'Effective Tax Rate', value: effectiveRate.toFixed(2), unit: '%' },
        ],
        tips: [
          'This is an estimate. Consult tax professionals',
          'Consider deductions and exemptions',
          'Plan taxes ahead for better management',
        ],
      }
    },
  },

  freelanceRate: {
    inputs: [
      { name: 'hourlyRate', type: 'number', label: 'Hourly Rate', unit: 'currency', placeholder: 'e.g., 50', required: true },
      { name: 'hoursPerDay', type: 'number', label: 'Hours per Day', placeholder: 'e.g., 8', min: 1, max: 24, required: true },
      { name: 'vacationDays', type: 'number', label: 'Vacation Days per Year', placeholder: 'e.g., 20', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const hourlyRate = parseFloat(inputs.hourlyRate)
      const hoursPerDay = parseFloat(inputs.hoursPerDay)
      const vacationDays = parseFloat(inputs.vacationDays)

      const workingDays = 365 - vacationDays - (2 * 52) // weekends
      const hoursPerYear = workingDays * hoursPerDay
      const annualIncome = hoursPerYear * hourlyRate
      const monthlyIncome = annualIncome / 12

      return {
        outputs: [
          { label: 'Annual Income', value: annualIncome.toFixed(2), unit: 'currency' },
          { label: 'Monthly Income', value: monthlyIncome.toFixed(2), unit: 'currency' },
          { label: 'Hours per Year', value: hoursPerYear.toFixed(0), unit: 'hours' },
        ],
        tips: [
          'Add buffer for unexpected expenses',
          'Set aside money for taxes',
          'Increase rates as you gain experience',
        ],
      }
    },
  },

  profitMargin: {
    inputs: [
      { name: 'sellingPrice', type: 'number', label: 'Selling Price', unit: 'currency', placeholder: 'e.g., 100', required: true },
      { name: 'costPrice', type: 'number', label: 'Cost Price', unit: 'currency', placeholder: 'e.g., 60', required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const sellingPrice = parseFloat(inputs.sellingPrice)
      const costPrice = parseFloat(inputs.costPrice)

      const profit = sellingPrice - costPrice
      const profitMargin = (profit / sellingPrice) * 100
      const markupPercent = (profit / costPrice) * 100

      return {
        outputs: [
          { label: 'Profit', value: profit.toFixed(2), unit: 'currency' },
          { label: 'Profit Margin', value: profitMargin.toFixed(2), unit: '%' },
          { label: 'Markup %', value: markupPercent.toFixed(2), unit: '%' },
          { label: 'ROI', value: markupPercent.toFixed(2), unit: '%' },
        ],
        tips: [
          'Profit margin shows efficiency',
          'Compare with industry standards',
          'Keep costs low to increase profit',
        ],
      }
    },
  },

  currencyConverter: {
    inputs: [
      { name: 'amount', type: 'number', label: 'Amount', placeholder: 'e.g., 100', required: true },
      { name: 'fromCurrency', type: 'select', label: 'From', options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'INR', label: 'INR' },
        { value: 'JPY', label: 'JPY' },
      ], required: true },
      { name: 'toCurrency', type: 'select', label: 'To', options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'INR', label: 'INR' },
        { value: 'JPY', label: 'JPY' },
      ], required: true },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const amount = parseFloat(inputs.amount)
      const rates: Record<string, number> = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        INR: 83.12,
        JPY: 149.50,
      }

      const usd = amount / rates[inputs.fromCurrency]
      const converted = usd * rates[inputs.toCurrency]

      return {
        outputs: [
          { label: `${inputs.fromCurrency}`, value: amount.toFixed(2) },
          { label: `${inputs.toCurrency}`, value: converted.toFixed(2) },
          { label: 'Exchange Rate', value: (rates[inputs.toCurrency] / rates[inputs.fromCurrency]).toFixed(4) },
        ],
        tips: [
          'Rates update frequently',
          'Check for best rates when exchanging',
          'Banks may charge conversion fees',
        ],
      }
    },
  },

  cryptoProfit: {
    inputs: [
      { name: 'investment', type: 'number', label: 'Investment Amount', unit: 'currency', placeholder: 'e.g., 1000', required: true },
      { name: 'buyPrice', type: 'number', label: 'Buy Price', unit: 'currency', placeholder: 'e.g., 50000', required: true },
      { name: 'sellPrice', type: 'number', label: 'Sell Price', unit: 'currency', placeholder: 'e.g., 60000', required: true },
      { name: 'fees', type: 'number', label: 'Total Fees', unit: '%', placeholder: 'e.g., 2', required: true, step: 0.1 },
    ] as ToolInput[],
    calculate: (inputs: Record<string, any>): ToolResult => {
      const investment = parseFloat(inputs.investment)
      const buyPrice = parseFloat(inputs.buyPrice)
      const sellPrice = parseFloat(inputs.sellPrice)
      const feePercent = parseFloat(inputs.fees) / 100

      const coinsOwned = investment / buyPrice
      const sellValue = coinsOwned * sellPrice
      const fees = sellValue * feePercent
      const profit = sellValue - fees - investment
      const roi = (profit / investment) * 100

      return {
        outputs: [
          { label: 'Coins Owned', value: coinsOwned.toFixed(6) },
          { label: 'Sell Value', value: sellValue.toFixed(2), unit: 'currency' },
          { label: 'Fees', value: fees.toFixed(2), unit: 'currency' },
          { label: 'Profit/Loss', value: profit.toFixed(2), unit: 'currency' },
          { label: 'ROI', value: roi.toFixed(2), unit: '%' },
        ],
        tips: [
          'Crypto is highly volatile',
          'Do not invest more than you can afford to lose',
          'Use stop-loss orders to protect profits',
        ],
      }
    },
  },
}
