import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface DropDownOption {
  label: string;
  clickFunction: () => void;
}

interface DropDownProps {
  options: DropDownOption[];
  buttonInner: any;
  isRightSide?: boolean;
}

function DropDown({
  options,
  buttonInner,
  isRightSide = false,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleListClick(clickFunction: () => void) {
    clickFunction();
    setIsOpen(false);
  }

  return (
    <DropDownWrapper ref={dropDownRef}>
      <DropDownBtn onClick={() => setIsOpen(!isOpen)}>
        {buttonInner}
      </DropDownBtn>
      {isOpen && (
        <DropDownList $isRightSide={isRightSide}>
          {options.map((option) => (
            <DropDownItem
              key={option.label}
              onClick={() => handleListClick(option.clickFunction)}
            >
              {option.label}
            </DropDownItem>
          ))}
        </DropDownList>
      )}
    </DropDownWrapper>
  );
}

const DropDownWrapper = styled.div`
  position: relative;
`;

const DropDownBtn = styled.button`
  position: relative;

  cursor: pointer;
  border: none;
`;

const DropDownList = styled.ul<{ $isRightSide: boolean }>`
  position: absolute;
  margin: 0;
  padding: 0;

  ${(props) => (props.$isRightSide ? "right: 0;" : "left: 0;")}

  border: 1px solid #ccc;
  background-color: #fff;
  list-style: none;
  z-index: 1000;
`;

const DropDownItem = styled.li`
  padding: 10px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default DropDown;
