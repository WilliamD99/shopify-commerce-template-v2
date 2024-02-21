'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateCustomerAction } from '~/lib/actions/customer-action';
import SubmitBtn from '../ui/submit-btn';

const formSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(2).max(20).optional(),
  userId: z.string()
});

interface AccountEditFormProps {
  data: {
    id: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    emailAddress?: { emailAddress: string };
    phoneNumber?: { phoneNumber: string };
  } | null;
}

export default function AccountEditForm({ data }: AccountEditFormProps) {
  const [state, formAction] = useFormState(updateCustomerAction, {
    message: null
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      email: data?.emailAddress?.emailAddress ?? '',
      phone: data?.phoneNumber?.phoneNumber,
      userId: data?.id
    }
  });

  useEffect(() => {
    if (state.message) toast(state.message);
  }, [state]);

  return (
    <>
      <Form {...form}>
        <form action={formAction} className="space-y-4">
          <p className="text-lg font-semibold">Profile</p>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input placeholder="userId" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitBtn />
        </form>
      </Form>
    </>
  );
}
