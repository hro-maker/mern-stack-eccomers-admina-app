import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import '../input.scss'
/**
 * @author
 * @function Modall
 **/

const Modall = (props) => {
  return (
    <div >
      <Modal className="modal_body" size={props.size} show={props.show} onHide={props.handleClosee}>
        <Modal.Header className="modal_header" closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>                  
        <Modal.Body className="modal_back">{props.children}</Modal.Body>
        <Modal.Footer className="modal_footer">
          {
            props.buttons ? props.buttons.map((btn,index) =>
              <Button key={index} variant={btn.color} onClick={btn.onClick}>
                  {btn.label}
            </Button>
              ): !props.btncl ?
              <Button className="modal_btn" variant="primary" onClick={props.handleClose}>
              Save Changes
               </Button> :null
          }
         
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modall;
