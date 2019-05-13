import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Map from './Map';

import { signup as fetcherSignup } from '../helpers/fetcher';

const defaultLocation = { lat: 49.432, lon: 32.083 };

function ModalSignup({ isOpen, handleOpen }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const [location, setLocation] = useState(defaultLocation);
  const [isSending, setSending] = useState(false);

  useEffect(() => {
    if (isOpen !== isModalOpen) setModalOpen(isOpen);
  }, [isModalOpen, isOpen]);

  function toggle() {
    setModalOpen(!isModalOpen);
    handleOpen(!isModalOpen);
  }

  function afterSignup() {
    setSending(false);
    if (isModalOpen) toggle();
  }

  function signup() {
    setSending(true);
    fetcherSignup(location)
      .then(() => afterSignup())
      .catch(reject => console.error(reject)); // TODO: show toast
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Select your location</ModalHeader>
        <ModalBody>
          <Map draggable locationHandler={setLocation} radius={0} location={location} />
          <p className='text-secondary'>You can drag and drop blue marker to set a location</p>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={signup} disabled={!isSending}>
            <span
              className='spinner-border spinner-border-sm mr-2'
              role='status'
              aria-hidden='true'
              hidden={isSending}
            />
            {isSending ? 'Sending...' : 'Sign up'}
          </Button>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalSignup;