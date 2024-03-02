'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from 'components/ui/dropdown';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCookie } from '~/lib/actions/cookies';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '../ui/dialog';

export default function AccountBtn() {
  const router = useRouter();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const handleOpenConfirmModal = () => {
    setOpenModal(true);
  };

  const handleLogout = async () => {
    let id_token = getCookie('id_token');
    await deleteCookie('access', 'hard');
    await deleteCookie('auth', 'hard');
    await deleteCookie('refresh', 'hard');
    await deleteCookie('id_token', 'hard');

    const link = `https://shopify.com/${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}/auth/logout?id_token_hint=${id_token}`;
    router.push(link);
  };

  return (
    <>
      <div className="relative z-40">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex">
            <p className="text-xs font-bold hover:text-neutral-500">My Account</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem className="hover:bg-neutral-100">
              <Link href="/account">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-neutral-100">
              <Link href="/account/address">Addresses</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-neutral-100">
              <Link href="/account/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-neutral-100">
              <button onClick={handleOpenConfirmModal}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ConfirmLogoutModal open={isOpenModal} setOpen={setOpenModal} callback={handleLogout} />
    </>
  );
}

const ConfirmLogoutModal = ({
  open,
  setOpen,
  callback
}: {
  open: boolean;
  setOpen: Function;
  callback: Function;
}) => {
  const [isPending, setPending] = useState<boolean>(false);

  const handleOpen = (e: boolean) => {
    if (!isPending) setOpen(e);
  };

  const handleCallback = async () => {
    setPending(true);
    await callback();
    setPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="w-96 bg-white">
        <DialogHeader>
          <DialogDescription className="text-base font-semibold">
            Are you sure you want to logout?
          </DialogDescription>
          <div className="flex flex-row justify-end space-x-3 pt-5">
            <Button
              onClick={() => handleOpen(false)}
              disabled={isPending}
              className="h-8 bg-white text-black hover:bg-black hover:text-white"
            >
              Cancel
            </Button>
            <Button disabled={isPending} className="h-8 " onClick={handleCallback}>
              Logout
              {isPending && <span className="loader ml-2 h-4 w-4" />}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
