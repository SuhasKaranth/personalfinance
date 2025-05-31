import React from 'react';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
  return (
    <nav className="w-64 flex-shrink-0 bg-white shadow-md py-6 font-inter rounded-r-lg">
      <ul className="flex flex-col text-gray-700 font-medium space-y-4 px-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-2 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition-colors pl-2'
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-2 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition-colors pl-2'
            }
          >
            Expenses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/budgeting"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-2 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition-colors pl-2'
            }
          >
            Budgeting
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/savings"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-2 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition-colors pl-2'
            }
          >
            Savings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/debt"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-2 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition-colors pl-2'
            }
          >
            Debt
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-2 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition-colors pl-2'
            }
          >
            Learn
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;