import React, { useEffect, useState } from "react";
import { getRules } from "../utils";

const RulesCard = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    getRules(setRules);
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Rules</h1>
      <table className="min-w-full border-collapse border border-gray-200 text-white text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Min</th>
            <th className="border border-gray-300 px-4 py-2">Alert Min</th>
            <th className="border border-gray-300 px-4 py-2">Max</th>
            <th className="border border-gray-300 px-4 py-2">Alert Max</th>
          </tr>
        </thead>
        <tbody>
          {rules &&
            rules.map((rule, index) => (
              <tr key={rule.id} className="hover:bg-gray-500 hover:text-lime-200">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{rule.name}</td>
                <td className="border border-gray-300 px-4 py-2">{rule.minLimit}</td>
                <td className="border border-gray-300 px-4 py-2">{rule.minAlert}</td>
                <td className="border border-gray-300 px-4 py-2">{rule.maxLimit}</td>
                <td className="border border-gray-300 px-4 py-2">{rule.maxAlert}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RulesCard;
