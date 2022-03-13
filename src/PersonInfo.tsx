import React, { useCallback } from "react";
import { Person } from "./api";

type Props = {
  data: Person;
  onClick: (person: any) => void;
  isSelected?: boolean;
};

function PersonInfo({ data, onClick, isSelected }: Props) {
  const handleClick = useCallback(() => {
    onClick(data);
  }, [data, onClick]);

  return (
    <div
      className={`person-info${isSelected ? " selected" : ""}`}
      onClick={handleClick}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default React.memo(PersonInfo);
