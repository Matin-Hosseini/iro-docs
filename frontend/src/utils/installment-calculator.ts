import { conditions } from "@/config/data";
import {
  calculateGuaranteePrice,
  loanCalculation,
} from "./funcs/loan/calculator";
import { addDays, getDate } from "./funcs/date/date";

const calculate = (
  conditionName: string,
  repaymentInfo: any,
  { price, prePayment }: { price: number; prePayment: number }
): any => {
  const targetCondition = conditions[conditionName];

  if (!targetCondition) {
    return;
  }

  switch (conditionName) {
    case "bank-loan-check-guarantee": {
      const priceAfterIncrease =
        price + (price * repaymentInfo.initialIncrement) / 100;

      const priceAfterPrePayment = priceAfterIncrease - prePayment;

      const minPrePayment =
        (priceAfterIncrease * repaymentInfo.minPrePaymentPercent) / 100;

      if (prePayment < minPrePayment) {
        return { success: false, minPrePayment };
      }

      const loanPrice =
        priceAfterPrePayment +
        (priceAfterPrePayment * repaymentInfo.increaseAfterPrePayment) / 100;

      const { monthlyPayment, totalPayment } = loanCalculation(
        loanPrice,
        repaymentInfo.loanInterestPercent,
        repaymentInfo.repayment
      );

      const guaranteePrice = calculateGuaranteePrice(totalPayment, "check");
      const guaranteeCheckDate = getDate(addDays(Date.now(), 180));

      const companyCheckDate = getDate(
        addDays(Date.now(), repaymentInfo.checkPeriod * 30)
      );

      const data = {
        success: true,
        minPrePayment,
        ...repaymentInfo,
        loanPrice,
        monthlyPayment,
        guaranteePrice,
        guaranteeCheckDate,
        companyCheckDate,
      };

      return data;
    }
    case "bank-loan-promissory-guarantee": {
      const priceAfterIncrease =
        price + (price * repaymentInfo.initialIncrement) / 100;

      const priceAfterPrePayment = priceAfterIncrease - prePayment;

      const minPrePayment =
        (priceAfterIncrease * repaymentInfo.minPrePaymentPercent) / 100;

      if (prePayment < minPrePayment) {
        return { success: false, minPrePayment };
      }

      const loanPrice =
        priceAfterPrePayment +
        (priceAfterPrePayment * repaymentInfo.increaseAfterPrePayment) / 100;

      const { monthlyPayment, totalPayment } = loanCalculation(
        loanPrice,
        repaymentInfo.loanInterestPercent,
        repaymentInfo.repayment
      );

      const guaranteePrice = calculateGuaranteePrice(
        totalPayment,
        "promissory"
      );

      const companyCheckDate = getDate(
        addDays(Date.now(), repaymentInfo.checkPeriod * 30)
      );

      const data = {
        success: true,
        loanPrice,
        ...repaymentInfo,
        minPrePayment,
        monthlyPayment,
        guaranteePrice,
        companyCheckDate,
      };

      return data;
    }
    case "company": {
      const increasePercent =
        repaymentInfo.repayment * repaymentInfo.increasePercent;

      const priceAfterIncrease = price + (price * increasePercent) / 100;

      const minPrePayment =
        (priceAfterIncrease * repaymentInfo.minPrePaymentPercent) / 100;

      if (prePayment < minPrePayment) {
        return { success: false, minPrePayment };
      }

      const priceAfterPrepayment = priceAfterIncrease - prePayment;

      const paymentMonthPeriod = 2;

      const installMentPrice =
        (priceAfterPrepayment / repaymentInfo.repayment) * paymentMonthPeriod;

      const calculateInstallMentChecks = (
        repayment: number,
        paymentMonthPeriod: number
      ) => {
        let checks = [];

        for (let i = 0; i < repayment / paymentMonthPeriod; i++) {
          if (i === 0) {
            checks.push({
              id: 1,
              date: getDate(addDays(Date.now(), 45)),
              price: installMentPrice,
            });
          } else {
            checks.push({
              id: i + 1,
              date: getDate(addDays(Date.now(), i * 60 + 45)),
              price: installMentPrice,
            });
          }
        }

        return checks;
      };

      const installmentChecks = calculateInstallMentChecks(
        repaymentInfo.repayment,
        paymentMonthPeriod
      );

      const guaranteeCheckPrice =
        priceAfterPrepayment + priceAfterPrepayment * 0.5;

      const guaranteeCheckDate = getDate(
        addDays(Date.now(), (repaymentInfo.repayment / 2) * 30)
      );

      const data = {
        success: true,
        minPrePayment,
        ...repaymentInfo,
        installmentChecks,
        guaranteeCheckPrice,
        guaranteeCheckDate,
      };

      return data;
    }
  }
};

export default calculate;
