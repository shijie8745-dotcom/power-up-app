import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, Button, ProgressBar } from '../components/common';

// Mock data imports
import { textbooks } from '../data';

// Styled Components
const Container = styled(motion.div)`
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fonts.chinese};
  position: relative;
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Greeting = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.green});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const StarJar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const StarIcon = styled.span`
  font-size: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const StarCount = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Section = styled.div`
  margin-bottom: 36px;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '🌟';
    font-size: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 22px;
  }
`;

const StatsCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const StatsItem = styled.div`
  text-align: center;
`;

const StatsNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 4px;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatsNumber = styled.span`
  font-size: 56px;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.english};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 48px;
  }
`;

const StatsUnit = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const StatsLabel = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
  margin: 8px 0 0 0;
`;

const ProgressContainer = styled.div`
  margin-top: 16px;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TextbookCardInner = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TextbookCard = motion(TextbookCardInner);

const TextbookCover = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 56px;
  }
`;

const TextbookTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin: 0 0 8px 0;
`;

const TextbookLevel = styled.span`
  background: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const TextbookDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
`;

const TextbookProgress = styled.div`
  width: 100%;
`;

const LessonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const LessonCardInner = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LessonCard = motion(LessonCardInner);

const LessonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const LessonThumbnail = styled.div`
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const LessonDetails = styled.div`
  flex: 1;
`;

const LessonTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  margin: 0 0 4px 0;
`;

const LessonStars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.warning};
`;

const LessonTime = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  margin: 4px 0 0 0;
`;

const ContinueButton = styled(Button)`
  font-size: 14px;
  padding: 8px 16px;
`;

const VirtualPet = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 20px;
    right: 20px;
  }
`;

const PetCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  min-width: 120px;
  cursor: pointer;
  user-select: none;
`;

const PetEmoji = styled(motion.div)`
  font-size: 48px;
  margin-bottom: 8px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 42px;
  }
`;

const PetName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const PetLevel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 8px;
`;

const ExpBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
`;

const ExpBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.success}, ${({ theme }) => theme.colors.warning});
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const ExpText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 4px;
  font-weight: 600;
