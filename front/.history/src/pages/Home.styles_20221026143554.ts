import styled from "styled-components";

export const HomeContainer = styled.main`
/*height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;*/

  @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swa');

  :root {
      --accentColor: #35363a;
      --font: 'Ubuntu', sans-serif;
      font-display: swap;
  }

background-color: green;
color: white;
    
  #title {
      color: rgb(255, 255, 255);
      font-size: 2rem;
      font-weight: 200;
      line-height: 1.25;
      margin-bottom: 4rem;
      display: block;
      font-family: var(--font);
      width: auto;
      text-align: center;
      text-decoration: none;
  }

  .footer {
      color: rgba(255, 255, 255, 0.705);
      transition: 0.5s;
      font-size: 1.2rem;
      font-weight: 200;
      line-height: 1.25;
      display: block;
      font-family: var(--font);
      width: 100%;
      text-align: center;
      text-decoration: none;
      margin-top: 50px;
      margin-bottom: 75px;
  }

  .footer:hover {
      color: rgb(255, 255, 255);
      transition: 0.5s;
  }

  #links {
      max-width: 675px;
      width: auto;
      display: block;
      margin: 27px auto;
  }

  .link {
      display: block;
      background-color: #2c2c2c;
      color: #a2a2a2;
      font-family: var(--font);
      /* border-radius: 40px; */
      border-radius: 10px;
      text-align: center;
      margin-bottom: 20px;
      padding: 17px;
      text-decoration: none;
      font-size: 1.5rem;
      transition: all .25s cubic-bezier(.08, .59, .29, .99);
      transition: box-shadow .5s;
  }

  .link:hover {
      background-color: #363636;
      transition: .5s;
      color: #ffffff;
      box-shadow: 0 0 31px rgba(0, 0, 0, 0.247);
      font-weight: 100;
  }

  .hvr-grow {
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-property: transform;
      transition-property: transform;
  }

  .hvr-grow:hover,
  .hvr-grow:focus,
  .hvr-grow:active {
      -webkit-transform: scale(1.02);
      transform: scale(1.02);
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
