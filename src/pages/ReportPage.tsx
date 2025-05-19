import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import api from "../services/api";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function ReportPage() {
  const [dataBySubjects, setDataBySubjects] = useState<any[]>([]);
  const [dataByGroups, setDataByGroups] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [groupCategories, setGroupCategories] = useState<string[]>([]);
  const [selectedGroupSubjects, setSelectedGroupSubjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/report");
      setDataBySubjects(res.data.by_subjects);
      setDataByGroups(res.data.by_groups);
      setCategories(res.data.by_subjects.map((item: any) => item.subject));
      setGroupCategories(res.data.by_groups.map((item: any) => item.group));
    };

    fetchData();
  }, []);

  const subjectOptions: ApexOptions = {
    colors: ["#C00000", "#ED7D31", "#FFC000", "#00B050"],
    chart: {
      type: "bar",
      height: 360,
      stacked: true,
      // toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    xaxis: {
      categories,
      title: {
        text: "Môn học",
        style: {
          fontSize: "16px",
          fontWeight: 600,
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: "16px",
        },
      },
      
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "14px",
    },
    yaxis: {
      title: {
        text: "Tổng học sinh",
        style: {
          fontSize: "16px",
          fontWeight: 600,
        },
      },
      labels: {
        style: {
          fontSize: "16px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} học sinh`,
      },
    },
    grid: {
      borderColor: "#eee",
      strokeDashArray: 3,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    dataLabels: {
      enabled: true, // Giữ hiển thị cho biểu đồ môn học
      style: {
        fontSize: "16px",
        colors: ["#111"],
      },
    },
  };

  const groupOptions: ApexOptions = {
    ...subjectOptions,
    xaxis: {
      ...subjectOptions.xaxis,
      categories: groupCategories,
      title: { text: "Khối thi", style: { fontSize: "16px", fontWeight: 600 } },
    },
    dataLabels: {
      enabled: false, // Ẩn số trên cột của biểu đồ khối
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: (_, { dataPointIndex }) => {
          const group = dataByGroups[dataPointIndex];
          if (!group) return "";
          const total =
            Number(group.level_below_4 || 0) +
            Number(group.level_4_6 || 0) +
            Number(group.level_6_8 || 0) +
            Number(group.level_8plus || 0);
          return `${group.group} | Tổng học sinh: ${total}`;
        },
      },
      y: {
        formatter: (value) => `${value} học sinh`,
      }
    },





    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const group = dataByGroups[config.dataPointIndex];
          const subjects = group?.subjects || [];
          const isSame = JSON.stringify(subjects) === JSON.stringify(selectedGroupSubjects);
          setSelectedGroupSubjects(isSame ? [] : subjects);
        },
      },
    },
  };

  const groupSeries = [
    {
      name: "< 4 điểm",
      data: dataByGroups.map((item) => item.level_below_4),
    },
    {
      name: "4 - 5.99 điểm",
      data: dataByGroups.map((item) => item.level_4_6),
    },
    {
      name: "6 - 7.99 điểm",
      data: dataByGroups.map((item) => item.level_6_8),
    },
    {
      name: ">= 8 điểm",
      data: dataByGroups.map((item) => item.level_8plus),
    },
  ];

  const showAll = selectedGroupSubjects.length === 0;
  const filteredCategories = showAll
    ? categories
    : selectedGroupSubjects.map((item) => item.subject);

  const filteredSeries = [
    {
      name: "< 4 điểm",
      data: showAll
        ? dataBySubjects.map((item) => item.level_below_4)
        : selectedGroupSubjects.map((item) => item.level_below_4),
    },
    {
      name: "4 - 5.99 điểm",
      data: showAll
        ? dataBySubjects.map((item) => item.level_4_6)
        : selectedGroupSubjects.map((item) => item.level_4_6),
    },
    {
      name: "6 - 7.99 điểm",
      data: showAll
        ? dataBySubjects.map((item) => item.level_6_8)
        : selectedGroupSubjects.map((item) => item.level_6_8),
    },
    {
      name: ">= 8 điểm",
      data: showAll
        ? dataBySubjects.map((item) => item.level_8plus)
        : selectedGroupSubjects.map((item) => item.level_8plus),
    },
  ];

  const dynamicOptions: ApexOptions = {
    ...subjectOptions,
    xaxis: {
      ...subjectOptions.xaxis,
      categories: filteredCategories,
    },
  };

  return (
    <div className="space-y-10">
      <PageMeta title="Báo cáo" description="Báo cáo" />
      <PageBreadcrumb pageTitle="Báo cáo" />
      <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-6 shadow-md">
        <h2 className="text-theme-xl font-semibold text-gray-800 dark:text-white mb-4">
          Biểu đồ phân bố điểm theo khối thi
        </h2>
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px]">
            <Chart options={groupOptions} series={groupSeries} type="bar" height={360} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-6 shadow-md">
        <h2 className="text-theme-xl font-semibold text-gray-800 dark:text-white mb-4">
          Biểu đồ phân bố điểm theo môn học
        </h2>
        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px]">
            <Chart options={dynamicOptions} series={filteredSeries} type="bar" height={360} />
          </div>
        </div>
      </div>
    </div>
  );
}
