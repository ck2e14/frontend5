import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import hygenikLogo from '../../Assets/hygenik logo.png'
import helpIcon from '../../Assets/helpIcon.png'

export default class MenuExampleBasic extends Component {
   state = {
      activeItem: '',
      helpMsg: false
   }

   handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
   }

   helpClick = () => this.setState({ helpMsg: !this.state.helpMsg })

   render() {
      const { activeItem } = this.state

      return (
         <Menu>
            <Link to='/find-premises'>
               <Menu.Item
                  name='Premises Lookup'
                  // active={activeItem === 'Premises Lookup'}
                  onClick={this.handleItemClick}
                  displayWelcome={false}
               >
                  Find Sites
               </Menu.Item>
            </Link>

            <Link to='/blacklist'>
               <Menu.Item
                  name='My Blacklisted Sites'
                  background-color="black"
                  // active={activeItem === 'My Blacklisted Sites'}
                  onClick={this.handleItemClick}
               >
                  My Blacklist
               </Menu.Item>
            </Link>

            <Link to='/'>
               <Menu.Item
                  name='Log Out'
                  active={activeItem === 'Log Out'}
                  onClick={this.props.logout}
               >
                  Log Out
               </Menu.Item>
            </Link>

            { this.state.helpMsg ? <div className="shader-layer" onClick={this.helpClick}></div> : null }

            { this.state.helpMsg ? 
               <div className="explanation-and-welcome via-help-icon">
                  <div className="escape-key" onClick={this.helpClick}>X</div>
                  <span> Welcome to  &nbsp;  _Hygenik!</span> <br/><br/>

                  <span className='highlight-this'>I hope you find this app useful for exploring the FSA-assessed hygiene ratings of places to eat near you - particularly considering the current situation. <br/><br/>

                  On that note - since March, the FSA have experienced a big surge in the number of requests made to their resources. At peak usage requests are being dynamically throttled. <br/><br/>Unfortunately this may mean waiting longer than usual to load, or the service may be made temporarily unavailable entirely. Please refresh / hard refresh the page after a couple of minutes if that is the case - hopefully the throttling will have been relaxed!
                  <br/><br/>
                  This app remains in development. Please report any bugs you encounter to <a href="mailto:chriswkennedy@icloud.com">Chris Kennedy.</a> Suggestions are also welcome! Thanks!<br/><br/>
                  More information can be found <a  target="_blank" rel="noopener noreferrer"href="https://api.ratings.food.gov.uk/Help/Status" className="fsa-link">here.</a></span> 
                  <br/><br/>
                  Please note: NO personal data is stored by Hygenik. Using location services improves the utility and flow of the app, but if you would prefer to search manually feel free to revoke location services in your browser. 
                  {/* Please also note that Heroku unloads apps from its servers when they haven't been very recently accessed - you may have experienced longer loading times of the website itself because of this upon initial visit.  */}
               </div>  
            : null }

{ this.props.user ?
           <div className="logged-in-as"> Logged in as <span>{this.props.user.username}</span></div>
           : null }


               <img src={helpIcon} onClick={this.helpClick} alt="About Hygenik" className="help-icon"/>
               
               <img src={hygenikLogo} alt="HygenikLogo" className="logo"/>
         </Menu>
      )
   }
}