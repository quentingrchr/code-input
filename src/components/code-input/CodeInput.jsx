import React, { useEffect, useRef, useState } from "react";
import { Container, Input, InputsContainer, Submit } from "./CodeInput.style";

export default function CodeInput({ length }) {
  const [inputs, setInputs] = useState(new Array(length).fill(""));

  const inputsRef = useRef([]);
  const submitRef = useRef(null);

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const addToRef = (el) => {
    inputsRef.current.push(el);
  };

  const handleChange = (e, i) => {
    const newInputs = [...inputs];
    newInputs[i] = e.target.value;
    setInputs(newInputs);
    if (e.target.value === "" && e.target.previousSibling) {
      e.target.previousSibling.focus();
    } else if (e.target.value === "" && !e.target.previousSibling) {
      return;
    } else if (e.target.nextSibling) {
      e.target.nextSibling.focus();
      // e.target.nextSibling.setSelectionRange(0, 1);
    } else {
      submitRef.current.focus();
    }
  };

  const handleClick = (e) => {
    e.target.focus();
    e.target.setSelectionRange(0, 1);
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text");
    const newInputs = [];
    for (let i = 0; i < inputs.length; i++) {
      newInputs[i] = text[i];
    }
    setInputs(newInputs);
  };

  return (
    <Container>
      <InputsContainer>
        {inputs.map((value, i) => (
          <Input
            type="text"
            maxLength="1"
            required
            ref={addToRef}
            value={value}
            onChange={(e) => {
              handleChange(e, i);
            }}
            onPaste={handlePaste}
            onClick={handleClick}
          />
        ))}
      </InputsContainer>
      <Submit
        type="submit"
        ref={submitRef}
        value="confirm"
        disabled={inputs.includes("")}
      />
    </Container>
  );
}
