import classNames from 'classnames'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { components } from './router'

export default function App() {
  const location = useLocation()

  return (
    <div className="w-screen h-screen flex">
      <nav className="basis-[200px] h-full bg-zinc-700">
        <ul className="list-none m-0 p-0">
          {components.map((c) => (
            <li key={c.key}>
              <Link
                to={c.path}
                className={classNames(
                  'inline-block w-full text-center no-underline text-gray-50 py-3.5 transition hover:bg-blue-500',
                  { 'bg-blue-500': location.pathname === c.path }
                )}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-auto p-6">{<Outlet />}</div>
    </div>
  )
}
