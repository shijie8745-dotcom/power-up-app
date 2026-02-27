import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import type { Badge as BadgeType } from '../types';
import { Card, ProgressBar } from '../components/common';
import { studyStats, badges as initialBadges, userLevel, learningPet as petData } from '../data';

// 扩展徽章数据，确保有12个
const allBadges = [...initialBadges];
if (allBadges.length < 12) {
  const additionalBadges = [
    {
      id: 'badge-speed-learner',
      name: 'Speed Learner',
      description: '1小时完成3个单元',
      icon: '⚡',
      unlocked: false,
      requirement: 'Complete 3 lessons in 1 hour',
    },
    {
      id: 'badge-night-owl',
      name: 'Night Owl',
      description: '晚上8点后学习10次',
      icon: '🦉',
      unlocked: false,
      requirement: 'Study 10 times after 8 PM',
    },
    {
      id: 'badge-early-bird',
      name: 'Early Bird',
      description: '早上6点前学习10次',
      icon: '🐦',
      unlocked: false,
      requirement: 'Study 10 times before 6 AM',
    },
    {
      id: 'badge-champion',
      name: 'Champion',
      description: '收集100颗星星',
      icon: '👑',
      unlocked: false,
      requirement: 'Collect 100 stars',
    },
  ];
  allBadges.push(...additionalBadges);
}

// 动画变体
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const cardVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
    },
  },
} as const;

const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 10,
    },
  },
} as const;

// 使用styled-components创建样式
const Container = styled(motion.div)`
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fonts.chinese};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.green});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const StatIcon = styled.div<{ color: string }>`
  font-size: 48px;
  margin-bottom: 16px;
  position: relative;

  ${({ color }) => color && `
    filter: drop-shadow(0 0 8px ${color});
  `}
`;

const StatValue = styled(motion.div)`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.english};
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 36px;
  }
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 600;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
`;

const ChartContainer = styled(Card)`
  padding: 24px;
`;

const Chart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  gap: 12px;
  padding: 20px 0;
`;

const BarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const Bar = styled(motion.div)<{ height: number; isMax: boolean }>`
  width: 100%;
  background: ${({ isMax, theme }) => isMax ? theme.colors.primary : theme.colors.green};
  border-radius: ${({ theme }) => theme.borderRadius.small} ${({ theme }) => theme.borderRadius.small} 0 0;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  box-shadow: ${({ isMax, theme }) => isMax ? `0 4px 12px ${theme.colors.primary}40` : 'none'};

  &:hover {
    background: ${({ isMax, theme }) => isMax ? theme.colors.primary : theme.colors.yellow};
    transform: scaleY(1.05);
  }
`;

const BarLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 8px;
  text-align: center;
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: -40px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 14px;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid ${({ theme }) => theme.colors.text};
  }
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

const Badge = styled(motion.div)<{ unlocked: boolean }>`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.small};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 2px solid ${({ unlocked, theme }) => unlocked ? theme.colors.yellow : theme.colors.lightGray};

  ${({ unlocked, theme }) => unlocked && `
    background: linear-gradient(135deg, ${theme.colors.yellow}, ${theme.colors.primary});
    box-shadow: 0 4px 16px ${theme.colors.yellow}40;
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ unlocked, theme }) => unlocked ? theme.shadows.large : theme.shadows.medium};
  }
`;

const BadgeIcon = styled.div<{ unlocked: boolean }>`
  font-size: 32px;
  margin-bottom: 4px;

  ${({ unlocked }) => unlocked && `
    animation: glow 2s ease-in-out infinite alternate;

    @keyframes glow {
      from { filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5)); }
      to { filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9)); }
    }
  `}
`;

const BadgeName = styled.div<{ unlocked: boolean }>`
  font-size: 10px;
  font-weight: ${({ unlocked }) => unlocked ? 700 : 600};
  color: ${({ unlocked, theme }) => unlocked ? theme.colors.white : theme.colors.gray};
  text-align: center;
  text-shadow: ${({ unlocked }) => unlocked ? '1px 1px 2px rgba(0,0,0,0.2)' : 'none'};
