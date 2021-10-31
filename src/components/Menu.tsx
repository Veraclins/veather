export interface MenuProps extends React.HtmlHTMLAttributes<HTMLUListElement> {
  open: boolean;
  onClose: () => void;
}

export interface MenuItemProps
  extends React.HtmlHTMLAttributes<HTMLLIElement> {}

export const MenuItem: React.FC<MenuItemProps> = ({ ...props }) => {
  return <li {...props} className="cursor-pointer" />;
};

export const Menu: React.FC<MenuProps> = ({
  open,
  onClose,
  children,
  ...props
}) => {
  return open ? (
    <ul {...props} className="absolute top-full center-x menu w-full">
      {children}
    </ul>
  ) : null;
};

export default Menu;
