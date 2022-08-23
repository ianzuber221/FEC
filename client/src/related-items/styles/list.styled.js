import styled from 'styled-components';

export const StyledList = styled.div`

#relatedList, #outfitList {
  display: flex;
  flex-direction:row;
  width: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
  border-radius: 8px;
  /* box-shadow: 0px 0px 4px; */
  gap: 2rem;
  /* margin-left: 2em; */
  ::-webkit-scrollbar {
  display: none;
  }

}

.list-container {
  width: 100%
}


display: flex;
flex-direction: row;
flex-wrap: nowrap;
align-items: flex-start;
position: relative;

  .slider {
    /* position: relative; */
    font-size:1.5rem;
    transform: translateY(400%);
    cursor: pointer;
    /* padding-left: .5em;
    padding-right: .5em; */
    border: none;
    background: none;

  }

  .leftSlider {
    margin-right: 1.5%;
  }

  .rightSlider {
    margin-left: 1.5%;
  }
`;

export const StyledCard = styled.div`
  flex: 0 0 25%;
  min-width: 250px;
  max-width: 250px;
  min-height:400px;
  margin: 2px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  overflow: hidden;
  .cardBody {
    padding: 0.5rem;
    padding-top: 0;
  }
  .cardHeader {
    position: relative;
  }
  .cardImage {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 13;
    object-fit: cover;
    object-position: center;
    max-height: 200%;
    padding: 0;
    transition: all 400ms;
  }
  .cardImage:hover {
    transform: scale(1.05);
    cursor: pointer;
    opacity: 70%;
    transition: .6s;
  }
  .relatedAction {
    position: absolute;
    padding: 0.25rem;
    z-index: 3;
    right: 0;
    top: 0;
    color: gold;
  }
  .relatedOutfit {
    position: absolute;
    padding: 0.25rem;
    z-index: 3;
    right: 0;
    top: 0;
    color: black;
  }
  .relatedAction:hover {
    color: yellow;
    cursor: pointer;
  }
  .relatedOutfit:hover {
    color: rgb(70,70,70);
    cursor: pointer;
  }
  .btn {
    position: absolute;
    z-index: 1.5;
    background: none;
    border: none;
    font-size: 1.5rem;
    top: 50%;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    //transform: translateY(-50%)
  }
  .btn:hover,
  .btn:focus {
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .btn:focus {
    outline: 1px solid black;
  }

  .btnRight {
    right: 0.25rem;
  }
  .btnLeft {
    left: 0.25rem;
  }
  #addOutfitContainer {
    position:relative;
    align-items: center;
    text-align:center;
    transform: translateY(450%);
    cursor:pointer;
  }
  //  Add once transform problem is resolved
  #addOutfitContainer:hover,
  #addOutfitContainer:focus {

  }
`;

export const StyledModal = styled.div`
position: relative;
top: 0;
left: 0;
width:100%;
height:100%;
//transform: translate(50%, -800%);
border: 1px solid black;
border-radius: 1rem;
z-index: 100;
background-color: white;
.modalHeader {
  padding:10 15px;
  display: flex;
  justify-content:space-between;
  border-bottom: 1px solid black;
  align-items:center;
  padding: 5px 15px;
}
.close {
font-size: 1em;
cursor: pointer;
font-weight: bold;
border:none;
background: none;
outline:none
}
.modalBody {
  padding: 10px 15px;
}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  opacity: 0;
  top: 0;
  right: 0;
  bottom:0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0.25);
`;

export const RelatedItemsStyleContainer = styled.div`
  /* height: 70%; */
  width: 70%;
  border-top: .5px solid black;
`;
