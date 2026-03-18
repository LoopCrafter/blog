import Sidebar from "./_components/Sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start gap-4 mt-4">
      <Sidebar />
      <div className="w-5/6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
