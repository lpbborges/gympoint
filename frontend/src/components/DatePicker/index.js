import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, label, onChangeDate, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactDatePicker
        name={fieldName}
        aria-label={fieldName}
        selected={selected}
        dateFormat="dd/MM/yyyy"
        locale={pt}
        onChange={date => {
          setSelected(date);
          onChangeDate(date);
        }}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChangeDate: PropTypes.func,
};

DatePicker.defaultProps = {
  onChangeDate: () => {},
  label: '',
};
