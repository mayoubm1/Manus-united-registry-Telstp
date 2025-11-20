import React from 'react';

export function Select({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function SelectTrigger({ children, ...props }) {
  return (
    <button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...props}>
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, ...props }) {
  return <span {...props}>{placeholder}</span>;
}

export function SelectContent({ children, ...props }) {
  return (
    <div className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md" {...props}>
      {children}
    </div>
  );
}

export function SelectItem({ value, children, ...props }) {
  return (
    <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" {...props}>
      {children}
    </div>
  );
}
