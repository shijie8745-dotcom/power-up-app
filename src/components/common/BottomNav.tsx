import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface BottomNavProps {
  items?: NavItem[];
}

const NavContainer = styled(motion.nav)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 8px 0 20px 0;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 0 24px 0;
  }
`;

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  margin: 0 auto;
  padding: 0 16px;
`;

const NavItemButton = styled(motion.button)<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.gray)};
  min-width: 60px;
  min-height: 60px;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 8px;
    min-width: 70px;
    min-height: 70px;
  }
`;

const NavIcon = styled.span`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const NavLabel = styled.span<{ active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 12px;
  font-weight: ${({ active }) => (active ? '600' : '400')};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

const defaultNavItems: NavItem[] = [
  { id: 'home', label: '首页', icon: '🏠', path: '/' },
  { id: 'favorites', label: '收藏', icon: '⭐', path: '/favorites' },
  { id: 'stats', label: '统计', icon: '📊', path: '/stats' },
  { id: 'profile', label: '我的', icon: '👤', path: '/profile' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ items = defaultNavItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: NavItem) => {
    navigate(item.path);
  };

  return (
    <>
      <NavContainer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 30, delay: 0.2 }}
        exit={{ y: 100, opacity: 0 }}
        transitionExit={{ duration: 0.3, ease: 'easeIn' }}
      >
        <NavList>
          {items.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <NavItemButton
                key={item.id}
                active={isActive}
                onClick={() => handleNavClick(item)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                custom={index}
                transition={{
                  delay: 0.3 + index * 0.05,
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                whileTap={{ scale: 0.9 }}
                layout
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '32px',
                      height: '3px',
                      borderRadius: '2px',
                      background: 'currentColor',
                    }}
                  />
                )}
                <NavIcon>{item.icon}</NavIcon>
                <NavLabel active={isActive}>{item.label}</NavLabel>
              </NavItemButton>
            );
          })}
        </NavList>
      </NavContainer>
    </>
  );
};

export default BottomNav;
