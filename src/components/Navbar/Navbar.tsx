import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useLanguage } from "../../contexts/LanguageContext";
import { LanguageSwitcher } from "../LanguageSwitcher";

export const Navbar = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.services'), href: "/services" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.blog'), href: "/blog" },
    { label: t('nav.contact'), href: "/contact" },
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="w-full bg-transparent absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex flex-row items-center group">
              <img 
                src="/logo.svg" 
                alt="HOLYLABS" 
                className="w-8 h-8 me-3 transition-transform duration-300 group-hover:rotate-90" 
              />
              <span className="text-[23px] font-medium text-black tracking-[-0.69px]">
                HOLYLABS
              </span>
            </Link>
          </div>  

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-auto justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center justify-center gap-[30px] rounded-[10px] px-7 py-[15px] bg-white/80 backdrop-blur-sm shadow-[0px_1.5px_1.3px_#e5e5e5,0px_0px_0px_1px_#f6f6f6]">
                {menuItems.map((item, index) => (
                  <NavigationMenuItem key={index} className="relative">
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className={`font-medium text-sm leading-[18px] whitespace-nowrap hover:text-black transition-colors pb-1 relative ${
                          isActiveRoute(item.href) ? "text-black font-semibold" : "text-[#4f4f4f ]"
                        }`}
                      >
                        {item.label}
                        {isActiveRoute(item.href) && (
                          <div 
                            className="absolute -bottom-[15px] left-0 right-0 h-0.5 rounded-full"
                            style={{ backgroundColor: '#389CFF' }}
                          />
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden md:flex flex-1 items-center gap-3 justify-end">
            <LanguageSwitcher />
            <Link to="/contact">
              <Button variant="cta-secondary" size="cta">
                <span className="flex items-center gap-2 ">
                  {t('nav.contact')}
                  {' '}
                  <ArrowRightIcon className="w-4 h-4 -rotate-45" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-4 rounded-md border-0 "
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-7 w-7" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 rounded-lg mx-4 mb-4 bg-white/90 backdrop-blur-sm">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium hover:bg-white/50 rounded-lg transition-colors relative ${
                    isActiveRoute(item.href) ? "text-black font-semibold" : "text-[#4f4f4f] hover:text-black"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {isActiveRoute(item.href) && (
                    <div 
                      className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: '#DCEDFF' }}
                    />
                  )}
                </Link>
              ))}
              <div className="pt-4">
                <Link to="/contact">
                  <Button variant="cta-primary" size="cta" className="w-full">
                    {t('nav.contact')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};