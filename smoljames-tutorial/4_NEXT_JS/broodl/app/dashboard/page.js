import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
import Login from "@/components/Login";

export const metadata = {
  title: "Broodl ⋅ Dashboard",
  description: "Track your daily mood everyday of the year!",
};

export default function DashboardPage() {

  return (
      <Main>
          <Dashboard />
      </Main>
  )
}