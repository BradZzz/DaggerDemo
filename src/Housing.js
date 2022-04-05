import React, { useState } from "react";
import { Grid } from '@mui/material';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const BASE_CRYPTO_VOLUME = 1000000
const KEEP_RATE = .10
const MONTHLY_RENT_RATE = .0055

function Housing(props) {
  const [properties, ] = useState(props.properties);
  const [selectedHousing, setSelectedHousing] = useState({});
  console.log("selectedHousing: ", selectedHousing)

  const formatAddress=(addressInfo)=>{
    return `${addressInfo.formattedStreetLine}, ${addressInfo.city} ${addressInfo.state} ${addressInfo.zip}`
  }

  const formatCost=(value)=>{
    return `$${Number(value).toLocaleString()}`
  }

  const updateHousingLedger=(checked, address, price)=>{
     if (checked) {
        setSelectedHousing({ ...selectedHousing, ...{ [address]:price }})
     } else {
        let newSelectedHousing = JSON.parse(JSON.stringify(selectedHousing))
        delete newSelectedHousing[address]
        setSelectedHousing(newSelectedHousing)
        console.log("newSelectedHousing: ", newSelectedHousing)
     }
  }

  const propertyList = properties
  .map(property => (
    <Item key={formatAddress(property.homeData.addressInfo)} style={{margin:'0 0 1em 0'}}>
        <Checkbox onChange={(event)=>{updateHousingLedger(event.target.checked,formatAddress(property.homeData.addressInfo),property.homeData.priceInfo.amount.value)}} />
        <div>{formatAddress(property.homeData.addressInfo)}</div>
        <div>{formatCost(property.homeData.priceInfo.amount.value)}</div>
    </Item>
  ));

  const totalSelectedPropertyValue = Object.keys(selectedHousing).reduce((total, key)=> total + parseInt(selectedHousing[key]),0)
  const totalSelectedRentalPropertyValue = parseFloat(totalSelectedPropertyValue) * MONTHLY_RENT_RATE
  const totalCoins = parseFloat(BASE_CRYPTO_VOLUME)
  const coinValue = (parseFloat(totalSelectedPropertyValue) * (1.0 - keepRate)) / totalCoins
  const stakingIncomePerCoin = (parseFloat(totalSelectedRentalPropertyValue) * (1.0 - keepRate)) / totalCoins
  const keepRate = parseFloat(KEEP_RATE)

  const examplePropertyValue = 300000

  const INTRO_DESCRIPTION = `This is a calculator for an Initial Coin Offering (ICO) for a fictitious rental company.
    These calculations are assuming that the company wishes to keep ${keepRate}% of the rental income and property equity
    in order to cover maintenance and real estate broker fees. The rental income is calculated by multiplying the total
    property value by ${MONTHLY_RENT_RATE}. This would assume that a property of value ${formatCost(examplePropertyValue)} would rent
    for ${formatCost(examplePropertyValue * MONTHLY_RENT_RATE)}.`
  const BUY_PROPERTY_DESCRIPTION = `When a property is added to our fictitious rental company, the following actions will happen.
    (1) First, the total value of the current property holdings will be evaluated. (2) The total value of holdings will be divided
    by the total number of coins in existence. (3) New coins will be added to the total number of coins being offered by the company.
    The amount of new coins is the value of the new property acquired divided by the current value of the coins calculated in
    step 2.`
  const SELL_PROPERTY_DESCRIPTION = `When a property is sold, {1.0-keepRate}% of the value of the property will be added to the
    company vault to provide liquidity to the company's coins. Interest off of the usdc in this vault will be added to the total
    income received by staking users.`

  return (
    <div>
      <Paper>
        <h3>ICO</h3>
        {INTRO_DESCRIPTION}
      </Paper>
      <Paper>
        <h3>Buying Property</h3>
        {BUY_PROPERTY_DESCRIPTION}
      </Paper>
      <Paper>
        <h3>Selling Property</h3>
        {SELL_PROPERTY_DESCRIPTION}
      </Paper>
      <Paper>
          <p>Selected Total Coins: {BASE_CRYPTO_VOLUME}</p>
          <p>Selected Keep Rate: {keepRate* 100}%</p>
          <p>Selected Property Value: {formatCost(totalSelectedPropertyValue)}</p>
          <p>Selected Rental Income: {formatCost(totalSelectedRentalPropertyValue)}</p>
          <p>Selected Coin Value: {formatCost(coinValue)}</p>
          <p>Selected Staking Income Per Coin: {formatCost(stakingIncomePerCoin)}</p>
      </Paper>
      <h3>Properties</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ height:'50em', overflowY:'auto'}}>
          {propertyList}
        </Grid>
      </Grid>
    </div>
  );
}

export default Housing;
