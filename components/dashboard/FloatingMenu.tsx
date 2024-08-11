import React, { useState } from 'react';

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - lastPosition.x, y: e.clientY - lastPosition.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      <div
        className="fixed z-50"
        style={{ top: position.y, left: position.x }}
        onMouseDown={handleMouseDown}
      >
        <div
          className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
          onClick={handleToggleMenu}
        >
          <span className="text-white text-2xl">≡</span> {/* Icone de menu */}
        </div>

        {isOpen && (
          <div className="flex flex-col items-center mt-4 space-y-4">
            <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer">
              <span className="text-white">Opção 1</span>
            </div>
            <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer">
              <span className="text-white">Opção 2</span>
            </div>
            <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer">
              <span className="text-white">Opção 3</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingMenu;
