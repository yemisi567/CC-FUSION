import { Tabs } from "antd";
import type { TabsProps } from "antd";

export default function TabComponent({ items, defaultActiveKey }: TabsProps) {
  return <Tabs defaultActiveKey={defaultActiveKey} items={items} />;
}
