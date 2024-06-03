'use client';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation } from '../../constant';
import Hamburger from '../../public/hamburger.svg';
import logo from '../../public/LOGO.png';
 
function MobNav() {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px] z-50">
      <div className="flex flex-col md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Image
              src={Hamburger}
              width={40}
              height={40}
              alt="hamburger"
              className="cursor-pointer sm:hidden"
              loading="lazy"
            />
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#CF102D] border-gray-700">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src={logo}
                width={48}
                height={48}
                alt="logo"
                className="bg-white w-12"
                loading='lazy'
              />
              
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
              <SheetClose asChild>
                <section className="flex h-full flex-col gap-6 pt-16 text-google-blue">
                  <div className="flex flex-1 flex-col gap-6">
                    {navigation.map((link) => {
                      const isActive = pathname === link.route;
                      return (
                        <SheetClose asChild key={link.route}>
                          <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                              'bg-google-red text-white': isActive,
                            })}
                          >
                            <p className="font-semibold text-[18px]">{link.title}</p>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </section>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}

export default MobNav;