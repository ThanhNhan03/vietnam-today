import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, MessageCircle, Menu, X, Info, Brain } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'podcast', label: 'Podcast', icon: Home },
    { id: 'content', label: 'Nội Dung', icon: FileText },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'qa', label: 'Q&A', icon: MessageCircle },
    { id: 'about', label: 'Về chúng tôi', icon: Info },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        className="sidebar-mobile-toggle"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isOpen ? 'open' : 'closed'}`}
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo/Brand */}
        <div className="sidebar-header">
          <motion.div
            className="sidebar-logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="logo-icon">🎙️</div>
            <div className="logo-text">
              <h2>Việt Nam</h2>
              <h2>Thay Đổi</h2>
            </div>
          </motion.div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="nav-item-icon">
                  <Icon size={22} />
                </div>
                <span className="nav-item-label">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="nav-item-indicator"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <p className="footer-version">Version 1.0.0</p>
            <p className="footer-copyright">© 2025 VNTT</p>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          className="sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
