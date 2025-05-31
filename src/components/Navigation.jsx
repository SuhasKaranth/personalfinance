import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md py-3 font-inter rounded-lg mx-4 -mt-4 relative z-10">
      <ul className="flex justify-around text-gray-700 font-medium">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'hover:text-blue-500 transition-colors'
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
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'hover:text-blue-500 transition-colors'
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
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'hover:text-blue-500 transition-colors'
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
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'hover:text-blue-500 transition-colors'
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
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'hover:text-blue-500 transition-colors'
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
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                : 'hover:text-blue-500 transition-colors'
            }
          >
            Learn
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;