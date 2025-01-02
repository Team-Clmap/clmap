/** @JSXImportSource @emotion/react **/

import MembershipCard from "@/components/membershipCard/MembershipCard";

export default function HomePage() {
  return (
    <>
      <MembershipCard
        centerName="락트리방구방구"
        membershipType="횟수권"
        registrationDate="24.08.18"
        expirationDate="25.02.18"
        restInfo="2회"
        isEditable={true}
      />
    </>
  );
}
