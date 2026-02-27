// Minimal test component to isolate styled-components issue
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Button = styled.button`
  background: #4A90E2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
`;

export const TestApp = () => {
  return (
    <Container>
      <Title>最小测试应用</Title>
      <p>如果 styled-components 正常工作，你应该看到这个。</p>
      <Button>测试按钮</Button>
    </Container>
  );
};
