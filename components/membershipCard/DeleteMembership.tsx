/** @JSXImportSource @emotion/react **/

import Scrim from "../Scrim";
import Popup from "../Popup";

type DeleteMembershipProps = {
  membershipId: number;
  onClose: () => void;
};

const DeleteMembership = ({ membershipId, onClose }: DeleteMembershipProps) => {
  return (
    <Scrim align="center" onClose={onClose}>
      <Popup
        title="정말 삭제하시겠어요?"
        description="삭제하신 항목은 되돌릴 수 없어요."
        buttonName="삭제"
        leftButtonName="취소"
        onClickButton={() => {
          console.log("[TODO] membershipId + MembershipCard 삭제 API 연동");
          onClose();
        }}
        onClickLeft={onClose}
      />
    </Scrim>
  );
};

export default DeleteMembership;
