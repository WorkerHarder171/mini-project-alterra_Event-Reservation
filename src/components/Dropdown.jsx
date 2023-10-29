import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { authService } from "./../config/auth";
import { auth } from "../config/firebase";

export default function Example() {
  const handleLogout = () => {
    authService.logOut();
  }
  return (
    <div className=" top-16 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center gap-5 w-full justify-center rounded-md shadow-sm px-4 py-2 text-sm font-medium text-dark hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <img
              src={auth.currentUser.photoURL}
              className="rounded-full"
              width={50}
              height={50}
            />
            <span>{auth.currentUser.displayName}</span>

            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-black hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="p-2 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/dashboard-admin"}
                    className={`${
                      active ? "bg-gray-200 text-black" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="p-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-gray-200 text-black" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
