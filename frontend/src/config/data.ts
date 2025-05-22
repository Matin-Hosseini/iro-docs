const conditions: any = {
  "bank-loan-check-guarantee": [
    {
      id: 1,
      repayment: 12,
      initialIncrement: 5,
      increaseAfterPrePayment: 25,
      checkPeriod: 13,
      minPrePaymentPercent: 0,
      loanInterestPercent: 23,
    },
    {
      id: 2,
      repayment: 18,
      initialIncrement: 5,
      increaseAfterPrePayment: 34,
      checkPeriod: 6,
      minPrePaymentPercent: 0,
      loanInterestPercent: 23,
    },
    {
      id: 3,
      repayment: 24,
      initialIncrement: 5,
      increaseAfterPrePayment: 34,
      checkPeriod: 6,
      minPrePaymentPercent: 0,
      loanInterestPercent: 23,
    },
    {
      id: 4,
      repayment: 36,
      initialIncrement: 5,
      increaseAfterPrePayment: 43,
      checkPeriod: 6,
      minPrePaymentPercent: 0,
      loanInterestPercent: 23,
    },
    {
      id: 5,
      repayment: 60,
      initialIncrement: 5,
      increaseAfterPrePayment: 35,
      checkPeriod: 6,
      minPrePaymentPercent: 60,
      loanInterestPercent: 26,

      desc: "فقط خودرو",
    },
  ],

  "bank-loan-promissory-guarantee": [
    {
      id: 1,
      repayment: 6,
      initialIncrement: 5,
      increaseAfterPrePayment: 30,
      checkPeriod: 7,
      minPrePaymentPercent: 40,
      loanInterestPercent: 23,
    },
    {
      id: 2,
      repayment: 12,
      initialIncrement: 5,
      increaseAfterPrePayment: 60,
      checkPeriod: 13,
      minPrePaymentPercent: 40,
      loanInterestPercent: 23,
    },
    {
      id: 3,
      repayment: 18,
      initialIncrement: 5,
      increaseAfterPrePayment: 90,
      checkPeriod: 6,
      minPrePaymentPercent: 40,
      loanInterestPercent: 23,
    },
  ],

  company: [
    { id: 1, repayment: 4, increasePercent: 5.5, minPrePaymentPercent: 0 },
    { id: 2, repayment: 8, increasePercent: 5.5, minPrePaymentPercent: 0 },
    { id: 3, repayment: 10, increasePercent: 5.5, minPrePaymentPercent: 0 },
  ],
};

export { conditions };
