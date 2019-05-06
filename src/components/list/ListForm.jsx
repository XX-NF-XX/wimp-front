import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Col, Input, Button, Collapse, Row } from 'reactstrap';

import Map from '../Map';
import RangeNumber from '../inputs/RangeNumber';

const defaultLocation = { lat: 49.432, lon: 32.083 };
const defaultRadius = 300;
const defaultDays = 7;

function ListForm({ searchHandler }) {
  const [location, setLocation] = useState(defaultLocation);
  const [radius, setRadius] = useState(defaultRadius);
  const [days, setDays] = useState(defaultDays);

  const [collapse, setCollapse] = useState(true);

  function toggleCollapse() {
    setCollapse(!collapse);
  }

  function getToggleLabel() {
    return collapse ? 'Hide ' : 'Show';
  }

  function onSearch() {
    if (!collapse) return;

    searchHandler({ location, radius, days });
    toggleCollapse();
  }

  return (
    <div>
      <Row>
        <Col sm='1'>
          <Button color='secondary' size='sm' onClick={toggleCollapse}>
            {getToggleLabel()}
          </Button>
        </Col>
        <Col sm='10'>
          <p className='h4 text-center'>Search posts</p>
        </Col>
      </Row>
      <Collapse isOpen={collapse}>
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
          <Button onClick={onSearch}>Search</Button>
        </Form>
      </Collapse>
    </div>
  );
}

ListForm.propTypes = {
  searchHandler: PropTypes.func.isRequired,
};

export default ListForm;
