import TopDivider from '@/components/TopDivider';

const IntegrationsPage = () => {
  return (
    <div>
      <TopDivider />
      <p className='text-xl font-bold p-3'>Notifications</p>
      <div className="min-h-screen p-3 w-full">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* API Keys Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-4">API Keys</h2>

              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Service</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Key Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-4 text-gray-900 font-medium">Lavender API</td>
                      <td className="py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                          Generated
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700">
                            Copy
                          </button>
                          <button className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700">
                            Regenerate
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-900 font-medium">Stripe Payments</td>
                      <td className="py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-red-100 text-red-600 rounded-full">
                          Not Connected
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="px-3 py-1 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700">
                          Connect
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-900 font-medium">Mailchimp</td>
                      <td className="py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                          Connected
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700">
                            View Config
                          </button>
                          <button className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700">
                            Disconnect
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Telehealth Tools Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b pb-4">Telehealth Tools</h2>

              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Tool</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-4 text-gray-900 font-medium">Zoom</td>
                      <td className="py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                          Connected
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700">
                          Disconnect
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-900 font-medium">Twilio Video</td>
                      <td className="py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-red-100 text-red-600 rounded-full">
                          Not Connected
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="px-3 py-1 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700">
                          Connect
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-900 font-medium">Custom WebRTC</td>
                      <td className="py-4">
                        <span className="inline-flex px-3 py-1 text-sm font-medium bg-orange-100 text-orange-600 rounded-full">
                          Configuring
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700">
                          View Docs
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;