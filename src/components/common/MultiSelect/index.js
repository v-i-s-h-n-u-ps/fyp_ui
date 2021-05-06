import React from "react";
import { Multiselect as Select } from 'multiselect-react-dropdown';
import _includes from "lodash/includes";

import s from "./index.module.scss";

const MultiSelect = props => {

  const {
    options = [], selectedValues, onSelect, onRemove, keepSearchTerm = false,
    display, name, emptyMessage = "", closeOnSelect = false, showArrow = true,
    avoidHighlightFirstOption = true, placeholder = "Select", label = "", key = "id",
    multiple = true, error, helperText
  } = props

  const selected = options.filter(category => _includes(selectedValues, category[key]));

  return (
    <div>
      <div className={`${s.select} ${error ? s.error : ''}`} >
        <div className={`${s.label} ${selected.length ? s.active : ''} ${error ? s.error : ''}`}>{label}</div>
        <Select
          name={name}
          options={options}
          selectedValues={selected}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue={display}
          emptyRecordMsg={emptyMessage}
          closeOnSelect={closeOnSelect}
          avoidHighlightFirstOption={avoidHighlightFirstOption}
          placeholder={placeholder}
          keepSearchTerm={keepSearchTerm}
          showArrow={showArrow}
          singleSelect={!multiple}
        />
      </div>
      {
        !!helperText &&
        <p className={error ? s.error : s.helper}>
          {helperText}
        </p>
      }
    </div>
  )
}

export default MultiSelect;
