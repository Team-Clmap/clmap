/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";

type RadioButtonType = {
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonType> = ({
  name,
  label,
  value,
  checked,
  onChange,
}) => {
  const radioBoxStyle = css`
    width: fit-content;
  `;
  
  const radioButtonStyle = css`
    appearance: none;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    border: 2px solid #83bbff;
    border-radius: 50%;
    position: relative;
    vertical-align: middle;

    &:checked::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #83bbff;
    }
  `;

  const labelStyle = css`
    vertical-align: middle;
    font-size: 18px;
    cursor: pointer;
  `;

  const id = `${name}-${value}`;

  return (
    <div css={radioBoxStyle}>
      <input
        type="radio"
        css={radioButtonStyle}
        id={id}
        name={name}
        value={value || ""}
        checked={checked}
        onChange={() => onChange?.(value)}
      />
      <label css={labelStyle} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
