'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import {
  deleteCustomerAddressAction,
  editCustomerAddressAction
} from '~/lib/actions/customer-action';
import provinces from '~/lib/seed-data/province';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import SubmitBtn from '../ui/submit-btn';

interface AccountAddressEditFormProps {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    countryCodeV2: string;
    province: string;
    provinceCode: string;
    zip: string;
  }[];
  defaultId: string;
}

const formSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  phone: z.string().min(2).max(20).optional(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zip: z.string(),
  zoneCode: z.string(),
  id: z.string(),
  isDefault: z.boolean().default(false).optional()
});

export default function AccountAddressEditForm({ data, defaultId }: AccountAddressEditFormProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const editParams = searchParams.get('edit');
  const index = editParams ? parseInt(editParams) : 0;
  let isOpen = typeof editParams === 'string';
  const currentAddress = data[index];

  const [state, formAction] = useFormState(editCustomerAddressAction, {
    message: null
  });
  const [isOpenConfirmModal, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: currentAddress?.firstName,
      lastName: currentAddress?.lastName,
      phone: currentAddress?.phone,
      address1: currentAddress?.address1 ?? '',
      address2: currentAddress?.address2,
      city: currentAddress?.city ?? '',
      zip: currentAddress?.zip ?? '',
      zoneCode: currentAddress?.provinceCode ?? '',
      id: currentAddress?.id!,
      isDefault: currentAddress?.id === defaultId
    }
  });

  const handleClose = (e: boolean) => {
    if (!e) {
      router.replace(pathName);
    }
  };

  const handleDelete = () => setOpen(true);

  const handleDeleteConfirm = async () => {
    let id = currentAddress?.id;
    if (!id) return;
    let res = await deleteCustomerAddressAction(id);
    if (res.message) toast(res.message);

    if (res.status === 200) {
      setOpen(false);
      router.replace(pathName);
    }
  };

  useEffect(() => {
    if (state.message) toast(state.message);
  }, [state]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white">
          <DialogTitle className="mb-3 text-xl">Edit Address</DialogTitle>
          <Form {...form}>
            <form action={formAction} className="space-y-4">
              <FormField
                name="id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <Input {...field} />
                  </FormItem>
                )}
              />
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
              <div className="flex items-center justify-between">
                <div>
                  <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0">
                        <FormLabel className="mr-2 text-xs">Set as default</FormLabel>
                        <FormControl className="">
                          <>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            <Input
                              value={String(field.value)}
                              name={field.name}
                              className="hidden"
                            />
                          </>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row space-x-3">
                  <Button
                    type="button"
                    className="bg-white text-red-500 transition hover:bg-red-500 hover:text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <SubmitBtn className="" />
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <ConfirmModal open={isOpenConfirmModal} setOpen={setOpen} callback={handleDeleteConfirm} />
    </>
  );
}

function ConfirmModal({
  open,
  setOpen,
  callback
}: {
  open: boolean;
  setOpen: Function;
  callback: Function;
}) {
  const [isPending, setPending] = useState<boolean>(false);

  const handleCallback = useCallback(async () => {
    setPending(true);
    await callback();
    setPending(false);
  }, [callback]);

  const handleOpen = (e: boolean) => {
    if (!isPending) setOpen(e);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="mb-3">Delete Delivery Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address? This action cannot be undone
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row justify-end space-x-3">
            <Button
              onClick={() => handleOpen(false)}
              disabled={isPending}
              className="bg-white text-black hover:bg-black hover:text-white"
            >
              Cancel
            </Button>
            <Button disabled={isPending} className="" onClick={handleCallback}>
              Delete
              {isPending && <span className="loader ml-2 h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
