import React, { useState } from "react";
import Modal from "react-modal";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector } from "react-redux";
import { deleteList } from "../store/listSlice";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root"); // Set the root element for accessibility

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);
  const [selectedCard, setSelectedCard] = useState(null);

  const dispatch = useDispatch();
  const deleteListFn = (id) => {
    console.log("id", id);
    dispatch(deleteList({ id }));
  };

  const openModal = (cardId) => {
    setSelectedCard(cardId);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      {listItem.map((list) => (
        <div className="p-3 w-full md:w-1/3" key={list.id}>
          <div className={`p-3 bg-gray-100`}>
            <div className="mb-4">
              {list.title}
              <button
                title="Delete List"
                onClick={() => deleteListFn(list.id)}
                className="text-red-600 float-right font-bold"
              >
                x
              </button>
            </div>
            {list?.children?.length > 0 &&
              list.children.map((children) => (
                <div key={children.id} onClick={() => openModal(children.id)}>
                  <Card cardInfo={children} />
                </div>
              ))}
            <div className="mt-3">
              <AddNew type="card" parentId={list.id} />
            </div>
          </div>
        </div>
      ))}

      <div className="p-3 w-full md:w-1/3">
        <div className={`p-3 bg-gray-100 `}>
          <AddNew />
        </div>
      </div>

      <Modal
        isOpen={selectedCard !== null}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div>
          <p>This is a modal for the selected card!</p>
          <button onClick={closeModal} className="border-2 border-blue-500">
            Close Modal
          </button>
        </div>
      </Modal>
    </>
  );
};

export default List;
