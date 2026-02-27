import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, useToast } from '../components/common';
import { textbooks, lessons } from '../data';
import type { Lesson } from '../types';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, #e3f2fd 100%);
  padding: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 32px 24px;
  }
`;

const Header = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding: 32px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 24px;
  }
`;

const CoverEmoji = styled.div`
  font-size: 64px;
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 48px;
  }
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 32px;
  font-family: ${({ theme }) => theme.fonts.english};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const LevelBadge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 0;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const ProgressOverview = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.primary}10);
  border-radius: ${({ theme }) => theme.borderRadius.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProgressLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const ProgressValue = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.english};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 280px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const UnitsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const UnitsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const UnitCard = styled(Card)<{ status: 'locked' | 'in-progress' | 'completed' }>`
  position: relative;
  overflow: hidden;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${({ status, theme }) => {
    if (status === 'completed') {
      return `
        border-top: 4px solid ${theme.colors.success};
      `;
    } else if (status === 'in-progress') {
      return `
        border-top: 4px solid ${theme.colors.warning};
      `;
    } else {
      return `
        border-top: 4px solid ${theme.colors.gray};
        opacity: 0.7;
      `;
    }
  }}

  &:hover {
    transform: ${({ status }) => (status !== 'locked' ? 'translateY(-8px)' : 'none')};
  }

  &:active {
    transform: ${({ status }) => (status !== 'locked' ? 'scale(0.98)' : 'none')};
  }

  ${({ status }) =>
    status === 'locked' &&
    `
    cursor: not-allowed;
  `}
`;

const UnitHeader = styled.div`
  padding: 20px 20px 12px;
  position: relative;
`;

const UnitEmoji = styled.div`
  font-size: 48px;
  line-height: 1;
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 40px;
  }
`;

const UnitTitle = styled.h3`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.english};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  margin-top: 0;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`;

const UnitNumber = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  font-weight: 500;
`;

const UnitBody = styled.div`
  padding: 0 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const StatusIndicator = styled.div<{ status: 'locked' | 'in-progress' | 'completed' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;

  ${({ status, theme }) => {
    if (status === 'completed') {
      return `color: ${theme.colors.success};`;
    } else if (status === 'in-progress') {
      return `color: ${theme.colors.warning};`;
    } else {
      return `color: ${theme.colors.gray};`;
    }
  }}
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled(motion.span)<{ active: boolean }>`
  font-size: 16px;
  ${({ active }) => (active ? 'opacity: 1;' : 'opacity: 0.2;')}
`;

const PageRange = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.english};
`;

const LastStudied = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  margin-top: auto;
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatsCard = styled(Card)`
  text-align: center;
`;

const StatsTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  margin-top: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 4px;
`;

const StatValue = styled(motion.div)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.english};
`;

const ProgressChart = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
`;

const ChartSVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const ChartBackground = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.lightGray};
  stroke-width: 8;
`;

const ChartProgress = styled(motion.circle)<{ percentage: number }>`
  fill: none;
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: ${({ percentage }) => {
    const circumference = 2 * Math.PI * 54;
    return `${(percentage / 100) * circumference} ${circumference}`;
  }};
`;

