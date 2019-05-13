import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { Form, FormGroup, Input, Button, Label, FormText } from 'reactstrap';

import Map from './Map';
import CustomModal from './CustomModal';

import { createPost } from '../helpers/fetcher';
import { isRegistered } from '../helpers/guardian';

const defaultLocation = { lat: 49.432, lon: 32.083 };

function CreatePost({ history }) {
  if (!isRegistered()) history.push('/home');

  const [location, setLocation] = useState(defaultLocation);
  const [modalTextProps, setModalTextProps] = useState({});
  const [isResultOpen, setResultOpen] = useState(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  function onResultClosed() {
    history.push('/home');
  }

  function afterSubmit(json) {
    const title = 'Request status';
    const message = `
Your request is awaiting moderation.
WIMP bot will notify you when the process is complete.
ID of the request: ${json.request}`;

    setModalTextProps({ title, message: message.trim() });
    setResultOpen(true);
    setSubmitDisabled(false);
  }

  function onSubmit(event) {
    event.preventDefault();
    setSubmitDisabled(true);
    createPost(new FormData(event.target))
      .then(json => afterSubmit(json))
      .catch(err => console.error(err)); // TODO: show toast
  }

  return (
    <div className='container'>
      <CustomModal isOpen={isResultOpen} onClosed={onResultClosed} {...modalTextProps} />
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Map draggable locationHandler={setLocation} radius={0} location={location} />
          <FormText color='muted'>Location, where you have seen your pet the last time</FormText>
          <Input id='lon' name='lon' type='hidden' value={location.lon} />
          <Input id='lat' name='lat' type='hidden' value={location.lat} />
        </FormGroup>
        <FormGroup>
          <Label for='message'>Description of your pet</Label>
          <Input type='textarea' name='msg' id='message' maxLength='1000' minLength='20' rows='5' required />
          <FormText color='muted'>Any information that can help others to find your pet</FormText>
        </FormGroup>
        <FormGroup>
          <Label for='photo'>Photo of your pet</Label>
          <Input type='file' name='photo' id='photo' accept='image/*' required />
          <FormText color='muted'>The file size limit is 10Mb.</FormText>
        </FormGroup>
        <Button type='submit' disabled={isSubmitDisabled}>
          <span
            className='spinner-border spinner-border-sm mr-2'
            role='status'
            aria-hidden='true'
            hidden={!isSubmitDisabled}
          />
          {isSubmitDisabled ? 'Sending...' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
}

CreatePost.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(CreatePost);
