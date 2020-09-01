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
            Welcome to _Hygenik, <br /> {username}!
         </span>{" "}
         <br />
         <br />
         <span className='highlight-this'>
            I hope you find this app useful for exploring the FSA-assessed
            hygiene ratings of UK establishments - particularly considering the
            coronavirus. <br />
            <br />
            Since March, the FSA have experienced a surge in the number of
            requests made to their resources. At peak usage, requests are being
            dynamically throttled. <br />
            <br />
            Unfortunately this may mean waiting longer than usual to load, or
            the service may be made temporarily unavailable entirely. Please
            refresh / hard refresh the page after a couple of minutes if that is
            the case - hopefully the throttling will have been relaxed! More
            information can be found{" "}
            <a
               target='_blank'
               rel='noopener noreferrer'
               href='https://api.ratings.food.gov.uk/Help/Status'
               className='fsa-link'>
               here.
            </a>
            <br />
            <br />
            &nbsp;This app remains in development. Please report any bugs you
            encounter to <a href='https://chriskennedy.live'>
               Chris Kennedy.
            </a>{" "}
            Suggestions are also welcome! Thanks!
            <br />
            <br />
         </span>
      </div>
   );
};

export default WelcomeMSg;
