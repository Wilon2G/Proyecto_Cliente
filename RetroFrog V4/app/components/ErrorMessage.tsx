import classNames from 'classnames';
import { HTMLAttributes } from 'react';

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return props.children ? (
    <p {...props} className={classNames('text-red-600 text-base', className)} />
  ) : null;
}
