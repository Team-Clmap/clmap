/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";

type ChipProps = {
  title: string;
  color: string;
};

const Chip: React.FC<ChipProps> = ({ title, color }) => {
  const chipStyle = css`
    width: fit-content;
    height: 18px;
    padding: ${title.length === 1 ? "4px" : "4px 8px"};
    border-radius: 90px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #ffffff;
    background-color: ${color};
  `;

  const titleStyle = css`
    font-size: 10px;
    font-weight: bolder;
  `;

  return (
    <div css={chipStyle}>
      <div css={titleStyle}>{title}</div>
    </div>
  );
};

export default Chip;
