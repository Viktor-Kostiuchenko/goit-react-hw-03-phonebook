import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import s from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <label className={s.label}>
      Find contacts by name
      <div className={s.wrapper}>
        <DebounceInput
          debounceTimeout={500}
          className={s.input}
          type="text"
          value={value}
          onChange={onChange}
        />
        <span className={s.focusBorder}>
          <i></i>
        </span>
      </div>
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