`;

const LevelCard = styled(Card)`
  position: relative;
  overflow: hidden;
`;

const LevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Level = styled(motion.div)`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.green});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ExpInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 16px;
`;

const Reward = styled(motion.div)`
  margin-top: 20px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const PetCard = styled(Card)`
  text-align: center;
`;

const PetIcon = styled(motion.div)`
  font-size: 80px;
  margin-bottom: 16px;
  display: inline-block;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

const PetName = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const PetLevel = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 4px;
`;

const PetExp = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 12px;
`;

const PetMood = styled(motion.div)<{ mood: string }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ mood, theme }) => {
    switch (mood) {
      case 'happy': return theme.colors.success;
      case 'normal': return theme.colors.warning;
      case 'hungry': return theme.colors.error;
      default: return theme.colors.gray;
    }
  }};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: inline-block;
  font-weight: 600;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 32px;
  max-width: 400px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.large};
  text-align: center;
`;

const ModalIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const ModalDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 16px;
`;

const ModalDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const ModalRequirement = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
`;

// 日期格式化函数
const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 动画计数器组件
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{count}</>;
};

const Stats = () => {
  const [selectedBadge, setSelectedBadge] = useState<(BadgeType & { unlocked?: boolean }) | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // 准备图表数据（最近7天）
  const chartData = studyStats.dailyStudyTime.slice(-7);
  const maxValue = Math.max(...chartData.map(d => d.minutes));

  // 计算升级到下一级需要的经验
  const expToNextLevel = Math.max(0, userLevel.maxExp - userLevel.currentExp);

  // 获取宠物心情文本
  const getMoodText = (mood: string) => {
    switch (mood) {
      case 'happy': return '开心 😊';
      case 'normal': return '一般 😐';
      case 'hungry': return '饥饿 😋';
      default: return '开心 😊';
    }
  };

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Header>
        <Title>📊 学习统计</Title>
        <Subtitle>查看你的学习成果和成就</Subtitle>
      </Header>

      {/* 顶部概览 */}
      <Grid>
        <motion.div variants={cardVariants}>
          <StatCard hoverable={true}>
            <StatIcon color="#4A90E2">⏱️</StatIcon>
            <StatValue>
              <AnimatedCounter value={studyStats.totalStudyTime} />
            </StatValue>
            <StatLabel>总学习时长（分钟）</StatLabel>
          </StatCard>
        </motion.div>

        <motion.div variants={cardVariants}>
          <StatCard hoverable={true}>
            <StatIcon color="#FFD93D">⭐</StatIcon>
            <StatValue>
              <AnimatedCounter value={userLevel.totalStars} />
            </StatValue>
            <StatLabel>总获得星星</StatLabel>
          </StatCard>
        </motion.div>

        <motion.div variants={cardVariants}>
          <StatCard hoverable={true}>
            <StatIcon color="#E74C3C">🔥</StatIcon>
            <StatValue>
              <AnimatedCounter value={studyStats.streakDays} />
            </StatValue>
            <StatLabel>连续学习天数</StatLabel>
          </StatCard>
        </motion.div>
      </Grid>

      {/* 学习时长图表 */}
      <Section>
        <motion.div variants={cardVariants}>
          <ChartContainer>
            <SectionTitle>📈 学习时长趋势</SectionTitle>
            <Chart>
              {chartData.map((data, index) => {
                const isMax = data.minutes === maxValue;
                const barHeight = (data.minutes / maxValue) * 100;

                return (
                  <BarContainer
                    key={data.date}
                    onMouseEnter={() => setHoveredBar(data.date)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <Bar
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeight}%` }}
                      transition={{
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 100,
                        damping: 20,
                      }}
                      height={barHeight}
                      isMax={isMax}
                    />
                    <AnimatePresence>
                      {hoveredBar === data.date && (
                        <Tooltip
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          {data.minutes} 分钟
                        </Tooltip>
                      )}
                    </AnimatePresence>
                    <BarLabel>
                      {new Date(data.date).toLocaleDateString('zh-CN', { weekday: 'short' })}
                    </BarLabel>
                  </BarContainer>
                );
              })}
            </Chart>
          </ChartContainer>
        </motion.div>
      </Section>

      {/* 成就徽章墙 */}
      <Section>
        <motion.div variants={cardVariants}>
          <Card>
            <SectionTitle>🏆 成就徽章</SectionTitle>
            <BadgeGrid>
              {allBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedBadge({ ...badge, unlocked: badge.unlocked })}
                >
                  <Badge unlocked={badge.unlocked}>
                    <BadgeIcon unlocked={badge.unlocked}>
                      {badge.icon}
                    </BadgeIcon>
                    <BadgeName unlocked={badge.unlocked}>
                      {badge.name}
                    </BadgeName>
                  </Badge>
                </motion.div>
              ))}
            </BadgeGrid>
          </Card>
        </motion.div>
      </Section>

      {/* 等级和经验条 */}
      <Grid style={{ gridTemplateColumns: '1fr 1fr' }}>
        <motion.div variants={cardVariants}>
          <LevelCard>
            <SectionTitle>📈 等级进度</SectionTitle>
            <LevelHeader>
              <Level
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  delay: 0.5,
                  stiffness: 300,
                  damping: 20,
                }}
              >
                L{userLevel.currentLevel}
              </Level>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ fontSize: '18px', color: '#666' }}
              >
                → L{userLevel.currentLevel + 1}
              </motion.div>
            </LevelHeader>
            <ExpInfo>
              <span>经验值</span>
              <span>{userLevel.currentExp} / {userLevel.maxExp}</span>
            </ExpInfo>
            <ProgressBar
              value={userLevel.currentExp}
              max={userLevel.maxExp}
              animated={true}
              gradient="rainbow"
              showPercentage={true}
            />
            <AnimatePresence>
              {expToNextLevel > 0 && (
                <Reward
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <strong>🌟 升级奖励：</strong><br />
                  升级到 L{userLevel.currentLevel + 1} 需要 {expToNextLevel} 经验<br />
                  解锁新宠物、新教材和游戏模式！
                </Reward>
              )}
            </AnimatePresence>
          </LevelCard>
        </motion.div>

        {/* 虚拟宠物状态 */}
        <motion.div variants={cardVariants}>
          <PetCard>
            <SectionTitle>🐾 虚拟宠物</SectionTitle>
            <PetIcon
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {petData.emoji}
            </PetIcon>
            <PetName>{petData.name}</PetName>
            <PetLevel>Lv.{petData.level}</PetLevel>
            <PetExp>{petData.experience} / 100 EXP</PetExp>
            <ProgressBar
              value={petData.experience}
              max={100}
              animated={true}
              gradient="primary"
              showPercentage={true}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <PetMood
                mood={petData.mood}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                心情：{getMoodText(petData.mood)}
              </PetMood>
            </motion.div>
          </PetCard>
        </motion.div>
      </Grid>

      {/* 徽章详情弹窗 */}
      <AnimatePresence>
        {selectedBadge && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalIcon>{selectedBadge.icon}</ModalIcon>
              <ModalTitle>{selectedBadge.name}</ModalTitle>
              {selectedBadge.unlockedAt && (
                <ModalDate>获得时间：{formatDate(selectedBadge.unlockedAt)}</ModalDate>
              )}
              <ModalDescription>{selectedBadge.description}</ModalDescription>
              {selectedBadge.requirement && (
                <ModalRequirement>
                  <strong>解锁条件：</strong><br />
                  {selectedBadge.requirement}
                </ModalRequirement>
              )}
              {!selectedBadge.unlocked && (
                <div style={{ marginTop: '20px', color: '#E74C3C', fontWeight: 'bold' }}>
                  🔒 未解锁
                </div>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Stats;