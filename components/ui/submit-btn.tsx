'use client';

import clsx from 'clsx';
import { Button } from 'components/ui/button';
import { useFormStatus } from 'react-dom';

const SubmitBtn = ({ className }: { className?: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={clsx(pending && 'opacity-85', className)}
    >
      Submit
      {pending && <span className="loader ml-2 h-4 w-4" />}
    </Button>
  );
};
export default SubmitBtn;
