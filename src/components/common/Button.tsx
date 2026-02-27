import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
        &:hover:not(:disabled) {
          background: #3a7bc8;
        }
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.yellow};
        color: ${({ theme }) => theme.colors.text};
        &:hover:not(:disabled) {
          background: #e6c435;
        }
      `;
    case 'success':
      return css`
        background: ${({ theme }) => theme.colors.success};
        color: ${({ theme }) => theme.colors.white};
        &:hover:not(:disabled) {
          background: #219a52;
        }
      `;
    case 'warning':
      return css`
        background: ${({ theme }) => theme.colors.warning};
        color: ${({ theme }) => theme.colors.white};
        &:hover:not(:disabled) {
          background: #e08e0b;
        }
      `;
  }
};

const StyledButton = styled.button<{ variant: ButtonVariant; fullWidth?: boolean }>`
  ${({ variant }) => getButtonStyles(variant)}

  min-height: 44px;
  padding: 12px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  transform: scale(1);
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  box-shadow: ${({ theme }) => theme.shadows.small};

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
    padding: 14px 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
    padding: 16px 32px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
};

export default Button;