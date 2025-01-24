/** @JSXImportSource @emotion/react **/

"use client";

import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";
import Scrim from "./Scrim";
import BottomSheet from "./BottomSheet";
import SearchField from "./SearchField";

type SearchFieldBottomSheetProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClose: () => void;
};

const SearchFieldBottomSheet: React.FC<SearchFieldBottomSheetProps> = ({
  value,
  setValue,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (value: string) => {
    console.log("입력중: ", value);
    setValue(value);
  };

  const handleSearch = (value: string) => {
    console.log("검색할 암장: ", value);
  };

  return (
    <Scrim align="end" onClose={onClose}>p
      <BottomSheet
        isOpen={isOpen}
        onSubmit={() => {
          console.log("암장명 연동");
          onClose();
        }}
        size="small"
        buttonName="확인"
        isFormValid
      >
        <div css={boxStyle}>
          <div css={titleStyle}>암장 검색</div>
          <SearchField
            size="large"
            value={value}
            onChange={handleChange}
            onSearch={handleSearch}
            isValid
          />
        </div>
      </BottomSheet>
    </Scrim>
  );
};

const boxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: center;
  justify-content: center;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
  /* text-align: center; */
`;

export default SearchFieldBottomSheet;
