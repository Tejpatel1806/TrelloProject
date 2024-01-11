import React, { useState } from "react";
import Modal from "react-modal";
import { deleteChildList, updateChildList } from "../store/listSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
Modal.setAppElement("#root");
const Card = ({ cardInfo }) => {
 const dispatch = useDispatch();
 const [selectedCard, setSelectedCard] = useState(null);
 const [textareaValue, setTextareaValue] = useState("");
 const listItem = useSelector((store) => store.listSlice.list);
 const openModal = (cardId) => {
   setSelectedCard(cardId);
 };


 const closeModal = () => {
   setSelectedCard(null);
 };
 function removeChild() {
   console.log("clicked");
   console.log("cardInfo", cardInfo);
   console.log("id", cardInfo);
   dispatch(deleteChildList(cardInfo));
 }
 const updatedData = {
   cardInfo: cardInfo,
   description: textareaValue,
 };
 const handleclick = () => {
   console.log(cardInfo);
   dispatch(updateChildList(updatedData));
 };
 return (
   <>
     <div onClick={() => openModal()}>
       <div className="bg-white p-2 mt-2 shadow-md rounded-md">
         {cardInfo.title}
         <button
           title="Delete Card"
           className="text-red-600 float-right font-bold"
           onClick={removeChild}
         >
           x
         </button>
       </div>
     </div>


     <Modal
       isOpen={selectedCard !== null}
       onRequestClose={closeModal}
       className="modal-content"
       overlayClassName="modal-overlay"
     >
       <div>
         <p className="m-2">title:-{cardInfo.title}</p>
         <div className="m-2 border border-black">
           <p className="my-1">description</p>
           <textarea
             className="border border-black mx-2"
             rows="4"
             cols="50"
             value={textareaValue !== "" ? textareaValue : ""}
             onChange={(e) => setTextareaValue(e.target.value)}
           ></textarea>
           <br></br>
           <button className="m-1 bg-gray-500" onClick={handleclick}>
             Save
           </button>
         </div>
         <div className="my-2">
           <p>created by:- {cardInfo.createdBy}</p>
         </div>
         <div className="my-2">
           <p>created Date:-{cardInfo.createdDate} </p>
         </div>
         <button onClick={closeModal} className="border-2 border-blue-500">
           Close Modal
         </button>
       </div>
     </Modal>
   </>
 );
};


export default Card;
