/** @JSXImportSource @emotion/react **/

"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Scrim from "./Scrim";
import SearchField from "./SearchField";
import Popup from "./Popup";

type SearchPopupProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClose: () => void;
};

const SearchPopup = ({
  value: externalValue,
  setValue,
  onClose,
}: SearchPopupProps) => {
  const [value, setLocalValue] = useState(externalValue);

  useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  const handleChange = (value: string) => {
    console.log("입력중: ", value);
    setValue(value);
  };

  const handleSearch = (value: string) => {
    console.log("암장 검색 API");
  };

  const handleSubmit = () => {
    setValue(value);
    onClose();
  };

  return (
    <Scrim align="center" onClose={onClose}>
      p
      <Popup
        title="암장이름 검색하기"
        buttonName="확인"
        leftButtonName="취소"
        onClickButton={handleSubmit}
        onClickLeft={onClose}
      >
        <SearchField
          size="medium"
          value={value}
          onChange={handleChange}
          onSearch={handleSearch}
          isValid
        />
      </Popup>
    </Scrim>
  );
};

export default SearchPopup;
