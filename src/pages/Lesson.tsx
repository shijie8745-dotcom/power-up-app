import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { lessons, lessonContents } from '../data';
import { Button } from '../components/common';

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const ContentArea = styled.div`
  flex: 2;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: 1;
    padding: 1rem;
  }
`;

const TextbookPage = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 3rem;
  margin: 0 auto;
  max-width: 800px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 1px solid ${props => props.theme.colors.lightGray};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const PageNumber = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  font-family: ${props => props.theme.fonts.english};
`;

const EnglishText = styled.div`
  font-family: ${props => props.theme.fonts.english};
  font-size: 20px;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  white-space: pre-line;
  cursor: pointer;
  user-select: none;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`;

const HighlightableText = styled.span<{ isHighlighted?: boolean }>`
  position: relative;
  display: inline;
  background-color: ${props => props.isHighlighted ? props.theme.colors.yellow : 'transparent'};
  transition: background-color ${props => props.theme.transitions.normal};

  &:hover {
    background-color: ${props => props.isHighlighted ? props.theme.colors.yellow : 'rgba(255, 217, 61, 0.3)'};
  }
`;

const VocabularyItem = styled.span`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  cursor: help;
  font-weight: 500;
`;

const TranslationCard = styled(motion.div)`
  position: absolute;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0.5rem 1rem;
  box-shadow: ${props => props.theme.shadows.small};
  font-size: 14px;
  z-index: 1000;
  pointer-events: none;
  max-width: 200px;

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${props => props.theme.colors.white};
  }
`;

const Sidebar = styled.div`
  flex: 1;
  background: ${props => props.theme.colors.lightGray};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: none;
    padding: 1rem;
  }
`;

const Panel = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.small};
`;

const PanelTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.chinese};
`;

const ChineseText = styled.div`
  font-family: ${props => props.theme.fonts.chinese};
  font-size: 16px;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  white-space: pre-line;
`;

const ControlButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.text};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const TimerDisplay = styled(motion.div)`
  font-family: ${props => props.theme.fonts.english};
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const ProgressText = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.gray};
  font-family: ${props => props.theme.fonts.chinese};
  margin-top: 0.5rem;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.lightGray};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const NavButton = styled(Button)`
  min-width: 100px;
`;

const StarAnimation = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  pointer-events: none;
`;

const StarIcon = styled.div`
  font-size: 48px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  padding: 2rem 3rem;
  border-radius: ${props => props.theme.borderRadius.large};
  font-size: 1.5rem;
  font-family: ${props => props.theme.fonts.chinese};
  text-align: center;
  z-index: 1001;
  box-shadow: ${props => props.theme.shadows.large};
