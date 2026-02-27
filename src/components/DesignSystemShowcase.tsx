import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import {
  Button,
  Card,
  ProgressBar,
  Tab,
  ToastProvider,
  useToast,
} from './common';

const DesignSystemShowcase: React.FC = () => {
  const [progress, setProgress] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div style={{ padding: '24px', background: theme.colors.background, minHeight: '100vh' }}>
          <ShowcaseContent setProgress={setProgress} progress={progress} />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
};

const ShowcaseContent: React.FC<{
  progress: number;
  setProgress: (value: number) => void;
}> = ({ progress, setProgress }) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('button');

  const tabs = [
    {
      id: 'button',
      label: '按钮组件',
      content: <ButtonShowcase />,
    },
    {
      id: 'card',
      label: '卡片组件',
      content: <CardShowcase />,
    },
    {
      id: 'progress',
      label: '进度条组件',
      content: (
        <ProgressShowcase
          progress={progress}
          setProgress={setProgress}
        />
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ color: theme.colors.text, fontFamily: theme.fonts.chinese, marginBottom: '32px' }}>
        设计系统展示
      </h1>

      <Card>
        <h2 style={{ marginBottom: '24px', color: theme.colors.primary }}>Toast 通知演示</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            variant="success"
            onClick={() => toast.success('操作成功！')}
          >
            成功通知
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.info('这是一条提示信息')}
          >
            信息通知
          </Button>
          <Button
            variant="warning"
            onClick={() => toast.error('操作失败！')}
          >
            错误通知
          </Button>
        </div>
      </Card>

      <div style={{ marginTop: '32px' }}>
        <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

const ButtonShowcase: React.FC = () => {
  return (
    <div>
      <h3 style={{ marginBottom: '24px' }}>按钮样式</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary">主要按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="success">成功按钮</Button>
        <Button variant="warning">警告按钮</Button>
        <Button disabled>禁用按钮</Button>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '24px' }}>全宽按钮（移动端适配）</h3>
        <Button fullWidth variant="primary">
          全宽按钮
        </Button>
      </div>
    </div>
  );
};

const CardShowcase: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Card hoverable>
          <h3 style={{ color: theme.colors.primary }}>可点击卡片</h3>
          <p style={{ marginTop: '12px', lineHeight: 1.6 }}>
            这张卡片有悬停和点击效果，适合用于交互式内容。
          </p>
        </Card>

        <Card>
          <h3 style={{ color: theme.colors.success }}>静态卡片</h3>
          <p style={{ marginTop: '12px', lineHeight: 1.6 }}>
            这张卡片是静态的，没有交互效果，适合展示信息。
          </p>
        </Card>

        <Card padding="32px" hoverable>
          <h3 style={{ color: theme.colors.warning }}>自定义内边距</h3>
          <p style={{ marginTop: '12px', lineHeight: 1.6 }}>
            这张卡片使用了自定义的内边距，适合需要更多空间的内容。
          </p>
        </Card>
      </div>
    </div>
  );
};

const ProgressShowcase: React.FC<{
  progress: number;
  setProgress: (value: number) => void;
}> = ({ progress, setProgress }) => {
  return (
    <div>
      <h3 style={{ marginBottom: '24px' }}>进度条样式</h3>

      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ marginBottom: '12px' }}>默认进度条</h4>
        <ProgressBar value={progress} animated />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ marginBottom: '12px' }}>彩虹渐变</h4>
        <ProgressBar value={progress} gradient="rainbow" animated />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ marginBottom: '12px' }}>绿黄渐变</h4>
        <ProgressBar value={progress} gradient="green-yellow" animated={false} />
      </div>

      <Card>
        <h4 style={{ marginBottom: '16px' }}>控制进度</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => setProgress(0)}>0%</Button>
          <Button onClick={() => setProgress(25)}>25%</Button>
          <Button onClick={() => setProgress(50)}>50%</Button>
          <Button onClick={() => setProgress(75)}>75%</Button>
          <Button onClick={() => setProgress(100)}>100%</Button>
        </div>
      </Card>
    </div>
  );
};

export default DesignSystemShowcase;