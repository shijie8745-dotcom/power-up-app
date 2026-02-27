import React from 'react';
import styled, { keyframes } from 'styled-components';

export interface ProgressBarProps {
  value: number;
  max?: number;
  animated?: boolean;
  gradient?: 'primary' | 'rainbow' | 'green-yellow';
  showPercentage?: boolean;
}

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 20px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const getGradient = (gradient: string) => {
  switch (gradient) {
    case 'primary':
      return 'linear-gradient(90deg, #4A90E2, #6BCB77)';
    case 'rainbow':
      return 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)';
    case 'green-yellow':
      return 'linear-gradient(90deg, #6BCB77, #FFD93D)';
    default:
      return 'linear-gradient(90deg, #4A90E2, #6BCB77)';
  }
};

const Bar = styled.div<{ width: number; animated: boolean; gradient: string }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background: ${({ gradient }) => getGradient(gradient)};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: width ${({ theme, animated }) => (animated ? theme.transitions.slow : theme.transitions.fast)};
  position: relative;
  overflow: hidden;

  ${({ animated }) =>
    animated &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: ${shimmer} 1.5s infinite;
    }
  `}
`;

const Percentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  z-index: 1;
  font-family: ${({ theme }) => theme.fonts.chinese};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  animated = true,
  gradient = 'primary',
  showPercentage = true,
}) => {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <Container>
      <Bar width={percentage} animated={animated} gradient={gradient} />
      {showPercentage && <Percentage>{Math.round(percentage)}%</Percentage>}
    </Container>
  );
};

export default ProgressBar;