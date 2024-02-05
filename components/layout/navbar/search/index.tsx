'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { debounce } from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { FocusEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Product } from 'lib/shopify/types';
import CommandMenu from './command-menu';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for command menu
  const [openCmdMenu, setOpenCmdMenu] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>(searchParams?.get('q') || '');
  const [searchResult, setSearchResult] = useState<Product[] | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cmdMenuRef = useRef<HTMLDivElement>(null);

  const handleSearchIconClick = async () => {
    if (!textInput || textInput === '') {
      inputRef.current?.focus();
      setOpenCmdMenu(!openCmdMenu);
    } else {
      router.push(`/search?q=${textInput}`);
    }
  };

  const handleTextInput = useCallback(
    debounce(async (e: string) => {
      setTextInput(e);
      if (e.length >= 3) {
        setLoading(true);
        let res = await fetch(`/api/search/product?search=${e}&limit=5`, { method: 'GET' });
        let data = await res.json();
        setSearchResult(data);
      } else {
        setSearchResult(undefined);
      }
    }, 500),
    [isLoading, searchResult]
  );

  const handleFormBlur = useCallback(
    (e: FocusEvent<HTMLFormElement>) => {
      const { relatedTarget } = e;
      let isContained = cmdMenuRef.current?.contains(relatedTarget);
      if (!(relatedTarget && isContained)) {
        setShow(false);
      }
    },
    [show]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${textInput}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [searchResult]);

  useEffect(() => {
    setShow(false);
  }, [searchParams]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocus={() => setShow(true)}
      onBlur={handleFormBlur}
      className="w-max-[150px] relative lg:w-64"
    >
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 cursor-pointer" onClick={handleSearchIconClick} />
      </div>
      <input
        ref={inputRef}
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Search"
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        onChange={(e) => handleTextInput(e.target.value)}
        className="w-full rounded-3xl border bg-neutral-200 px-4 py-2 text-sm text-black placeholder:font-semibold placeholder:text-neutral-400 focus:outline-none"
      />
      <CommandMenu
        ref={cmdMenuRef}
        show={show}
        isLoading={isLoading}
        input={textInput}
        data={searchResult}
      />
    </form>
  );
}
