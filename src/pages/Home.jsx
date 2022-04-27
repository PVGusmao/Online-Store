import React from 'react';
import styledComponents from 'styled-components';
import Header from '../components/Header';
import CommerceContext from '../context/CommerceContext';

const Wrapper = styledComponents.section`
  display: flex;
`;

const ContainerTitle = styledComponents.div`
  align-items: center;
  display: flex;
  height: auto;
  justify-content: center;
  margin-top: 40px;
  width: 400px; 
`;

class Home extends React.Component {
  render() {
    const { categorySelected } = this.context;
    return (
      <>
        <Header />
        <Wrapper>
          <ContainerTitle>
            <h1>{ categorySelected.toUpperCase() }</h1>
          </ContainerTitle>
        </Wrapper>
      </>
    );
  }
}

Home.contextType = CommerceContext;
export default Home;
