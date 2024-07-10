import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface Option {
  label: string;
  value: any;
}

interface DropDownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder: string;
  defaultLabel?: string;
}

function DropDownSelect({
  options,
  onSelect,
  placeholder,
  defaultLabel,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
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

  const handleSelect = (option: Option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropDownWrapper ref={dropDownRef}>
      <DropDownHeader onClick={() => setIsOpen(!isOpen)}>
        {defaultLabel ? defaultLabel : selected ? selected.label : placeholder}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
        </svg>
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          {options.map((option) => (
            <DropDownItem
              key={option.value}
              onClick={() => handleSelect(option)}
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
  width: auto;
  display: inline-block;
  white-space: nowrap;
`;

const DropDownHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const DropDownList = styled.ul`
  position: absolute;
  width: auto;
  margin: 0;
  padding: 0;
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

export default DropDownSelect;
