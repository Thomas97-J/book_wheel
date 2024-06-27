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
}

function DropDownSelect({ options, onSelect, placeholder }: DropDownProps) {
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
        {selected ? selected.label : placeholder}
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
  width: 200px;
`;

const DropDownHeader = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const DropDownList = styled.ul`
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  list-style: none;
  z-index: 1000;
`;

const DropDownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default DropDownSelect;
