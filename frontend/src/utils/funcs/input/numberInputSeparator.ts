export default function numberinputSeparator(e: any) {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");

  const splittedValue = e.target.value.split(",");

  const numberedValue = Number(splittedValue.join(""));

  e.target.value = numberedValue.toLocaleString();

  if (e.target.value === "0") e.target.value = "";
}
