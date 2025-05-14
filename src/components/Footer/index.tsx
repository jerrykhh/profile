import { NavButton } from '../NavButton';

export const Footer = () => {
  const menus = [
    {
      title: 'Contact',
      path: '/ext/link',
    },
  ];

  return (
    <div className="flex flex-col min-h-20 gap-2">
      <div className="flex gap-8">
        {menus.map((item) => (
          <NavButton
            key={item.path}
            to={item.path}
            title={item.title}
            underline={false}
          />
        ))}
      </div>
      <div className="w-full border-b-[1.5px] min-h-2 border-dashed" />
      <div className="min-h-8 text-sm">
        <p>{`© ${new Date().getFullYear()} jerrykhh`}</p>
      </div>
    </div>
  );
};
