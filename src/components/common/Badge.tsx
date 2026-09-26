import React from 'react';

export type BadgeVariant = 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info' 
  | 'neutral' 
  | 'purple'
  | 'active'
  | 'probation'
  | 'notice'
  | 'exited';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  const variantMap: Record<BadgeVariant, string> = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    // Lifecycle specific
    active: 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold',
    probation: 'bg-amber-50 text-amber-800 border border-amber-300 font-semibold',
    notice: 'bg-orange-50 text-orange-800 border border-orange-300 font-semibold',
    exited: 'bg-slate-100 text-slate-600 border border-slate-300 italic'
  };

  return (
    <span className={`inline-flex items-center rounded-full tracking-wide ${variantMap[variant]} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};
