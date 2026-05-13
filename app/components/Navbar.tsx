import { NavLink } from "react-router-dom";

type NavbarProps = {
  links: {
    name: string;
    path: string;
    icon: any;
  }[];
};

export default function Navbar() {
  return (
    <div className="flex w-full p-6 justify-end items-center gap-x-20 bg-slate-900 border-b border-slate-700">
      <div className="w-full">
        <h1 className="text-3xl font-bold">Overview 📈</h1>
        <p>Welcome back, here’s what’s happening.</p>
        {/* {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink key={link.path} to={link.path}>
              <Icon size={20} />
              {link.name}
            </NavLink>
          );
        })} */}
      </div>
      <nav>Nav1</nav>
      <nav>Nav2</nav>
      <nav>Nav3</nav>
      <nav>Nav4</nav>
      <nav>Nav5</nav>
    </div>
  );
}
