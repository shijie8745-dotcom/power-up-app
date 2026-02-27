import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, BottomNav } from '../components/common';
import type { Favorite } from '../types';
import { favorites as mockFavorites } from '../data';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  padding-bottom: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 16px;
    padding-bottom: 110px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const StarIcon = styled.span`
  font-size: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 32px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 4px;
  box-shadow: ${({ theme }) => theme.shadows.small};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const TabButton = styled(motion.button)<{ active?: boolean }>`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.gray)};
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  min-width: 120px;

  &:hover:not(:disabled) {
    color: ${({ theme, active }) => !active && theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px 20px;
    font-size: 16px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 48px 16px 16px;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 16px;
  background: ${({ theme }) => theme.colors.white};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 56px 20px 20px;
    font-size: 18px;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: ${({ theme }) => theme.colors.gray};
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 24px;
    right: 20px;
  }
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 56px;
    font-size: 20px;
  }
`;

const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FavoriteCard = styled(Card)`
  position: relative;
  padding: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 24px;
  }
`;

const EnglishText = styled.div`
  font-family: ${({ theme }) => theme.fonts.english};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const ChineseText = styled.div`
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 16px;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const IconButton = styled(motion.button)<{ variant?: 'play' | 'delete' }>`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: ${({ theme, variant }) =>
    variant === 'play' ? theme.colors.success : theme.colors.lightGray};
  color: ${({ theme, variant }) =>
    variant === 'play' ? theme.colors.white : theme.colors.gray};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-size: 18px;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === 'play'
        ? '#219a52'
        : theme.colors.error};
    color: ${({ theme, variant }) =>
      variant === 'delete' && theme.colors.white};
    transform: ${({ variant }) => variant === 'delete' && 'rotate(5deg)'}
  }

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.small};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 24px;
  }
`;

const EmptyIcon = styled(motion.div)`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 80px;
  }
`;

const EmptyText = styled.div`
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`;

interface FavoritesProps {
  favorites?: Favorite[];
}

const Favorites: React.FC<FavoritesProps> = ({ favorites: propFavorites }) => {
  const [favorites, setFavorites] = useState<Favorite[]>(propFavorites || mockFavorites);
  const [activeTab, setActiveTab] = useState<'word' | 'sentence'>('word');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

  // Filter favorites based on active tab and search query
  const filteredFavorites = favorites
    .filter(fav => fav.type === activeTab)
    .filter(fav => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        fav.english.toLowerCase().includes(query) ||
        fav.chinese.toLowerCase().includes(query)
      );
    });

  const handlePlay = (id: string, text: string) => {
    setPlayingCardId(id);
    // Simulate text-to-speech with toast
    setTimeout(() => {
      alert(`正在播放: ${text}`);
      setPlayingCardId(null);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setDeletingCardId(id);
    // Simulate deletion with animation
    setTimeout(() => {
      setFavorites(prev => prev.filter(fav => fav.id !== id));
      setDeletingCardId(null);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <PageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          我的收藏
          <StarIcon>⭐</StarIcon>
        </Title>
      </Header>

      <TabContainer>
        <TabButton
          active={activeTab === 'word'}
          onClick={() => setActiveTab('word')}
          whileTap={{ scale: 0.95 }}
          layout
        >
          单词收藏
        </TabButton>
        <TabButton
          active={activeTab === 'sentence'}
          onClick={() => setActiveTab('sentence')}
          whileTap={{ scale: 0.95 }}
          layout
        >
          句子收藏
        </TabButton>
      </TabContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="搜索英文或中文..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AnimatePresence>
          {searchQuery && (
            <ClearButton
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={clearSearch}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </ClearButton>
          )}
        </AnimatePresence>
        <SearchIcon>🔍</SearchIcon>
      </SearchContainer>

      <GridContainer
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="popLayout">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((favorite, index) => (
              <motion.div
                key={favorite.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={deletingCardId === favorite.id
                  ? { opacity: 0, scale: 0.8 }
                  : { opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                layout
              >
                <FavoriteCard hoverable={false}>
                  <EnglishText>{favorite.english}</EnglishText>
                  <ChineseText>{favorite.chinese}</ChineseText>
                  <ButtonGroup>
                    <IconButton
                      variant="play"
                      whileTap={{ scale: 0.8 }}
                      animate={playingCardId === favorite.id ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      onClick={() => handlePlay(favorite.id, favorite.english)}
                      disabled={playingCardId === favorite.id}
                    >
                      {playingCardId === favorite.id ? '⏳' : '🔊'}
                    </IconButton>
                    <IconButton
                      variant="delete"
                      whileTap={{ scale: 0.8 }}
                      onClick={() => handleDelete(favorite.id)}
                      disabled={deletingCardId === favorite.id}
                    >
                      {deletingCardId === favorite.id ? '⏳' : '🗑️'}
                    </IconButton>
                  </ButtonGroup>
                </FavoriteCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ gridColumn: '1 / -1' }}
            >
              <EmptyState>
                <EmptyIcon
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  📚
                </EmptyIcon>
                <EmptyText>还没有收藏哦~</EmptyText>
              </EmptyState>
            </motion.div>
          )}
        </AnimatePresence>
      </GridContainer>

      <BottomNav />
    </PageContainer>
  );
};

export default Favorites;
