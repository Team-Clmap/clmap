/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";
import { useEffect, useState } from "react";

type GradeInputProps = {
  onChange: (value: string) => void;
  onColorChange?: (color: string) => void;
  color?: string;
};

const colors = [
  "#ff8aa0",
  "#ff3b30",
  "#ff9500",
  "#ffc519",
  "#34c759",
  "#83bbff",
  "#007aff",
  "#af52de",
  "#a2845e",
  "#000000",
  "#ffffff",
];

const GradeInput: React.FC<GradeInputProps> = ({
  onChange,
  color: externalColor = "#83bbff",
  onColorChange,
}) => {
  const [value, setValue] = useState("0"); // [TODO] 기본값 API 확인
  const [color, setColor] = useState(externalColor);
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    setColor(externalColor);
  }, [externalColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    if (input.length <= 2) {
      setValue(input);
      onChange(`V${input}`);
    }
  };

  const handleColorSelect = (newColor: string) => {
    setColor(newColor);
    setShowPalette(false);
    if (onColorChange) {
      onColorChange(newColor);
    }
  };

  const gradeInputBoxStyle = css`
    width: 90px;
    height: 44px;
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    padding: 12px 13px;

    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    position: relative;
  `;

  const gradeButtonStyle = css`
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background-color: ${color};
    cursor: pointer;
  `;

  const gradeInputStyle = css`
    outline: none;
    border: none;
    padding: 0;
    max-width: 34px;
    text-align: center;
    font-size: 18px;
  `;

  const paletteStyle = css`
    width: 225px;
    position: absolute;
    top: -26px;
    left: calc(100% + 8px);
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    background: #ffffff;
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    padding: 9px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
  `;

  const colorOptionStyle = (optionColor: string) => css`
    width: 30px;
    height: 30px;
    border: ${optionColor === "#ffffff" ? "1px solid #d6d6d6" : "none"};
    border-radius: 10px;
    background-color: ${optionColor};
    cursor: pointer;
  `;

  return (
    <div css={gradeInputBoxStyle}>
      <button
        css={gradeButtonStyle}
        onClick={() => setShowPalette(!showPalette)}
      />
      <input
        css={gradeInputStyle}
        value={`V${value}`}
        onChange={handleChange}
      />
      {showPalette && (
        <div css={paletteStyle}>
          {colors.map((col) => (
            <div
              key={col}
              css={colorOptionStyle(col)}
              onClick={() => handleColorSelect(col)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GradeInput;
