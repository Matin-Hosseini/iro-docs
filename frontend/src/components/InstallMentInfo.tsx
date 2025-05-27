import Box from "@mui/material/Box";
import { deepOrange, green } from "@mui/material/colors";

const InfoWrarpper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        border: "1px solid ",
        borderRadius: 2,
        overflow: "hidden",
        borderColor: green[400],
        "&:not(:last-child)": { mb: 1 },
      }}
      component={"div"}
    >
      {children}
    </Box>
  );
};

const InfoHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        background: green[400],
        color: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
      }}
      component={"div"}
    >
      {children}
    </Box>
  );
};

const InfoContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{ padding: "1rem ", color: "gray" }}
      component={"div"}
      className="custom-info-box__content"
    >
      {children}
    </Box>
  );
};

export default function InstallMentInfo({ info }: { info: any }) {
  return (
    <>
      {(info?.condition === "bank-loan-check-guarantee" ||
        info?.condition === "bank-loan-promissory-guarantee") && (
        <>
          <InfoWrarpper>
            <InfoHeader>مبلغ هر قسط</InfoHeader>
            <InfoContent>
              <div className="flex items-center justify-around flex-wrap gap-2 text-sm md:text-lg ">
                <p>{info.repayment} قسط مساوی به مبلغ</p>
                <p>{info.monthlyPayment.toLocaleString()} تومان</p>
              </div>
            </InfoContent>
          </InfoWrarpper>
          <InfoWrarpper>
            <InfoHeader>تاریخ و مبلغ چک {info.checkPeriod} ماهه</InfoHeader>
            <InfoContent>
              <div className="flex items-center justify-around flex-wrap gap-2 text-sm md:text-lg ">
                <p>
                  یک فقره چک صیادی به تاریخ {info.companyCheckDate.day}/
                  {info.companyCheckDate.month}/ {info.companyCheckDate.year}
                </p>
                <p>
                  به مبلغ یک قسط معادل {info.monthlyPayment.toLocaleString()}{" "}
                  تومان
                </p>
              </div>
            </InfoContent>
          </InfoWrarpper>
          <InfoWrarpper>
            <InfoHeader>ضمانت</InfoHeader>
            <InfoContent>
              {info.condition === "bank-loan-check-guarantee" && (
                <div className="flex items-center justify-around flex-wrap gap-2 text-sm md:text-lg">
                  <p>
                    چک صیادی به تاریخ {info.guaranteeCheckDate.day}/
                    {info.guaranteeCheckDate.month}/
                    {info.guaranteeCheckDate.year}
                  </p>
                  <p>
                    به مبلغ یک قسط معادل {info.guaranteePrice.toLocaleString()}{" "}
                    تومان
                  </p>
                </div>
              )}

              {info.condition === "bank-loan-promissory-guarantee" && (
                <div className="flex items-center justify-around flex-wrap gap-2 text-sm md:text-lg">
                  سفته به مبلغ {info.guaranteePrice.toLocaleString()} تومان
                </div>
              )}
            </InfoContent>
          </InfoWrarpper>
        </>
      )}

      {info?.condition === "company" && (
        <>
          <InfoWrarpper>
            <InfoHeader>نحوه پرداخت اقساط</InfoHeader>
            <InfoContent>
              <p className="text-center">
                {info.installmentChecks.length} فقره چک صیادی
              </p>
              {info.installmentChecks.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-around flex-wrap gap-2 text-sm md:text-lg "
                >
                  <p>
                    تاریخ: {item.date.year}/{item.date.month}/{item.date.day}
                  </p>
                  <p>به مبلغ {Math.ceil(item.price).toLocaleString()} تومان</p>
                </div>
              ))}
            </InfoContent>
          </InfoWrarpper>

          <InfoWrarpper>
            <InfoHeader>ضمانت</InfoHeader>
            <InfoContent>
              <div className="flex items-center justify-around flex-wrap gap-2 text-sm md:text-lg">
                <p>
                  چک صیادی به تاریخ {info.guaranteeCheckDate.day}/{" "}
                  {info.guaranteeCheckDate.month}/{" "}
                  {info.guaranteeCheckDate.year}
                </p>
                <p>
                  به مبلغ یک قسط معادل{" "}
                  {Math.ceil(info.guaranteeCheckPrice).toLocaleString()} تومان
                </p>
              </div>
            </InfoContent>
          </InfoWrarpper>
        </>
      )}
    </>
  );
}
