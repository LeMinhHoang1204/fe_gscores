import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import api from "../services/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export default function ScoreLookupPage() {
  const [sbd, setSbd] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (sbdInput: string) => {
    if (!sbdInput.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await api.get(`/scores`, {
      params: { res_num: sbdInput },
    });
      setResult(res.data);

    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Không tìm thấy thí sinh");
      } else {
        setError("Đã có lỗi xảy ra");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta title="Tra cứu điểm" description="Tra cứu điểm theo số báo danh" />
      <PageBreadcrumb pageTitle="Tra cứu điểm" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[600px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
            Nhập số báo danh để tra cứu điểm
          </h3>

          <div className="space-y-6">
            <div>
              <Input
                id="sbd"
                type="number"
                min="1"
                placeholder="Nhập số báo danh..."
                value={sbd}
                onChange={(e) => setSbd(e.target.value)}
              />
            </div>
            <Button
              onClick={() => handleSearch(sbd)}
              size="sm"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Đang tra cứu..." : "Tra cứu"}
            </Button>
          </div>

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

          {result && (
            <div className="mt-10 text-left space-y-10">
              {/* Tiêu đề */}
              <h4 className="font-semibold text-theme-xl text-gray-700 dark:text-white mb-4">
                Kết quả của SBD: {result.user?.registration_number}
              </h4>

              {/* Bảng điểm từng môn */}
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="overflow-x-auto min-w-[600px]">
                  <Table className="w-full table-fixed">
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                      <TableRow>
                        <TableCell isHeader className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xl dark:text-gray-400">
                          Môn học
                        </TableCell>
                        <TableCell isHeader className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xl dark:text-gray-400">
                          Điểm số
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                      {result.subjects.map((sub: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="px-5 py-4 text-start text-theme-xl text-gray-700 dark:text-white/90">
                            {sub.subject}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start text-theme-xl text-gray-700 dark:text-white/90">
                            {sub.grade}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Bảng tổng điểm theo từng tổ hợp */}
              <div>
                <h4 className="font-semibold text-theme-xl text-gray-700 dark:text-white mb-4">
                  Tổng điểm theo từng tổ hợp môn
                </h4>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                  <div className="overflow-x-auto min-w-[600px]">
                    <Table className="w-full table-fixed">
                      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                          <TableCell isHeader className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xl dark:text-gray-400">
                            Tổ hợp
                          </TableCell>
                          <TableCell isHeader className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xl dark:text-gray-400">
                            Tổng điểm
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {result.groups_scores.map((group: any, index: number) => (
                          <TableRow key={'G' + index}>
                            <TableCell className="px-5 py-4 text-start text-theme-xl text-gray-700 dark:text-white/90">
                              {group.group_name}
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start text-theme-xl text-gray-700 dark:text-white/90">
                              {Number(group.total_score).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
