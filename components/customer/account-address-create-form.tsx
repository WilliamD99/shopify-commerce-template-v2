'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogTitle } from 'components/ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { addCustomerAddressAction } from '~/lib/actions/customer-action';
import provinces from '~/lib/seed-data/province';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import SubmitBtn from '../ui/submit-btn';

const formSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  phone: z.string().min(2).max(20).optional(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zip: z.string(),
  zoneCode: z.string()
});

export default function AccountAddressCreateForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(addCustomerAddressAction, {
    message: null
  });

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address1: '',
      address2: '',
      city: '',
      firstName: '',
      lastName: '',
      phone: '',
      zip: '',
      zoneCode: ''
    }
  });

  useEffect(() => {
    if (state.message) toast(state.message);
    if (state.status === 200) {
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  // If close the modal, reset all the input field
  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button className="float-right my-5 h-8 text-sm" onClick={() => setOpen(true)}>
          Add Address
        </Button>
        <DialogContent className="bg-white">
          <DialogTitle className="mb-3 text-xl">Add Address</DialogTitle>
          <Form {...form}>
            <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="h-10">
                        <Input required placeholder="First Name*" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="h-10">
                        <Input required placeholder="Last Name*" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="h-10">
                      <Input required placeholder="Street Address*" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="h-10">
                      <Input placeholder="Apt, Suite, Building" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="h-10">
                        <Input required placeholder="City" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zoneCode"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        required
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-neutral-400">
                            <SelectValue placeholder="Province*" />
                            {/* Not sure why the form needed this hidden field to send the data to server */}
                            <Input className="hidden" {...field} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="overflow-auto bg-white ">
                          {provinces.map((province) => (
                            <SelectItem key={province.code} value={province.code}>
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="h-10">
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="h-10">
                      <Input required placeholder="Phone*" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <SubmitBtn className="float-right" />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
