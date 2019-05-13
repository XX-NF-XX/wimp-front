import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function CustomModal({ isOpen, onClosed, title, message }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  function toggle() {
    setModalOpen(!isModalOpen);
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggle} onClosed={onClosed}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClosed: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

CustomModal.defaultProps = {
  title: 'Info',
  message: '',
};

export default CustomModal;
