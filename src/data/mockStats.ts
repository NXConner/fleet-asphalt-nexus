
import { LucideIcon, Truck, Activity, AlertTriangle, DollarSign } from "lucide-react";

export interface Stat {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: string;
  trend: {
    value: string;
    positive: boolean;
  };
}

export const mockStats: Stat[] = [
  {
    title: "Active Vehicles",
    value: "24",
    description: "Vehicles currently in operation",
    icon: Truck,
    color: "blue",
    trend: { value: "+2.1%", positive: true }
  },
  {
    title: "Fleet Utilization",
    value: "87%",
    description: "Average vehicle utilization rate",
    icon: Activity,
    color: "green",
    trend: { value: "+5.2%", positive: true }
  },
  {
    title: "Maintenance Alerts",
    value: "3",
    description: "Vehicles requiring attention",
    icon: AlertTriangle,
    color: "orange",
    trend: { value: "-1", positive: true }
  },
  {
    title: "Monthly Revenue",
    value: "$124,500",
    description: "Revenue from fleet operations",
    icon: DollarSign,
    color: "purple",
    trend: { value: "+12.3%", positive: true }
  }
];
