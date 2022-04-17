import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

export default function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link to={to} {...props} className={`block w-full h-full py-3  px-4 ${match ? 'font-bold' : ''}`}>
        {children}
      </Link>
    </div>
  );
}
