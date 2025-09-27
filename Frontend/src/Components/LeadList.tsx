import React, { useState, useEffect } from "react";

interface LeadField {
  name: string;
  values: string[];
}

interface Lead {
  id: string;
  created_time: string;
  field_data: LeadField[];
}

const LeadsList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // for Facebook refresh

  // 🔹 1. Fetch leads from MongoDB on component mount
  useEffect(() => {
    fetchLeadsFromDB();
  }, []);

  // Fetch leads stored in MongoDB
  const fetchLeadsFromDB = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/leads"); // ✅ fetch from MongoDB
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as Lead[];
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads from DB:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 2. Refresh leads from Facebook API and save into MongoDB
  const refreshLeadsFromFacebook = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("http://localhost:5000/api/getLeads"); // ✅ fetch from Facebook
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log("Refreshed from Facebook:", data);

      // After refreshing, fetch again from DB to update UI
      await fetchLeadsFromDB();
    } catch (error) {
      console.error("Error refreshing leads from Facebook:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="p-6">
      {/* 🔹 Button to refresh leads from Facebook */}
      <button
        onClick={refreshLeadsFromFacebook}
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 mr-4"
      >
        {refreshing ? "Refreshing..." : "Refresh from Facebook"}
      </button>

      {/* 🔹 Button to fetch only from MongoDB (without refreshing Facebook) */}
      <button
        onClick={fetchLeadsFromDB}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        {loading ? "Loading..." : "Load from Database"}
      </button>

      {/* Leads table */}
      {leads.length > 0 && (
        <table className="mt-6 border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">Created Time</th>
              <th className="border border-gray-400 px-4 py-2">Fields</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="border border-gray-400 px-4 py-2">{lead.id}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(lead.created_time).toLocaleString()}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <ul>
                    {lead.field_data.map((field, idx) => (
                      <li key={idx}>
                        <strong>{field.name}:</strong> {field.values.join(", ")}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Message when no leads */}
      {leads.length === 0 && !loading && (
        <p className="mt-6 text-gray-600">No leads found in database.</p>
      )}
    </div>
  );
};

export default LeadsList;
