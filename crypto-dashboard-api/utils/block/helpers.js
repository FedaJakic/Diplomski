async function CalculateFee(txId) {
  var help = await client.getRawTransaction(txId);
  var decoded = await client.decodeRawTransaction(help);
  var vinVouts = [];

  for (let i = 0; i < decoded.vin.length; i++) {
    if (decoded.vin[i].coinbase != null) {
      continue;
    }
    vinVouts.push(decoded.vin[i].vout);
  }

  var vouts = 0;
  if (decoded.vin.length <= 0) {
    var temp = await client.getRawTransaction(decoded.vin[0].txid);
    var decoded2 = await client.decodeRawTransaction(temp);

    for (let i = 0; i < vinVouts.length; i++) {
      vouts += decoded2.vout[vinVouts[i]].value;
    }
  }

  var voutPocetna = 0;
  for (let i = 0; i < decoded.vout.length; i++) {
    voutPocetna += decoded.vout[i].value;
  }

  if (vouts === 0) {
    return voutPocetna;
  } else {
    const fee = vouts - voutPocetna;
    return fee;
  }
}
