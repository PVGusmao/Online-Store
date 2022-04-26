import React from 'react';
import styled from 'styled-components';
import CommerceContext from '../context/CommerceContext';

const Head = styled.header`
  align-items: center;
  border-bottom: 1px solid black;
  display: flex;
  height: 75px;
  width: 100%;
  `;

const Nav = styled.nav`
  align-items: center;
  color: white;
  display: flex;
  height: 40px;
  justify-content: space-evenly;
  margin: 10px;
  width: 200px;
`;

const H4 = styled.h4`
  color: black;
  cursor: pointer;
`;

class Header extends React.Component {
  componentDidMount() {
    const { handleAPI } = this.context;
    handleAPI();
  }

  render() {
    const { data } = this.context;
    return (
      <Head>
        <Nav>
          {
            data.length !== 0 && data.data.categories.map((element, index) => (
              <H4 key={ index }>
                { element.name }
              </H4>
            ))
          }
        </Nav>
      </Head>
    );
  }
}

Header.contextType = CommerceContext;
export default Header;
