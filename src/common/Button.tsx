import React from 'react';
import styled from 'styled-components';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { loading, disabled, children, ...rest } = props;
  return (
    <StyledButton disabled={loading || disabled} {...rest}>
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  color: #fff;
  background-color: #3c74ff;
  border: none;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  min-width: 160px;

  &:active {
    background-color: #2b53ba;
  }

  &:disabled {
    color: #000;
    background-color: #e6e6e6;
  }
`;
