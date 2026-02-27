// Simple React app without styled-components
import './App.css';

export const SimpleApp = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>简单测试应用</h1>
      <p style={{ textAlign: 'center', fontSize: '18px' }}>不使用 styled-components</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button style={{
          background: '#4A90E2',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          测试按钮
        </button>
      </div>
    </div>
  );
};
