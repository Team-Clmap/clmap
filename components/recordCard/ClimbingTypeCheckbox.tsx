/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import React from "react";

export type ClimbingType = "bouldering" | "endurance" | "lead";

type ClimbingTypeCheckboxProps = {
  id: ClimbingType;
  checked: boolean;
  onChange: (id: ClimbingType, checked: boolean) => void;
};

const colorMap: Record<ClimbingType, string> = {
  bouldering: "#83bbff",
  endurance: "#FF8AA0",
  lead: "#FFC519",
};

const checkboxStyle = (id: ClimbingType, checked: boolean) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: ${checked ? colorMap[id] || "#b0b0b0" : "#b0b0b0"};
  border-radius: 90px;
  cursor: pointer;

  input {
    display: none;
  }
`;

const ClimbingTypeCheckbox = ({
  id,
  checked,
  onChange,
}: ClimbingTypeCheckboxProps) => {
  const handleChange = () => onChange(id, !checked);

  return (
    <label htmlFor={id} css={checkboxStyle(id, checked)}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      {id === "bouldering" && "볼더링"}
      {id === "endurance" && "지구력"}
      {id === "lead" && "리드"}
    </label>
  );
};

export default ClimbingTypeCheckbox;
