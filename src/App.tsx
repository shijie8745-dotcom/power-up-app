import { useState } from 'react'
import './App.css'
import { Button, Card, ProgressBar, Tab, useToast } from './components/common'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  font-family: ${({ theme }) => theme.fonts.chinese};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 32px;
`

function App() {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const toast = useToast()

  const tabs = [
    {
      id: 'demo',
      label: '设计系统演示',
      content: (
        <div>
          <Card style={{ marginBottom: '24px' }}>
            <h2 style={{ marginBottom: '16px', color: 'inherit' }}>计数器示例</h2>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '48px', margin: '24px 0', color: 'inherit' }}>
                {count}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button onClick={() => setCount(count + 1)}>增加</Button>
                <Button variant="secondary" onClick={() => setCount(0)}>重置</Button>
              </div>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <h2 style={{ marginBottom: '16px', color: 'inherit' }}>进度条控制</h2>
            <ProgressBar value={progress} animated gradient="rainbow" />
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button size="small" onClick={() => setProgress(0)}>0%</Button>
              <Button size="small" onClick={() => setProgress(25)}>25%</Button>
              <Button size="small" onClick={() => setProgress(50)}>50%</Button>
              <Button size="small" onClick={() => setProgress(75)}>75%</Button>
              <Button size="small" onClick={() => setProgress(100)}>100%</Button>
            </div>
          </Card>

          <Card>
            <h2 style={{ marginBottom: '16px', color: 'inherit' }}>Toast 通知演示</h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="success" onClick={() => toast.success('操作成功！🎉')}>
                成功通知
              </Button>
              <Button onClick={() => toast.info('这是一条信息 💡')}>
                信息通知
              </Button>
              <Button variant="warning" onClick={() => toast.error('操作失败！😅')}>
                错误通知
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'about',
      label: '关于设计系统',
      content: (
        <Card>
          <h2 style={{ color: 'inherit', marginBottom: '16px' }}>设计系统特色</h2>
          <ul style={{ lineHeight: 1.8, paddingLeft: '20px' }}>
            <li>🎨 儿童友好的鲜艳色彩</li>
            <li>📱 完全的响应式设计</li>
            <li>✨ 流畅的动画效果</li>
            <li>♿ 良好的可访问性</li>
            <li>🎯 触摸友好的交互设计</li>
          </ul>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ color: 'inherit', marginBottom: '12px' }}>颜色系统</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ width: '80px', height: '80px', background: '#4A90E2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>主蓝</div>
              <div style={{ width: '80px', height: '80px', background: '#FFD93D', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C3E50', fontWeight: 'bold' }}>黄色</div>
              <div style={{ width: '80px', height: '80px', background: '#6BCB77', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>绿色</div>
            </div>
          </div>
        </Card>
      ),
    },
  ]

  return (
    <Container>
      <Title>🚀 Power Up App - 设计系统展示</Title>
      <Tab tabs={tabs} />
    </Container>
  )
}

export default App
