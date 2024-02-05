'use client';
import { SortFilterItem } from 'lib/constants';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'components/ui/select';

// import { FilterItem } from './item';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

// function FilterItemList({ list }: { list: ListItem[] }) {
//   const router = useRouter();
//   const pathName = usePathname();
//   const searchParams = useSearchParams();

//   const handleItemClick = (value: string) => {
//     console.log('test');
//     const params = new URLSearchParams(searchParams);
//     params.set('sort', value);

//     router.push(`${pathName}?${params}`, { scroll: false });
//   };

//   return (
//     <>
//       <SelectContent>
//         {list.map((item: ListItem, i) => (
//           // <FilterItem key={i} item={item} />
//           <SelectItem value={item.slug} onSelect={() => handleItemClick(item.slug)}>
//             {item.title}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </>
//   );
// }

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleValueChange = (val: string) => {
    if (val) {
      const params = new URLSearchParams(searchParams);
      params.set('sort', val);

      router.push(`${pathName}?${params}`, { scroll: false });
    } else {
      router.push(pathName);
    }
  };

  return (
    <>
      <nav className="flex w-72 flex-row items-center space-x-2">
        <p className="w flex-1 text-center">Sort By</p>
        {/* {title ? (
          <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
            {title}
          </h3>
        ) : null} */}
        <div className="flex-1">
          <Select onValueChange={(e: string) => handleValueChange(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            {/* <FilterItemList list={list} /> */}
            <SelectContent>
              {list.map((item, index) => (
                <SelectItem key={index} value={item.slug}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <ul className="md:hidden">
          <FilterItemDropdown list={list} />
        </ul> */}
      </nav>
    </>
  );
}
