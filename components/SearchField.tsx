/** @JSXImportSource @emotion/react **/

import { css } from "@emotion/react";

type SearchFieldProps = {
  size: "small" | "medium" | "large";
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
};

const SearchField: React.FC<SearchFieldProps> = ({
  size,
  placeholder,
  value = "",
  onChange,
  onSearch,
}) => {
  const searchFieldStyle = css`
    display: flex;
    align-items: center;
    gap: ${size === "small" ? "12px" : size === "medium" ? "14px" : "16px"};
    padding: ${size === "small"
      ? "0 11px"
      : size === "medium"
        ? "0 13px"
        : "0 15px"};
    width: ${size === "small"
      ? "calc(100vw - 190px)"
      : size === "medium"
        ? "calc(100vw - 100px)"
        : "calc(100vw - 60px)"};
    height: 44px;
    border: 1px solid #d6d6d6;
    border-radius: 10px;
  `;

  const searchIconStyle = css`
    width: ${size === "small" ? "18px" : "20px"};
    height: ${size === "small" ? "18px" : "20px"};
    position: relative;
    cursor: pointer;

    &::before {
      position: absolute;
      content: "";
      top: -60%;
      left: -60%;
      right: -60%;
      bottom: -60%;
    }
  `;

  const searchInputStyle = css`
    border: none;
    outline: none;
    padding: 0;
    height: 100%;
    font-size: ${size === "large" ? "18px" : "16px"};

    &::placeholder {
      color: #d6d6d6;
    }
  `;

  return (
    <div css={searchFieldStyle}>
      <div css={searchIconStyle} onClick={() => onSearch(value)}>
        <img css={searchIconStyle} src="/icons/search.png" alt="검색하기" />
      </div>
      <input
        css={searchInputStyle}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
