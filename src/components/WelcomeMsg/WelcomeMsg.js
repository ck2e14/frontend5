import React from "react";
import "./WelcomeMsg-style.css";

const WelcomeMSg = (props) => {
   const { username, shaderClick } = props;
   return (
      <div className='explanation-and-welcome'>
         <div className='escape-key' onClick={() => shaderClick()}>
            X
         </div>
         <span>
            {" "}
            Welcome to Hygenik, <br /> {username}!
         </span>{" "}
         <br />
         <br />
         <span className='highlight-this'>
            I hope you find this app useful for exploring the FSA-assessed
            hygiene ratings of UK establishments. <br />
            NOTE: Please make sure you are using HTTPS. The url should read:{" "}
            <a
               href='https://hygenik.herokuapp.com'
               rel='noopener noreferrer'
               className=''>
               https://hygenik.herokuapp.com
            </a>
            .
            <br />
            <br />
            Since March, the FSA have been throttling API request rates. Please
            refresh/hard refresh the page after a couple of minutes if that is
            the case - hopefully the throttling will have been relaxed! More
            information can be found{" "}
            <a
               target='_blank'
               rel='noopener noreferrer'
               href='https://api.ratings.food.gov.uk/Help/Status'
               className='fsa-link'>
               here
            </a>
            .
            <br />
            <br />
            This app remains in development. Please report any bugs you
            encounter to{" "}
            <a
               target='_blank'
               rel='noopener noreferrer'
               href='https://chriskennedy.live'>
               Chris Kennedy
            </a>
            . Suggestions are also welcome! Thanks!
            <br />
         </span>
      </div>
   );
};

export default WelcomeMSg;
