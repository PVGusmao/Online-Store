import React from 'react';
import styledComponents from 'styled-components';
import Cards from '../components/Cards';
import Header from '../components/Header';
import CommerceContext from '../context/CommerceContext';

const Wrapper = styledComponents.section`
  display: flex;
  flex-direction: column;
`;

const ContainerTitle = styledComponents.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 400px; 
`;

const CardSection = styledComponents.section`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class Home extends React.Component {
  render() {
    const { categorySelected, products } = this.context;
    return (
      <>
        <Header />
        <Wrapper>
          <ContainerTitle>
            <h1>{ categorySelected.toUpperCase() }</h1>
          </ContainerTitle>
          <CardSection>
            {
              products.length > 0 && products.filter((element) => element.name === categorySelected)[0].products
              .map((item, index) => (
                <Cards
                  key={ index }
                  item={ item }
                />
              ))
            }
          </CardSection>
        </Wrapper>
      </>
    );
  }
}

Home.contextType = CommerceContext;
export default Home;
