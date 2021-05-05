import React from "react";
import { Multiselect as Select } from 'multiselect-react-dropdown';
import _includes from "lodash/includes";

import s from "./index.module.scss";

const MultiSelect = props => {

  const {
    options = [], selectedValues, onSelect, onRemove, keepSearchTerm = false,
    display, name, emptyMessage = "", closeOnSelect = false, showArrow = true,
    avoidHighlightFirstOption = true, placeholder = "Select", label = "", key = "id"
  } = props

  const selected = options.filter(category => _includes(selectedValues, category[key]));

  return (
    <div className={s.select}>
      <div className={`${s.label} ${selected.length ? s.active : ''}`}>{label}</div>
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
      />
    </div>
  )
}

export default MultiSelect;
