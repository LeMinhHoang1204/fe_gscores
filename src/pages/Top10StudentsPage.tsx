import { useEffect, useState } from "react";
import api from "../services/api";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Select from "../components/form/Select";

const GROUPS = ["A00", "A01", "B00", "B08", "C00", "D01", "D07"];
const options = GROUPS.map((g) => ({ value: g, label: g }));


export default function Top10StudentsPage() {
  const [group, setGroup] = useState("A00");
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchTopStudents(group);
  }, [group]);

  const fetchTopStudents = async (group: string) => {
    const res = await api.get(`/top-students`, {
      params: { group: group },
    });
    setStudents(res.data);
  };

  return (
    <div className="space-y-10">
      <PageMeta title="Top 10 học sinh" description="Top 10 học sinh" />
      <PageBreadcrumb pageTitle="Top 10 học sinh" />
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-6 shadow-md space-y-6">
      
      <h2 className="text-theme-xl font-semibold text-gray-800 dark:text-white">
        Top 10 học sinh khối {group}
      </h2>

      {/* <select
        className="border border-gray-300 dark:border-white/[0.1] dark:bg-white/[0.05] text-gray-800 dark:text-white p-2 rounded"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        {GROUPS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select> */}
      <div className="w-40">
        <Select
          options={options}
          onChange={setGroup}
          placeholder="Chọn nhóm"
          className="border border-gray-300 dark:border-white/[0.05] dark:bg-white/[0.03] text-gray-800 dark:text-white p-2 rounded w-32"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border border-gray-200 dark:border-white/[0.05] text-theme-xl">
          <thead className="bg-gray-100 dark:bg-white/[0.05]">
            <tr>
              <th className="p-2 border dark:border-white/[0.05] text-center text-gray-700 dark:text-white">Số thứ tự</th>
              <th className="p-2 border dark:border-white/[0.05] text-center text-gray-700 dark:text-white">Số báo danh</th>
              <th className="p-2 border dark:border-white/[0.05] text-center text-gray-700 dark:text-white">Tổng điểm</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.05]"
              >
                <td className="p-2 border dark:border-white/[0.05] text-gray-800 dark:text-white text-center">
                  {i + 1}
                </td>
                <td className="p-2 border dark:border-white/[0.05] text-gray-800 dark:text-white text-center">
                  {s.registration_number}
                </td>
                <td className="p-2 border dark:border-white/[0.05] text-gray-800 dark:text-white text-center">
                  {Number(s.total_score).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
