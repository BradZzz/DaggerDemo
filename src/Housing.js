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
  const keepRate = parseFloat(KEEP_RATE)
  const coinValue = (parseFloat(totalSelectedPropertyValue) * (1.0 - keepRate)) / totalCoins
  const stakingIncomePerCoin = (parseFloat(totalSelectedRentalPropertyValue) * (1.0 - keepRate)) / totalCoins

  return (
    <div>
      <h1>Housing page!</h1>
      <Item>Selected Total Coins: {BASE_CRYPTO_VOLUME}</Item>
      <Item>Selected Keep Rate: {keepRate* 100}%</Item>
      <Item>Selected Property Value: {formatCost(totalSelectedPropertyValue)}</Item>
      <Item>Selected Rental Income: {formatCost(totalSelectedRentalPropertyValue)}</Item>
      <Item>Selected Coin Value: {formatCost(coinValue)}</Item>
      <Item>Selected Staking Income Per Coin: {formatCost(stakingIncomePerCoin)}</Item>
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
