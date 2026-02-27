import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const slideIn = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100px);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 32px;
    left: 16px;
    right: 16px;
    transform: none;
  }
`;

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case 'success':
      return css`
        background: ${({ theme }) => theme.colors.success};
        border-left: 4px solid #219a52;
      `;
    case 'error':
      return css`
        background: ${({ theme }) => theme.colors.error};
        border-left: 4px solid #c0392b;
      `;
    case 'info':
      return css`
        background: ${({ theme }) => theme.colors.primary};
        border-left: 4px solid #3a7bc8;
      `;
  }
};

const ToastItemStyled = styled.div<{ type: ToastType; exiting?: boolean }>`
  ${({ type }) => getToastStyles(type)}

  color: ${({ theme }) => theme.colors.white};
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.large};
  font-family: ${({ theme }) => theme.fonts.chinese};
  font-size: 14px;
  font-weight: 500;
  max-width: 400px;
  width: 100%;
  pointer-events: auto;
  animation: ${({ exiting }) => (exiting ? slideOut : slideIn)} 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
    padding: 18px 24px;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const Message = styled.span`
  flex: 1;
  line-height: 1.4;
`;

const ToastItemComponent: React.FC<{
  toast: ToastItem;
  onClose: (id: string) => void;
}> = ({ toast, onClose }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onClose(toast.id), 300);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
    }
  };

  return (
    <ToastItemStyled type={toast.type} exiting={exiting}>
      <Icon>{getIcon(toast.type)}</Icon>
      <Message>{toast.message}</Message>
    </ToastItemStyled>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((
    message: string,
    type: ToastType = 'info',
    duration = 3000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastItem = {
      id,
      message,
      type,
      duration,
    };
    setToasts(prev => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const contextValue: ToastContextValue = {
    showToast,
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    info: (message, duration) => showToast(message, 'info', duration),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer>
        {toasts.map(toast => (
          <ToastItemComponent
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;