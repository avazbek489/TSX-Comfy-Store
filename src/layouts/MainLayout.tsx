import { FC, ReactNode } from "react";
import Header from "../components/Header";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;