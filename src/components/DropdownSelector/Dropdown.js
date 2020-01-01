import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import BlacklistDisplay from '../UserDash/BlacklistDisplay'
import DropStyle from '../DropdownSelector/Dropdown.css'


export default class DropdownSelector extends React.Component{

  state ={
    selectedOption: ''
  }


render(){
  const friendOptions = [
    {
      key: 'School/college/university',
      text: 'School/college/university',
      value: 'School/college/university',
    },
    {
      key: 'Restaurant/Cafe/Canteen',
      text: 'Restaurant/Cafe/Canteen',
      value: 'Restaurant/Cafe/Canteen',
    },
    {
      key: 'Caring Premises',
      text: 'Caring Premises',
      value: 'Caring Premises',
    },
    {
      key: 'Pub/bar/nightclub',
      text: 'Pub/bar/nightclub',
      value: 'Pub/bar/nightclub',
    },
  ]
  return(
    <Dropdown
    placeholder='Select Type of Establishment'
    fluid
    selection
    options={friendOptions}
  />
  )
}
  

}

