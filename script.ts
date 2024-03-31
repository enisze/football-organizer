const calc = () => {
  const MSCIESG = 11711.6
  const EMIMIESG = 3915.11
  const MSCIWORLD = 2403.69
  const EMIMI = 1397.59
  const EURO = 2056.34

  const BC = 5950.33
  const ETH = 920.55

  const SUM = MSCIESG + EMIMIESG + MSCIWORLD + EMIMI + EURO + BC + ETH

  const relative = (value: number) => {
    return (value / SUM) * 100
  }

  const allRelatives = {
    MSCI: relative(MSCIESG) + relative(MSCIWORLD),
    EMIMI: relative(EMIMIESG) + relative(EMIMI),
    EURO: relative(EURO),
    BC: relative(BC),
    ETH: relative(ETH),
  }

  const relativeWithoutBCETH = (value: number) => {
    return (value / (SUM - BC - ETH)) * 100
  }

  const allRelativesWithoutBCETH = {
    MSCI: relativeWithoutBCETH(MSCIESG) + relativeWithoutBCETH(MSCIWORLD),
    EMIMI: relativeWithoutBCETH(EMIMIESG) + relativeWithoutBCETH(EMIMI),
    EURO: relativeWithoutBCETH(EURO),
  }

  console.log(allRelatives)

  console.log(allRelativesWithoutBCETH)
}

calc()
