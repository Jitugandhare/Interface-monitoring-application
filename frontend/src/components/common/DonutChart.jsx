import React, { useEffect, useRef } from 'react';

const DonutChart = ({ data, total }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const innerRadius = 50;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = {
      Success: '#10B981',
      Failure: '#EF4444',
      Warning: '#F59E0B'
    };

    let currentAngle = -Math.PI / 2;

    Object.entries(data).forEach(([status, value]) => {
      if (value > 0) {
        const sliceAngle = (value / total) * 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = colors[status];
        ctx.fill();

        currentAngle += sliceAngle;
      }
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Total label
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY - 5);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Total', centerX, centerY + 15);

  }, [data, total]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={200} height={200} className="mb-4" />
      <div className="flex space-x-4 text-sm">
        {Object.entries(data).map(([status, value]) => {
          const colors = {
            Success: 'bg-green-500',
            Failure: 'bg-red-500',
            Warning: 'bg-yellow-500'
          };
          return (
            <div key={status} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${colors[status]} mr-2`}></div>
              <span className="text-gray-700">{status}: {value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonutChart;
