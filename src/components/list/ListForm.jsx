import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Col, Input, Button, Collapse, Row } from 'reactstrap';

import Map from '../Map';
import { getPosts } from '../../helpers/fetcher';
import RangeNumber from '../inputs/RangeNumber';

const defaultLocation = { lat: 49.432, lon: 32.083 };
const defaultRadius = 1000;
const defaultDays = 10;

function ListForm({ resultHandler }) {
  const [location, setLocation] = useState(defaultLocation);
  const [radius, setRadius] = useState(defaultRadius);
  const [days, setDays] = useState(defaultDays);

  const [isSearching, setIsSearching] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  function onSearchResult(requests) {
    setIsSearching(false);

    if (requests.length > 0) toggleCollapse();

    resultHandler(requests);
  }

  function onSearch() {
    setIsSearching(true);

    getPosts({ radius, days, location })
      .then(payload => onSearchResult(payload.requests))
      .catch(reject => console.error(reject)); // TODO: show toast
  }

  return (
    <div>
      <Row>
        <Col sm='1'>
          <Button color='secondary' size='sm' onClick={toggleCollapse}>
            {isCollapsed ? 'Show' : 'Hide '}
          </Button>
        </Col>
        <Col sm='10'>
          <p className='h4 text-center'>Search posts</p>
        </Col>
      </Row>
      <Collapse isOpen={!isCollapsed}>
        <Form>
          <FormGroup row>
            <Col sm='6'>
              <RangeNumber min={1} max={30} name='d' label='Age' append='days' defaultValue={days} setValue={setDays} />
            </Col>
            <Col sm='6'>
              <RangeNumber
                min={50}
                max={10000}
                name='r'
                label='Radius'
                append='meters'
                step={50}
                defaultValue={radius}
                setValue={setRadius}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Map draggable locationHandler={setLocation} radius={radius} location={location} />
          </FormGroup>
          <Input name='lon' value={location.lon} readOnly hidden />
          <Input name='lat' value={location.lat} readOnly hidden />
          <Button onClick={onSearch} disabled={isSearching}>
            <span
              className='spinner-border spinner-border-sm mr-2'
              role='status'
              aria-hidden='true'
              hidden={!isSearching}
            />
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </Form>
      </Collapse>
    </div>
  );
}

ListForm.propTypes = {
  resultHandler: PropTypes.func.isRequired,
};

export default ListForm;
