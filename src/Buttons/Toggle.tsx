import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id: string;
  name?: string;
  type?: string;
  value?: string;
  checked?: boolean | undefined;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

function Toggle({ children, id, name, type, value, checked, onChange }: Props) {
  return (
    <>
      <input
        className="toggle solo-mute"
        type={type || "checkbox"}
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </>
  );
}

export default Toggle;
