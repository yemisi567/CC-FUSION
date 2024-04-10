import { Select } from "antd";
import { Card } from "../Card/Card";
import { IAppCustomDates } from "../../utils/helpers/types/enums";
import { DefaultOptionType } from "antd/es/select";
import {
  formatDate,
  showMoneyInAppFormat,
  toTitleCase,
} from "../../utils/helpers";
import Chart from "react-apexcharts";
import InvoiceSent from "../../utils/Icons/Sent";
import InvoiceReceived from "../../utils/Icons/Recieved";
import InvoiceGenerated from "../../utils/Icons/Generated";
import { activities, customers, topProducts } from "../../utils/data/dashboard";

export default function Dashboard() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const selectOptions: DefaultOptionType[] = [
    ...Object.values(IAppCustomDates).map((item) => ({
      value: item,
      label: (
        <div>
          <p> {toTitleCase(item.replaceAll("_", " "))}</p>
        </div>
      ),
    })),
  ];

  return (
    <div className="grid grid-cols-3 gap-20 max-[1400px]:grid-cols-1">
      <div>
        <Card classNames="w-auto h-[45rem] max-[1400px]:h-auto">
          <div className="flex justify-between py-[15px]">
            <p className="text-base font-bold">Bills</p>
            <div>
              <Select
                defaultValue={IAppCustomDates.THIS_WEEK}
                style={{
                  width: 150,
                }}
                onChange={handleChange}
                options={selectOptions}
              />
            </div>
          </div>
          <div className="mt-32">
            <Chart
              type="donut"
              series={[20, 40, 30, 10]}
              options={{
                labels: ["Invoiced", "Paid", "Due date", "Over due"],
                dataLabels: {
                  enabled: false,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          showAlways: true,
                          label: "Invoiced",
                          formatter: (w: 20) => "20",
                        },
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </Card>
        <div className="grid grid-cols-1 pt-[16px]">
          <Card classNames="w-auto h-[45rem] max-[1400px]:h-auto overflow-auto">
            <p className="sticky z-[5] top-[-20px] py-[15px] h-[60px] bg-white text-base font-bold">
              Top Paying Customers
            </p>
            {customers.map((customer, index) => (
              <div className="flex border-b border-strokelight py-20 text-[13px] max-[1400px]:justify-between">
                <div className="text-gray max-[1400px]:w-[20%]">
                  {index + 1}
                </div>
                <div className="ml-10 text-[#4C8DEB] max-[1400px]:w-[40%]">
                  {customer.name}
                </div>
                <div className="ml-auto text-gray max-[1400px]:ml-0 max-[1400px]:w-[40%]">
                  {showMoneyInAppFormat(customer.amount)}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div>
        <Card classNames="w-auto h-[45rem] max-[1400px]:h-auto">
          <div className="flex justify-between py-[15px]">
            <p className="text-base font-bold ">Payments</p>
            <div>
              <Select
                defaultValue={IAppCustomDates.THIS_WEEK}
                style={{
                  width: 150,
                }}
                onChange={handleChange}
                options={selectOptions}
              />
            </div>
          </div>
          <div className="mt-10">
            <Chart
              type="bar"
              series={[{ data: [50, 100, 10, 250, 30, 150, 90, 60] }]}
              height={300}
              options={{
                colors: ["#5AD6B0"],
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
                yaxis: {
                  title: {
                    text: "Amount in K",
                  },
                },
              }}
            />
          </div>
        </Card>
        <div className="grid grid-cols-1 pt-[16px]">
          <Card classNames="w-auto h-[45rem] max-[1400px]:h-auto overflow-auto">
            <p className="sticky z-[5] top-[-20px] py-[15px] h-[60px] bg-white text-base font-bold">
              Top Selling Services/Products
            </p>
            {topProducts.map((customer, index) => (
              <div className="flex border-b border-strokelight py-20 text-[13px] max-[1400px]:justify-between">
                <div className="text-gray max-[1400px]:w-[20%]">
                  {index + 1}
                </div>
                <div className="ml-10 text-[#4C8DEB] max-[1400px]:w-[40%]">
                  {customer.name}
                </div>
                <div className="ml-auto text-gray max-[1400px]:ml-0 max-[1400px]:w-[20%]">
                  {`${showMoneyInAppFormat(customer.hourly_rate)}/h`}
                </div>
                <div className="text-gray ml-10 max-[1400px]:w-[20%]">
                  {showMoneyInAppFormat(customer.amount)}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
      <div className="pb-[32px] ">
        <Card classNames="w-auto h-[91.5rem] overflow-auto">
          <p className="sticky z-[5] top-[-20px] py-[15px] h-[60px] bg-white text-base font-bold">
            Activities
          </p>
          {activities.map((item, index) => (
            <div className="mt-10 flex ">
              <div className="w-[17%] max-[768px]:w-[30%]">
                <p className="text-[10px] text-[#748AA9] pl-12">
                  {" "}
                  {formatDate(item.created_at, false, "h:mm aa")}
                </p>
                <p className="text-[10px] text-gray">
                  {" "}
                  {formatDate(item.created_at, false, "MM-dd-yyyy")}
                </p>
              </div>
              <div className="mr-20 w-[3%]">
                <div className="relative">
                  {item.activity === "Payment Received" && <InvoiceReceived />}
                  {item.activity === "Invoice Sent" && <InvoiceSent />}
                  {item.activity === "Invoice Generated" && (
                    <InvoiceGenerated />
                  )}
                  {index !== activities.length - 1 && (
                    <div className="absolute  h-[10rem] top-[24px] left-[15px] w-[1px] bg-[#D8D8D8] max-[600px]:h-[17rem]"></div>
                  )}
                </div>
              </div>
              <div className="w-[78%]">
                <Card classNames="mb-10  ">
                  <p className="text-sm font-bold text-gray ">
                    {item.activity}
                  </p>
                  <p className="text-smm text-gray font-serif">
                    {item.description.split(" ").map((word, index) => {
                      if (word.startsWith("#")) {
                        return (
                          <span
                            key={index}
                            className="text-[#4C8DEB] font-bold"
                          >
                            {`${word} `}
                          </span>
                        );
                      }
                      if (word.startsWith("$")) {
                        return (
                          <strong key={index} className="font-bold">
                            {`${word} `}
                          </strong>
                        );
                      } else {
                        return <span key={index}>{word} </span>;
                      }
                    })}
                  </p>
                </Card>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
