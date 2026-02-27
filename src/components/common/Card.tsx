import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  padding?: string;
  hoverable?: boolean;
  className?: string;
}

const StyledCard = styled.div<{ hoverable?: boolean; padding?: string }>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ padding }) => padding || '24px'};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  ${({ hoverable, theme }) =>
    hoverable &&
    `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.large};
    }
  `}

  ${({ onClick }) =>
    onClick &&
    `
    &:active {
      transform: scale(0.98);
    }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ padding }) => padding || '28px'};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ padding }) => padding || '32px'};
  }
`;

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  padding,
  hoverable = true,
  className,
}) => {
  return (
    <StyledCard
      onClick={onClick}
      padding={padding}
      hoverable={hoverable}
      className={className}
    >
      {children}
    </StyledCard>
  );
};

export default Card;