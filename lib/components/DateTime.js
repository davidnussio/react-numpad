import React from 'react';
import PropTypes from 'prop-types';
import NumPad from './NumPad';
import StaticWrapper from './StaticWrapper';
import { Container } from '../elements/Wrapper';
import { display, validate, padding } from '../utils/date';
import { KeyPad } from '../elements';

const DateTimeInput = ({ inline, dateFormat, children, ...props }) => {
  const validation = (value = '') => validate(value, dateFormat, dateFormat.length);

  const formatInputValue = value => value.toString().replace(/\D+/g, '');

  const keyValid = (value, key = '') => {
    if (['.', '-'].includes(key)) return false;
    if (value.length === 12) return false;
    if (['AM', 'PM'].includes(key)) {
      console.log(value, key);
      return validate(value + key, dateFormat, value.length);
    }
    const paddingDate = padding(value + key, dateFormat);
    return validate(paddingDate, dateFormat, value.length);
  };

  const displayRule = (value = '') => {
    const doubleChar = dateFormat.search(/a/gi) !== -1 ? '_' : '';
    return display(value, dateFormat.replace(/[a-z]/gi, '_') + doubleChar);
  };

  if (inline) {
    return (
      <StaticWrapper {...props}>
        <Container>
          <KeyPad
            validation={validation}
            formatInputValue={formatInputValue}
            keyValid={keyValid}
            displayRule={displayRule}
            {...props}
          />
        </Container>
      </StaticWrapper>
    );
  }
  return (
    <NumPad
      {...props}
      customInput={children}
      formatInputValue={formatInputValue}
      displayRule={displayRule}
    >
      <KeyPad validation={validation} keyValid={keyValid} displayRule={displayRule} {...props} />
    </NumPad>
  );
};

DateTimeInput.propsType = {
  dateFormat: PropTypes.string,
  inline: PropTypes.bool,
  displayRule: PropTypes.func,
  validation: PropTypes.func,
  formatInputValue: PropTypes.func,
  confirm: PropTypes.func,
};

DateTimeInput.defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
  inline: false,
  confirm: () => console.warn('missing confirm callback'),
};

export default DateTimeInput;
