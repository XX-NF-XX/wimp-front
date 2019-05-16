import React, { useState, useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { Form, FormGroup, Input, Button, Label, FormText } from 'reactstrap';

import Map from './Map';
import CustomModal from './CustomModal';

import { createPost } from '../helpers/fetcher';
import { isRegistered } from '../helpers/guardian';
import { getLocation, getDefaultLocation } from '../helpers/location';

import routes from '../constants/routes';
import translation from '../constants/translation';

function CreatePost({ history }) {
  if (!isRegistered()) history.push(routes.home);

  const [location, setLocation] = useState(getDefaultLocation());
  const [modalTextProps, setModalTextProps] = useState({});
  const [isResultOpen, setResultOpen] = useState(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    getLocation(position => setLocation(position));
  }, []);

  function onResultClosed() {
    history.push(routes.home);
  }

  function afterSubmit(json) {
    const title = translation.post.submittedTitle;
    const message = `${translation.post.submittedDescription} ${json.request}`;

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
        <p className='h4 text-center py-2'>{translation.post.title}</p>
        <FormGroup>
          <Map draggable locationHandler={setLocation} radius={0} location={location} />
          <FormText color='muted'>{translation.post.mapHint}</FormText>
          <Input id='lon' name='lon' type='hidden' value={location.lon} />
          <Input id='lat' name='lat' type='hidden' value={location.lat} />
        </FormGroup>
        <FormGroup>
          <Label for='message'>{translation.post.description}</Label>
          <Input type='textarea' name='msg' id='message' maxLength='1000' minLength='20' rows='5' required />
          <FormText color='muted'>{translation.post.descriptionHint}</FormText>
        </FormGroup>
        <FormGroup>
          <Label for='photo'>{translation.post.photo}</Label>
          <Input type='file' name='photo' id='photo' accept='image/*' required />
          <FormText color='muted'>{translation.post.photoHint}</FormText>
        </FormGroup>
        <Button type='submit' disabled={isSubmitDisabled}>
          <span
            className='spinner-border spinner-border-sm mr-2'
            role='status'
            aria-hidden='true'
            hidden={!isSubmitDisabled}
          />
          {isSubmitDisabled ? translation.status.sending : translation.status.send}
        </Button>
      </Form>
    </div>
  );
}

CreatePost.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(CreatePost);
