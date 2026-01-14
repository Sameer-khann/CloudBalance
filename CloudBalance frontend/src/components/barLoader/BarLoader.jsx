// import React from 'react';


const BarLoader = ({ size = 'md', message = 'Loading data...' }) => {
  const sizes = {
    sm: { width: 'w-1.5', maxHeight: 'h-8', gap: 'gap-1' },
    md: { width: 'w-2', maxHeight: 'h-12', gap: 'gap-1.5' },
    lg: { width: 'w-3', maxHeight: 'h-16', gap: 'gap-2' }
  };

  const { width, maxHeight, gap } = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`flex ${gap} items-end ${maxHeight}`}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`${width} bg-blue-500 rounded-sm`}
            style={{
              animation: `barPulse 1.2s ease-in-out ${index * 0.15}s infinite`,
              height: '40%'
            }}
          />
        ))}
      </div>
      {message && (
        <p className="mt-4 text-sm text-gray-600 font-medium">{message}</p>
      )}
      <style>{`
        @keyframes barPulse {
          0%, 100% {
            height: 40%;
            opacity: 0.6;
          }
          50% {
            height: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export const InlineLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <BarLoader size="md" message={message} />
    </div>
  );
};

export default BarLoader;