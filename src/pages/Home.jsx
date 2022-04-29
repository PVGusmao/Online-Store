import React from 'react';
import styledComponents from 'styled-components';
import Cards from '../components/Cards';
import Header from '../components/Header';
import Modal from '../components/Modal';
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

const Shadow = styledComponents.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

class Home extends React.Component {
  render() {
    const { showModal, handleModal, categorySelected, products } = this.context;
    return (
      <>
        <Header />
        {
          showModal && <Shadow onClick={ handleModal }></Shadow>
        }
        {
          showModal && <Modal showModal={ showModal } />
        }
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
