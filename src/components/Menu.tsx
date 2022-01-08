export interface MenuProps extends React.HtmlHTMLAttributes<HTMLUListElement> {
  open: boolean;
  onClose: () => void;
}

export interface MenuItemProps
  extends React.HtmlHTMLAttributes<HTMLLIElement> {}

export const MenuItem: React.FC<MenuItemProps> = ({ className, ...props }) => {
  return (
    <li
      {...props}
      className={`cursor-pointer p-2${className ? ' ' + className : ''}`}
    />
  );
};

export const Menu: React.FC<MenuProps> = ({
  open,
  onClose,
  children,
  ...props
}) => {
  return open ? (
    <ul
      {...props}
      className="absolute flex flex-column top-100 left-0 right-0 menu w-100"
    >
      {children}
    </ul>
  ) : null;
};

export default Menu;
