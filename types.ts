import React from 'react';

export enum WindowId {
  PROFILE = 'profile',
  STATS = 'stats',
  TERMINAL = 'terminal',
  MEDIA = 'media',
  ABOUT = 'about',
  PROJECTS = 'projects',
  GAME = 'game',
  RESUME = 'resume',
  CONTACT = 'contact',
  INBOX = 'inbox'
}

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: React.ElementType;
  position?: { x: number; y: number };
  size?: { width: number | string; height: number | string };
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
}

export interface Lead {
  name: string;
  email: string;
  whatsapp: string;
  brief: string;
  timestamp: string;
}