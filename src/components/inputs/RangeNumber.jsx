import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormGroup, Col, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';

function RangeNumber(props) {
  const { min, max, label, name, step, placeholder, defaultValue, append, setValue: sendValue } = props;

  const [value, setValue] = useState(defaultValue);

  const onValueChange = ({ target: { value: val } }) => {
    let properValue = Math.max(min, val);
    properValue = Math.min(max, properValue);

    setValue(val);
    sendValue(properValue);
  };

  return (
    <div>
      <FormGroup row>
        <Label for={name} sm={3}>
          {label.toString()}
        </Label>
        <Col sm={9}>
          <InputGroup>
            <Input
              type='number'
              min={min}
              max={max}
              name={name}
              step={step}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={onValueChange}
            />
            <InputGroupAddon addonType='append'>{append.toString()}</InputGroupAddon>
          </InputGroup>
        </Col>
        <Col>
          <Input
            type='range'
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onValueChange}
            className='custom-range border-0 pt-4'
          />
        </Col>
      </FormGroup>
    </div>
  );
}

RangeNumber.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.number,
  append: PropTypes.string,
  setValue: PropTypes.func,
};

RangeNumber.defaultProps = {
  step: 1,
  placeholder: '',
  defaultValue: 0,
  append: null,
  setValue: () => {},
};

export default RangeNumber;