`;

// Animation variants
const pageVariants: Variants = {
  enter: {
    opacity: 0,
    x: 100,
  },
  center: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -100,
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
  },
};

const starVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: (custom: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: custom * 0.2,
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  }),
  fly: (custom: { id: number; total: number }) => ({
    x: 300 + custom.id * 30,
    y: -200,
    scale: 0.3,
    opacity: 0.7,
    transition: {
      duration: 2,
      ease: "easeOut",
      delay: custom.id * 0.1,
    },
  }),
};

// Icons
const VolumeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedText, setSelectedText] = useState<{ text: string; position: { x: number; y: number } } | null>(null);
  const [studyTime, setStudyTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [flyingStars, setFlyingStars] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [earnedStars, setEarnedStars] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const translationTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Find lesson and its contents
  const lesson = lessons.find(l => l.id === id);
  const contents = lessonContents.filter(lc => lc.lessonId === id).sort((a, b) => a.pageNumber - b.pageNumber);

  const totalPages = contents.length;
  const currentContent = contents[currentPage];

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
        setSelectedText(null);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1);
        setSelectedText(null);
      } else if (e.key === 'ArrowRight' && currentPage === totalPages - 1) {
        handleComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  // Check completion when study time reaches 3 minutes
  useEffect(() => {
    if (studyTime === 180 && !showCompletion) { // 3 minutes
      handleComplete();
    }
  }, [studyTime, showCompletion]);

  // Click outside to close translation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectedText && contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setSelectedText(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [selectedText]);

  const handleTextClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText({
        text: selectedText,
        position: {
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        }
      });

      // Auto-hide after 3 seconds
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current);
      }
      translationTimeoutRef.current = setTimeout(() => {
        setSelectedText(null);
      }, 3000);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);

    // Show toast notification
    const event = new CustomEvent('show-toast', {
      detail: { message: '正在朗读...', type: 'info' }
    });
    document.dispatchEvent(event);

    // Simulate playing for 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);

    const event = new CustomEvent('show-toast', {
      detail: { message: isFavorite ? '已取消收藏' : '已收藏！', type: 'success' }
    });
    document.dispatchEvent(event);
  };

  const handleComplete = () => {
    if (showCompletion) return;

    setShowCompletion(true);
    const stars = Math.floor(Math.random() * 3) + 1; // 1-3 stars
    setEarnedStars(stars);

    // Create flying stars
    const newFlyingStars = Array.from({ length: stars }, (_, i) => ({
      id: i,
      x: 0,
      y: 0
    }));
    setFlyingStars(newFlyingStars);

    // Show success message and then navigate
    setTimeout(() => {
      setShowCompletion(false);
      navigate(`/textbook/${lesson?.textbookId}`);
    }, 4000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!lesson || totalPages === 0) {
    return (
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div>课程不存在</div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <ContentArea>
          <AnimatePresence mode="wait">
            <TextbookPage
              key={currentPage}
              ref={contentRef}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={handleTextClick}
            >
              <PageNumber>Page {currentContent?.pageNumber}</PageNumber>
              <EnglishText>
                {currentContent?.englishText.split(/\s+/).map((word, index) => {
                  const isVocabulary = currentContent?.words.some(v =>
                    word.toLowerCase().replace(/[.,!?]/g, '').includes(v.word.toLowerCase())
                  );

                  return (
                    <React.Fragment key={index}>
                      {isVocabulary ? (
                        <VocabularyItem>{word}</VocabularyItem>
                      ) : (
                        <HighlightableText>{word}</HighlightableText>
                      )}
                      {index < currentContent.englishText.split(/\s+/).length - 1 && ' '}
                    </React.Fragment>
                  );
                })}
              </EnglishText>
            </TextbookPage>
          </AnimatePresence>

          {selectedText && (
            <TranslationCard
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              style={{
                left: selectedText.position.x,
                top: selectedText.position.y,
                transform: 'translateX(-50%) translateY(-100%)'
              }}
            >
              翻译：{selectedText.text}
            </TranslationCard>
          )}
        </ContentArea>

        <Sidebar>
          <Panel
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <PanelTitle>中文翻译</PanelTitle>
            <ChineseText>{currentContent?.chineseText}</ChineseText>
          </Panel>

          <Panel
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <PanelTitle>学习工具</PanelTitle>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <ControlButton
                onClick={handlePlay}
                animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                transition={isPlaying ? { duration: 1, repeat: Infinity } : {}}
              >
                <VolumeIcon />
              </ControlButton>

              <ControlButton onClick={handleFavorite}>
                <HeartIcon filled={isFavorite} />
              </ControlButton>
            </div>
          </Panel>

          <Panel
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <PanelTitle>学习时长</PanelTitle>
            <TimerDisplay>{formatTime(studyTime)}</TimerDisplay>
          </Panel>

          <Panel
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <PanelTitle>学习进度</PanelTitle>
            <ProgressText>
              第 {currentPage + 1} 页 / 共 {totalPages} 页
            </ProgressText>
          </Panel>
        </Sidebar>
      </Container>

      <Navigation>
        <NavButton
          variant="secondary"
          onClick={() => navigate(`/textbook/${lesson.textbookId}`)}
        >
          返回
        </NavButton>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <NavButton
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(prev => prev - 1);
                setSelectedText(null);
              }
            }}
            disabled={currentPage === 0}
          >
            上一页
          </NavButton>

          <NavButton
            onClick={() => {
              if (currentPage < totalPages - 1) {
                setCurrentPage(prev => prev + 1);
                setSelectedText(null);
              } else {
                handleComplete();
              }
            }}
          >
            {currentPage === totalPages - 1 ? '完成学习' : '下一页'}
          </NavButton>
        </div>
      </Navigation>

      {/* Flying stars animation */}
      <AnimatePresence>
        {flyingStars.map((star, index) => (
          <StarAnimation
            key={star.id}
            custom={{ id: index, total: flyingStars.length }}
            variants={starVariants}
            initial="initial"
            animate="animate"
            exit="fly"
            onAnimationComplete={() => {
              if (index === flyingStars.length - 1) {
                setTimeout(() => setFlyingStars([]), 2000);
              }
            }}
          >
            <StarIcon>⭐</StarIcon>
          </StarAnimation>
        ))}
      </AnimatePresence>

      {/* Completion success message */}
      <AnimatePresence>
        {showCompletion && (
          <SuccessMessage
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div>恭喜完成学习！</div>
            <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
              {'⭐'.repeat(earnedStars)}
            </div>
            <div>获得 {earnedStars} 颗星星！</div>
          </SuccessMessage>
        )}
      </AnimatePresence>
    </>
  );
};

export default Lesson;