import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function Field({ label, hint, children, htmlFor }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-app-fg">{label}</span>
      {children}
      {hint ? <span className="text-xs text-app-muted">{hint}</span> : null}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function TextInput({ invalid, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={[
        'w-full rounded-md border bg-app-surface px-2.5 py-1.5 text-sm text-app-fg shadow-sm outline-none transition',
        'focus:ring-2 focus:ring-app-accent/40 focus:border-app-accent',
        invalid
          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
          : 'border-app-border',
        className ?? '',
      ].join(' ')}
    />
  );
}

export function NumberInput(props: InputProps) {
  return <TextInput type="number" {...props} />;
}

interface HexInputProps {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  className?: string;
  id?: string;
  size?: 'sm' | 'md';
}

export function HexInput({
  value,
  onChange,
  invalid,
  className,
  id,
  size = 'md',
}: HexInputProps) {
  const digits = value.replace(/^#/, '');
  const sizeClasses =
    size === 'sm'
      ? { text: 'text-[10px]', padX: 'pl-1.5', padXEnd: 'pr-1.5', padY: 'py-0.5' }
      : { text: 'text-sm', padX: 'pl-2.5', padXEnd: 'pr-2.5', padY: 'py-1.5' };

  return (
    <div
      className={[
        'inline-flex w-full items-center rounded-md border bg-app-surface shadow-sm transition focus-within:ring-2',
        invalid
          ? 'border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500/30'
          : 'border-app-border focus-within:border-app-accent focus-within:ring-app-accent/40',
        className ?? '',
      ].join(' ')}
    >
      <span
        className={[
          'select-none text-app-muted',
          sizeClasses.padX,
          sizeClasses.text,
        ].join(' ')}
        aria-hidden
      >
        #
      </span>
      <input
        id={id}
        type="text"
        value={digits}
        maxLength={8}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        onChange={(e) => onChange('#' + e.target.value)}
        className={[
          'w-full min-w-0 bg-transparent text-app-fg outline-none',
          sizeClasses.padXEnd,
          sizeClasses.padY,
          sizeClasses.text,
        ].join(' ')}
      />
    </div>
  );
}
