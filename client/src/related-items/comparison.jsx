import React, { useContext, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { StyledModal, ModalOverlay } from './styles/list.styled';
import { currentProductDataContext } from './related-items';

function Comparison({ closeModal, currentProduct }) {
  const overviewProductData = useContext(currentProductDataContext);
  const getComparisonData = (currentObjArr, overviewObjArr) => {
    const featureStore = {};
    let index = 0;
    while (index < currentObjArr.length && index < overviewObjArr.length) {
      let currentFeatureObj = currentObjArr[index];
      let overviewFeatureObj = overviewObjArr[index];
      if (currentFeatureObj) {
        if (!featureStore[currentFeatureObj.feature]) {
          featureStore[currentFeatureObj.feature] = [
            currentFeatureObj.value,
            null,
          ];
        } else {
          featureStore[currentFeatureObj.feature][0] = currentFeatureObj.value;
        }
      }
      if (overviewFeatureObj) {
        if (!featureStore[overviewFeatureObj.feature]) {
          featureStore[overviewFeatureObj.feature] = [
            null,
            overviewFeatureObj.value,
          ];
        } else {
          featureStore[overviewFeatureObj.feature][1] =
            overviewFeatureObj.value;
        }
      }
      index++;
    }
    console.log(featureStore);
    const tableData = [];
    if (featureStore) {
      // eslint-disable-next-line no-restricted-syntax
      for (let key in featureStore) {
        tableData.push(
          <tr>
            <td>{featureStore[key][0] || '❌'}</td>
            <td>{key}</td>
            <td>{featureStore[key][1] || '❌'}</td>
          </tr>
        );
      }
    }
    return tableData;
  };
  // useEffect(
  //   () =>
  //     getComparisonData(currentProduct.features, overviewProductData.features),
  //   []
  // );
  const compare = getComparisonData(
    currentProduct.features,
    overviewProductData.features
  );
  //ReactDom.createPortal
  return (
    <>
      <StyledModal>
        <div className="modal">
          <div className="modalHeader">
            <h2 className="title">Comparison</h2>
            <button
              className="close"
              type="button"
              onClick={() => closeModal(false)}
            >
              &times;
            </button>
          </div>
          <div className="modalBody">
            <table>
              <thead>
                <tr>
                  <th>{currentProduct.name}</th>
                  <th>Feature</th>
                  <th>{overviewProductData.name}</th>
                </tr>
              </thead>
              <tbody>{compare}</tbody>
            </table>
          </div>
        </div>
      </StyledModal>
      <ModalOverlay onClick={() => closeModal(false)} className="overlay" />
    </>
    // document.getElementById('portal')
  );
}

export default Comparison;
