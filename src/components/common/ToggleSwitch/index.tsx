import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface ToggleSwitchProps {
  isOn: boolean | undefined;
  onToggle: () => void;
}

export function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <Switch isOn={isOn ?? true} onClick={onToggle}>
      <Handle className="handle" layout transition={spring} />
    </Switch>
  );
}

export default ToggleSwitch;

const Switch = styled.div<{ isOn: boolean }>`
  width: 32px;
  height: 20px;
  display: flex;
  border-radius: 30px;
  padding: 2px 3px;
  margin: 2px;
  cursor: pointer;
  background-color: ${(props: { isOn: boolean }) =>
    props.isOn ? "#4caf50" : "#ccc"};
  justify-content: ${(props: { isOn: boolean }) =>
    props.isOn ? "flex-end" : "flex-start"};
  align-items: center;
`;
const Handle = styled(motion.div)`
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 40px;
`;
