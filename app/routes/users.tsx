import { useEffect, useState } from "react";
import UsersTable from "../components/UsersPage/UsersTable";
import UsersLoading from "../components/UsersPage/UsersLoading";
import { getDasboardData } from "../services/dashboard.server";

type DashboardData = {
  UsersData: {
    name: string;
    role: string;
    status: string;
    joined: string;
  }[];
};

export default function Users() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getDasboardData();
      setData(result);
    }
    loadData();
  }, []);
  if (!data) {
    return <UsersLoading />;
  }

  return <UsersTable />;
}
