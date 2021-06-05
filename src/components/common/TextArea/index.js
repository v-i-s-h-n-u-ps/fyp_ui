import React from "react";

import s from "./index.module.scss";

const TextArea = props => {

  const {
    onChange, label, error, helperText, name = '', placeholder, rows = 3,
    value, maxLength
  } = props;

  return (
    <div className={`${s.textAreaContainer} ${error ? s.error : ''}`}>
      <p className={`${s.label} ${!!value ? s.active : ''} ${error ? s.error : ''}`}>
        {label}
      </p>
      <textarea
        rows={rows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <div className={s.textareaBottom}>
        {!!helperText &&
          <p className={error ? s.error : s.helper}>
            {helperText}
          </p>
        }
        {!!maxLength && (
          <span>
            {value.length}/300
          </span>
        )}
      </div>
    </div>
  )
}

export default TextArea
