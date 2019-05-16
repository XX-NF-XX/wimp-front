import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Col, Input, Button, Collapse, Row } from 'reactstrap';

import Map from '../Map';
import { getPosts } from '../../helpers/fetcher';
import RangeNumber from '../inputs/RangeNumber';
import { getLocation, getDefaultLocation } from '../../helpers/location';
import translation from '../../constants/translation';

const defaultRadius = 1000;
const defaultDays = 10;

function ListForm({ resultHandler }) {
  const [location, setLocation] = useState(getDefaultLocation());
  const [radius, setRadius] = useState(defaultRadius);
  const [days, setDays] = useState(defaultDays);

  const [isSearching, setIsSearching] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    getLocation(position => setLocation(position));
  }, []);

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  function onSearchResult(requests) {
    setIsSearching(false);

    if (requests.length > 0) toggleCollapse();

    if (requests.length > 1) {
      requests.sort((first, second) => {
        return second.created - first.created;
      });
    }

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
        <Col xs='3'>
          <Button color='secondary' size='sm' onClick={toggleCollapse}>
            {isCollapsed ? translation.status.show : translation.status.hide}
          </Button>
        </Col>
        <Col xs='6'>
          <p className='h4 text-center'>{translation.list.title}</p>
        </Col>
      </Row>
      <Collapse isOpen={!isCollapsed}>
        <Form>
          <FormGroup row>
            <Col sm='6'>
              <RangeNumber
                min={1}
                max={30}
                name='d'
                label={translation.list.age}
                append={translation.list.days}
                defaultValue={days}
                setValue={setDays}
              />
            </Col>
            <Col sm='6'>
              <RangeNumber
                min={50}
                max={10000}
                name='r'
                label={translation.list.radius}
                append={translation.list.meters}
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
            {isSearching ? translation.status.searching : translation.status.search}
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
