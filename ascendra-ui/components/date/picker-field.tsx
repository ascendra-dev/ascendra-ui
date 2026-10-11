'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';
import { LuCalendar } from 'react-icons/lu';
import { cn } from '@/ascendra-ui/shadcn';
import { PickerClearButton } from '@/ascendra-ui/components/date/picker-clear-button';

/** The field look shared by both pickers' triggers — the button form and the editable form. */
export function pickerFieldClass({
  invalid,
  readOnly,
  empty,
  editable,
  disabled,
}: {
  invalid?: boolean;
  readOnly?: boolean;
  empty?: boolean;
  editable?: boolean;
  disabled?: boolean;
}) {
  const focus = editable
    ? 'focus-within:outline-primary! focus-within:outline-2! focus-within:outline-offset-1!'
    : 'focus-visible:outline-primary! focus-visible:outline-2! focus-visible:outline-offset-1!';
  return cn(
    'flex h-8 w-full items-center gap-2 rounded-[.375rem] px-3 text-left text-sm transition',
    'ring-1',
    'shadow-[0_2px_2px_-1px_rgba(0,0,0,0.06),0_4px_4px_-2px_rgba(0,0,0,0.04)]',
    'dark:shadow-[0_2px_2px_-1px_rgba(0,0,0,0.16),0_4px_4px_-2px_rgba(0,0,0,0.24)]',
    'disabled:cursor-not-allowed disabled:opacity-40',
    disabled && 'cursor-not-allowed opacity-40',
    invalid && 'outline-2 outline-destructive outline-offset-1',
    empty && !editable && 'text-gray-500 dark:text-gray-700',
    readOnly
      ? ['bg-gray-100 dark:bg-white/5', 'ring-gray-300 dark:ring-white/10', 'shadow-none', 'cursor-default', 'focus-visible:outline-none']
      : [
          'bg-white dark:bg-secondary',
          'ring-(--color-umbra)/12 dark:ring-(--color-gray-1000)/88 dark:ring-inset',
          'hover:ring-(--color-umbra)/24',
          focus,
        ]
  );
}

interface EditableDateFieldProps {
  id?: string;
  /** The stored value as text — shown whenever the user isn't mid-edit. */
  committedText: string;
  /**
   * Typed text on blur/Enter. Rejecting it is just not changing the value — the draft is dropped
   * either way, so the field shows committedText (the last valid value) again.
   */
  onCommitText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  className?: string;
  clearVisible: boolean;
  onClear: () => void;
  slot: string;
}

/**
 * The `editable` form of a date picker trigger: a text input to type into, plus a calendar button
 * (the only thing that opens the popover, so typing is never interrupted). Must render inside the
 * picker's Popover Root — the wrapper is the popover's anchor.
 */
export function EditableDateField({
  id,
  committedText,
  onCommitText,
  onBlur,
  placeholder,
  disabled,
  readOnly,
  invalid,
  className,
  clearVisible,
  onClear,
  slot,
}: EditableDateFieldProps) {
  // null = not editing, so the field shows committedText and follows calendar picks and clears.
  const [draft, setDraft] = React.useState<string | null>(null);

  const commit = () => {
    if (draft === null) return;
    if (draft !== committedText) onCommitText(draft);
    setDraft(null);
  };

  return (
    <PopoverPrimitive.Anchor asChild>
      <div
        data-slot={slot}
        data-editable=""
        aria-invalid={invalid || undefined}
        className={cn(pickerFieldClass({ invalid, readOnly, editable: true, disabled }), 'cursor-text pr-1.5', className)}
      >
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={draft ?? committedText}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={invalid || undefined}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            commit();
            onBlur?.();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commit();
            } else if (e.key === 'Escape' && draft !== null) {
              e.preventDefault();
              setDraft(null);
            }
          }}
          className="placeholder:text-gray-500 dark:placeholder:text-gray-700 min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed"
        />
        {clearVisible && <PickerClearButton onClear={onClear} />}
        {!readOnly && (
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              aria-label="Open calendar"
              disabled={disabled}
              className="text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 -my-0.5 flex shrink-0 items-center justify-center rounded-sm p-1 disabled:pointer-events-none"
            >
              <LuCalendar className="size-4" />
            </button>
          </PopoverPrimitive.Trigger>
        )}
      </div>
    </PopoverPrimitive.Anchor>
  );
}