const ChartText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.english};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray};
`;

const UnitVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const
    }
  }),
  locked: {
    opacity: 0.7,
    pointerEvents: 'none' as const
  }
} as const;

const HeaderVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
} as const;

const StarVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20
    }
  },
  shimmer: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

const TextbookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { error } = useToast();
  const [selectedTextbook, setSelectedTextbook] = useState<any>(null);
  const [textbookLessons, setTextbookLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const textbook = textbooks.find(t => t.id === id);
      if (textbook) {
        setSelectedTextbook(textbook);
        const lessonsForTextbook = lessons.filter(l => l.textbookId === textbook.id);
        setTextbookLessons(lessonsForTextbook);
        setIsLoading(false);
      } else {
        error('教材不存在');
        setIsLoading(false);
      }
    }, 500);
  }, [id, error]);

  const handleUnitClick = (lesson: Lesson) => {
    if (lesson.status === 'locked') {
      // Find the previous lesson to suggest which one to complete
      const previousLesson = textbookLessons.find(
        l => l.unitNumber === lesson.unitNumber - 1
      );
      const message = previousLesson
        ? `请先完成"${previousLesson.title}"单元后再来学习这一课`
        : '请先完成前置单元后再来学习这一课';
      error(message);
      return;
    }

    // Navigate to lesson page
    navigate(`/lesson/${lesson.id}`);
  };

  const stats = React.useMemo(() => {
    if (!textbookLessons.length) {
      return { completed: 0, inProgress: 0, locked: 0, totalStars: 0, percentage: 0 };
    }

    const completed = textbookLessons.filter(l => l.status === 'completed').length;
    const inProgress = textbookLessons.filter(l => l.status === 'in-progress').length;
    const locked = textbookLessons.filter(l => l.status === 'locked').length;
    const totalStars = textbookLessons.reduce((sum, l) => sum + l.starsEarned, 0);
    const percentage = Math.round((completed / textbookLessons.length) * 100);

    return { completed, inProgress, locked, totalStars, percentage };
  }, [textbookLessons]);

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          正在加载教材内容...
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (!selectedTextbook) {
    return (
      <PageContainer>
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          教材未找到
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTextbook.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Header
            variants={HeaderVariants}
            initial="hidden"
            animate="visible"
          >
            <CoverEmoji>{selectedTextbook.cover}</CoverEmoji>
            <HeaderInfo>
              <Title>{selectedTextbook.title}</Title>
              <LevelBadge>级别: {selectedTextbook.level}</LevelBadge>
              <Description>{selectedTextbook.description}</Description>
            </HeaderInfo>
            <ProgressOverview>
              <ProgressLabel>完成进度</ProgressLabel>
              <ProgressValue>{stats.percentage}%</ProgressValue>
            </ProgressOverview>
          </Header>

          <ContentGrid>
            <UnitsSection>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                  fontSize: '24px',
                  color: 'var(--colors-text)',
                  marginBottom: '16px',
                  fontFamily: 'var(--fonts-chinese)'
                }}
              >
                单元列表 ({textbookLessons.length} 个单元)
              </motion.h2>

              <UnitsGrid>
                <AnimatePresence>
                  {textbookLessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      custom={index}
                      variants={UnitVariants}
                      initial="hidden"
                      animate={lesson.status === 'locked' ? ['visible', 'locked'] : 'visible'}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={lesson.status !== 'locked' ? { scale: 1.02 } : {}}
                      whileTap={lesson.status !== 'locked' ? { scale: 0.98 } : {}}
                      onClick={() => handleUnitClick(lesson)}
                    >
                      <UnitCard status={lesson.status}>
                        <UnitHeader>
                          <UnitEmoji>{lesson.thumbnail}</UnitEmoji>
                          <UnitTitle>{lesson.title}</UnitTitle>
                          <UnitNumber>单元 {lesson.unitNumber}</UnitNumber>
                        </UnitHeader>
                        <UnitBody>
                          <PageRange>页码: {lesson.pageRange}</PageRange>
                          <StatusBar>
                            <StatusIndicator status={lesson.status}>
                              {lesson.status === 'completed' && '✅ 已完成'}
                              {lesson.status === 'in-progress' && '🔄 进行中'}
                              {lesson.status === 'locked' && '🔒 未解锁'}
                            </StatusIndicator>
                            <Stars>
                              {[...Array(lesson.maxStars)].map((_, i) => (
                                <Star
                                  key={i}
                                  active={i < lesson.starsEarned}
                                  variants={StarVariants}
                                  initial="initial"
                                  animate={i < lesson.starsEarned ? ["animate", "shimmer"] : "initial"}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  ⭐
                                </Star>
                              ))}
                            </Stars>
                          </StatusBar>
                          {lesson.status !== 'locked' && (
                            <LastStudied>
                              最后学习: 2天前
                            </LastStudied>
                          )}
                        </UnitBody>
                      </UnitCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </UnitsGrid>
            </UnitsSection>

            <StatsSection>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <StatsCard>
                  <StatsTitle>学习统计</StatsTitle>
                  <ProgressChart>
                    <ChartSVG>
                      <ChartBackground
                        cx="60"
                        cy="60"
                        r="54"
                      />
                      <ChartProgress
                        cx="60"
                        cy="60"
                        r="54"
                        percentage={stats.percentage}
                        strokeDasharray="0 339.292"
                        animate={{
                          strokeDasharray: `${(stats.percentage / 100) * 339.292} 339.292`
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </ChartSVG>
                    <ChartText>{stats.percentage}%</ChartText>
                  </ProgressChart>

                  <StatsGrid>
                    <StatItem>
                      <StatLabel>总单元数</StatLabel>
                      <StatValue
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {textbookLessons.length}
                      </StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>已完成</StatLabel>
                      <StatValue
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {stats.completed}
                      </StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>进行中</StatLabel>
                      <StatValue
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        {stats.inProgress}
                      </StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>未解锁</StatLabel>
                      <StatValue
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {stats.locked}
                      </StatValue>
                    </StatItem>
                  </StatsGrid>

                  <StatItem style={{ marginTop: '20px' }}>
                    <StatLabel>总获得星星</StatLabel>
                    <motion.div
                      style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: 'var(--colors-warning)',
                        fontFamily: 'var(--fonts-english)'
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                    >
                      ⭐ {stats.totalStars}
                    </motion.div>
                  </StatItem>
                </StatsCard>
              </motion.div>
            </StatsSection>
          </ContentGrid>
        </motion.div>
      </AnimatePresence>
    </PageContainer>
  );
};

export default TextbookPage;