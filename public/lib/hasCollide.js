const isInRange = (minLimit, maxLimit, num) => {
  return num >= minLimit && num <= maxLimit;
};

const hasCollide = (comp1, comp2, state) => {
  const {x: comp1X, y: comp1Y, width: comp1W, height: comp1H} = comp1.details();
  const {x, y, width} = comp2.details();
  const xMinLimit = comp1X;
  const xMaxLimit = comp1X + comp1W;
  const yMaxLimit = comp1Y + comp1H;
  const isXinRange =
    isInRange(xMinLimit, xMaxLimit, x) || isInRange(xMinLimit, xMaxLimit, x + width);
  if (state === 'up') {
    const isYinRange = y <= yMaxLimit;
    return isXinRange && isYinRange;
  }
  const isYinRange = y >= comp1Y;
  return isXinRange && isYinRange;
};