`;

// Mock data
const mockTodayStats = {
  studyTime: 45,
  studyProgress: 75,
  completedContent: '已完成3页，还剩1页'
};

const mockRecentLessons = [
  {
    id: 'pu1-u9',
    title: 'My Clothes',
    thumbnail: '👔',
    starsEarned: 2,
    maxStars: 3,
    lastStudied: '2小时前',
    timeSpent: 25
  },
  {
    id: 'pu1-u8',
    title: 'My Food',
    thumbnail: '🍎',
    starsEarned: 3,
    maxStars: 3,
    lastStudied: '昨天',
    timeSpent: 30
  },
  {
    id: 'pu1-u7',
    title: 'Fruits',
    thumbnail: '🍓',
    starsEarned: 3,
    maxStars: 3,
    lastStudied: '3天前',
    timeSpent: 35
  }
];

// Mock progress data
const mockLearningProgress: Record<string, Array<{ lessonId: string; completedPages: number; totalPages: number }>> = {
  'power-up-1': [
    { lessonId: 'pu1-u1', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu1-u2', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu1-u3', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu1-u4', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu1-u5', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu1-u6', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu1-u7', completedPages: 3, totalPages: 3 },
  ],
  'power-up-2': [
    { lessonId: 'pu2-u1', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu2-u2', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu2-u3', completedPages: 4, totalPages: 4 },
    { lessonId: 'pu2-u4', completedPages: 2, totalPages: 4 },
    { lessonId: 'pu2-u5', completedPages: 0, totalPages: 4 },
  ]
};

// Helper Functions
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '早上好';
  if (hour < 18) return '下午好';
  return '晚上好';
};

// Animated Number Component
const AnimatedNumber = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(startValue + (value - startValue) * progress);
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

// Dashboard Component
const Dashboard = () => {
  const [petDancing, setPetDancing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger progress animation
    setTimeout(() => setProgress(mockTodayStats.studyProgress), 500);
  }, []);

  // Handlers
  const handleStarJarClick = () => {
    alert('🎉 你总共有42颗星星！继续加油！');
  };

  const handleTextbookClick = (textbook: any) => {
    alert(`即将进入 ${textbook.title} 详情页`);
  };

  const handleLessonClick = (lesson: any) => {
    alert(`继续学习：${lesson.title}`);
  };

  const handlePetClick = () => {
    setPetDancing(true);
    setTimeout(() => setPetDancing(false), 500);
  };

  // Render stars
  const renderStars = (earned: number, max: number) => {
    const stars = [];
    for (let i = 0; i < max; i++) {
      stars.push(
        <span key={i} style={{ opacity: i < earned ? 1 : 0.3 }}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Header>
          <Greeting>{getGreeting()}，小学习者！</Greeting>
          <StarJar onClick={handleStarJarClick}>
            <StarIcon>⭐</StarIcon>
            <StarCount>42</StarCount>
          </StarJar>
        </Header>
      </motion.div>

      {/* Today's Study Overview */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <Section>
          <SectionTitle>今日学习概况</SectionTitle>
          <StatsCard hoverable={false}>
            <StatsItem>
              <StatsNumberContainer>
                <StatsNumber>
                  <AnimatedNumber value={mockTodayStats.studyTime} />
                </StatsNumber>
                <StatsUnit>分钟</StatsUnit>
              </StatsNumberContainer>
              <StatsLabel>今日学习时长</StatsLabel>
            </StatsItem>
            <StatsItem>
              <ProgressContainer>
                <ProgressLabel>
                  <span>学习进度</span>
                  <span>{mockTodayStats.studyProgress}%</span>
                </ProgressLabel>
                <ProgressBar value={progress} animated gradient="green-yellow" showPercentage={false} />
              </ProgressContainer>
              <StatsLabel>{mockTodayStats.completedContent}</StatsLabel>
            </StatsItem>
          </StatsCard>
        </Section>
      </motion.div>

      {/* Textbook Grid */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <Section>
          <SectionTitle>我的教材</SectionTitle>
          <Grid>
            {textbooks.map((textbook) => {
              const textbookProgress = mockLearningProgress[textbook.id] || [];
              const completion = Math.round(textbookProgress.filter(p => p.completedPages === p.totalPages).length / textbook.totalLessons * 100);
              return (
                <TextbookCard
                  key={textbook.id}
                  onClick={() => handleTextbookClick(textbook)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextbookCover>{textbook.cover}</TextbookCover>
                  <TextbookTitle>{textbook.title}</TextbookTitle>
                  <TextbookLevel>{textbook.level}</TextbookLevel>
                  <TextbookDescription>{textbook.description}</TextbookDescription>
                  <TextbookProgress>
                    <ProgressLabel>
                      <span>完成进度</span>
                      <span>{completion}%</span>
                    </ProgressLabel>
                    <ProgressBar value={completion} animated gradient="primary" showPercentage={false} />
                  </TextbookProgress>
                </TextbookCard>
              );
            })}
          </Grid>
        </Section>
      </motion.div>

      {/* Recent Lessons */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <Section>
          <SectionTitle>最近学习单元</SectionTitle>
          <LessonsList>
            {mockRecentLessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                onClick={() => handleLessonClick(lesson)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <LessonInfo>
                  <LessonThumbnail>{lesson.thumbnail}</LessonThumbnail>
                  <LessonDetails>
                    <LessonTitle>{lesson.title}</LessonTitle>
                    <LessonStars>{renderStars(lesson.starsEarned, lesson.maxStars)}</LessonStars>
                    <LessonTime>最后学习：{lesson.lastStudied}</LessonTime>
                  </LessonDetails>
                </LessonInfo>
                <ContinueButton variant="primary">继续学习</ContinueButton>
              </LessonCard>
            ))}
          </LessonsList>
        </Section>
      </motion.div>

      {/* Virtual Pet */}
      <VirtualPet
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PetCard onClick={handlePetClick}>
          <PetEmoji
            key={petDancing ? 'dance' : 'idle'}
            initial={{ scale: 1 }}
            animate={petDancing ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.5, ease: "easeInOut" }
            } : { scale: 1 }}
          >
            🐱
          </PetEmoji>
          <PetName>Mochi</PetName>
          <PetLevel>Lv.3</PetLevel>
          <ExpBarContainer>
            <ExpBar initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 1, delay: 1.5 }} />
          </ExpBarContainer>
          <ExpText>75/100 EXP</ExpText>
        </PetCard>
      </VirtualPet>
    </Container>
  );
};

export default Dashboard;