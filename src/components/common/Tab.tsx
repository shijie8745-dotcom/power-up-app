import React, { useState } from 'react';
import styled from 'styled-components';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Container = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ active?: boolean }>`
  position: relative;
  padding: 16px 24px;
  background: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 16px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.gray)};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.lightGray};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
    border-radius: 2px 2px 0 0;
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 28px;
    font-size: 18px;
  }
`;

const TabContent = styled.div`
  padding: 24px 0;
  animation: fadeIn ${({ theme }) => theme.transitions.normal};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 32px 0;
  }
`;

export const Tab: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab || tabs[0]?.id || ''
  );

  const currentTab = activeTab || internalActiveTab;
  const activeTabData = tabs.find(tab => tab.id === currentTab);

  const handleTabClick = (tabId: string) => {
    if (!activeTab) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  return (
    <Container>
      <TabList>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            active={currentTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      <TabContent>
        {activeTabData?.content}
      </TabContent>
    </Container>
  );
};

export default Tab;