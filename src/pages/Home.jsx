import React from 'react';
import styledComponents from 'styled-components';
import Cards from '../components/Cards';
import Header from '../components/Header';
import CommerceContext from '../context/CommerceContext';

class Home extends React.Component {
  render() {
    const { showModal, handleModal, categorySelected, products } = this.context;
    return (
      <ExternalWrapper>
        <Header props={this.props} />
        {
          showModal && (<Shadow onClick={ handleModal } />)
        }
        <InternalWrapper>
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
        </InternalWrapper>
      </ExternalWrapper>
    );
  }
}

const ExternalWrapper = styledComponents.section`
  height: 100%;
  position: relative;
`;

const InternalWrapper = styledComponents.section`
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

const Shadow = styledComponents.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
`;


Home.contextType = CommerceContext;
export default Home;
