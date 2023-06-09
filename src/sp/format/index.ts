export const formatMoney = (n: string) => {
  if (n) {
    return (
      Number(n)
        .toFixed()
        .replace(/./g, function (c, i, a) {
          return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        }) + " đ"
    );
  } else {
    return;
  }
};
