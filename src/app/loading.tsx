import React from 'react';

const Loading = () => {
  return (
    <div
      style={{ backgroundColor: '#222944E5' }}
      className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
      id="popupmodal"
    >
      <div className="relative p-4 w-full max-h-full">
        <div className="relative rounded-lg">
          <div className="flex justify-center gap-4">
            <img src="/smallloader.gif" alt="Loading icon" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
