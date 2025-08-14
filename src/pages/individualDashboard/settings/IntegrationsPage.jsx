import TopDivider from "@/components/TopDivider";

const apiKeys = [
  {
    service: "Lavender API",
    status: "Generated",
    statusColor: "green",
    actions: [
      { label: "Copy", color: "green" },
      { label: "Regenerate", color: "red" },
    ],
  },
  {
    service: "Stripe Payments",
    status: "Not Connected",
    statusColor: "red",
    actions: [{ label: "Connect", color: "purple" }],
  },
  {
    service: "Mailchimp",
    status: "Connected",
    statusColor: "green",
    actions: [
      { label: "View Config", color: "green" },
      { label: "Disconnect", color: "red" },
    ],
  },
];

const telehealthTools = [
  {
    service: "Zoom",
    status: "Connected",
    statusColor: "green",
    actions: [{ label: "Disconnect", color: "red" }],
  },
  {
    service: "Twilio Video",
    status: "Not Connected",
    statusColor: "red",
    actions: [{ label: "Connect", color: "purple" }],
  },
  {
    service: "Custom WebRTC",
    status: "Configuring",
    statusColor: "orange",
    actions: [{ label: "View Docs", color: "green" }],
  },
];

const Section = ({ title, data }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-4">{title}</h2>

    {/* Table view */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-sm font-medium text-gray-600">Service</th>
            <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
            <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, i) => (
            <tr key={i}>
              <td className="py-4 font-medium text-gray-900">{item.service}</td>
              <td className="py-4">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full bg-${item.statusColor}-100 text-${item.statusColor}-700`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-4">
                <div className="flex space-x-2">
                  {item.actions.map((a, j) => (
                    <button
                      key={j}
                      className={`px-3 py-1 text-sm font-medium text-white rounded bg-${a.color}-600 hover:bg-${a.color}-700`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile card view */}
    <div className="block md:hidden space-y-4">
      {data.map((item, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <p className="font-medium text-gray-900">{item.service}</p>
          <p className="mt-2">
            <span
              className={`inline-flex px-3 py-1 text-sm font-medium rounded-full bg-${item.statusColor}-100 text-${item.statusColor}-700`}
            >
              {item.status}
            </span>
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {item.actions.map((a, j) => (
              <button
                key={j}
                className={`px-3 py-1 text-sm font-medium text-white rounded bg-${a.color}-600 hover:bg-${a.color}-700`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const IntegrationsPage = () => {
  return (
    <div>
      <TopDivider />
      <p className="text-xl font-bold md:p-3">Notifications</p>
      <div className="min-h-screen pt-2 md:p-3 w-full">
        <div className="max-w-6xl mx-auto space-y-8">
          <Section title="API Keys" data={apiKeys} />
          <Section title="Telehealth Tools" data={telehealthTools} />
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;