import React from 'react';
import styled from 'styled-components';

function BotBar() {
  return (
    <TitleDiv>
      <LeftDiv>
        <Icons>
          <Link href="https://github.com/rfe-nixos/FEC" target="_blank" rel="noopener noreferrer">
            <Icon src="public/icons/fb.png" alt="fb" />
          </Link>
          <Link href="https://instagram.com/joehvn" target="_blank" rel="noopener noreferrer">
            <Icon src="public/icons/ig.png" alt="ig" />
          </Link>
          <Link href="https://github.com/rfe-nixos/FEC" target="_blank" rel="noopener noreferrer">
            <Icon src="public/icons/pinterest.png" alt="pi" />
          </Link>
          <Link href="https://github.com/rfe-nixos/FEC" target="_blank" rel="noopener noreferrer">
            <Icon src="public/icons/twitter.png" alt="tw" />
          </Link>
        </Icons>
      </LeftDiv>
      <RightDiv>
        <TitleInner
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >
          © 2022 NIX ATELIER
        </TitleInner>
      </RightDiv>
    </TitleDiv>
  );
}

const Link = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:link { text-decoration: none; }
  &:visited { text-decoration: none; }
  &:hover { cursor: pointer; opacity: 60%;}
  &:active { text-decoration: none; }
  margin: 3%;
`;

const Icon = styled.img`
  size: auto;
  width: 20px;
  &:hover{
    cursor: pointer;
    opacity: 60%;
  }
  margin: 3%;
`
const Icons = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const LeftDiv = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

`;
const RightDiv = styled.div`
  min-width:300px;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

`;

const TitleInner = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  letter-spacing: 5px;
  margin-right: 0%;
  &:hover{
    cursor: pointer;
    opacity: 60%;
  }

`;

const TitleDiv = styled.div`
  width: 70%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-height: 5%;
  font-weight: 200;
  padding: 2%;
  font-size: 30px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  margin-bottom: 2%;
`;

export default BotBar;
