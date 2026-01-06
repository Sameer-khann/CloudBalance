import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useOutletContext } from "react-router-dom";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const CHART_CONFIG = {
    types: [
        { id: "mscolumn2d", label: "Multi-Series Column", icon: "📊" },
        { id: "msline", label: "Line with Multiple Series", icon: "📈" },
        { id: "stackedcolumn2d", label: "Stacked Columns", icon: "📉" }
    ],
    defaultType: "mscolumn2d"
};

const GROUP_BY_OPTIONS = [
    { id: "service", label: "Service" },
    { id: "account", label: "Account ID" },
    { id: "instance", label: "Instance Type" },
    { id: "usage", label: "Usage Type" },
    { id: "platform", label: "Platform" },
    { id: "region", label: "Region" },
    { id: "usageGroup", label: "Usage Type Group" }
];

const TABLE_DATA = [
    {
        service: "Amazon Elastic Compute Cloud",
        jul2025: 42441.19,
        aug2025: 36717.95,
        sep2025: 38043.52,
        oct2025: 33826.71,
        nov2025: 31355.12,
        dec2025: 29059.66
    },
    {
        service: "Savings Plans for AWS Compute usage",
        jul2025: 25296.00,
        aug2025: 25296.00,
        sep2025: 24480.00,
        oct2025: 25296.00,
        nov2025: 24480.00,
        dec2025: 25296.00
    },
    {
        service: "Amazon Relational Database Service",
        jul2025: 24148.67,
        aug2025: 24200.03,
        sep2025: 24554.95,
        oct2025: 23718.76,
        nov2025: 22354.91,
        dec2025: 22635.30
    },
    {
        service: "AWS Marketplace",
        jul2025: 20607.99,
        aug2025: 28863.24,
        sep2025: 23589.09,
        oct2025: 13497.72,
        nov2025: 26550.78,
        dec2025: 26669.83
    },
    {
        service: "AWS Data Transfer",
        jul2025: 13140.00,
        aug2025: 12162.33,
        sep2025: 12068.50,
        oct2025: 11798.63,
        nov2025: 10960.59,
        dec2025: 11037.00
    },
    {
        service: "Amazon Simple Storage Service",
        jul2025: 10390.56,
        aug2025: 10473.91,
        sep2025: 10619.57,
        oct2025: 10050.02,
        nov2025: 8905.74,
        dec2025: 8881.36
    },
    {
        service: "Amazon ElastiCache",
        jul2025: 6104.43,
        aug2025: 6266.93,
        sep2025: 5524.13,
        oct2025: 4039.58,
        nov2025: 1909.08,
        dec2025: 1972.72
    },
    {
        service: "Amazon Simple Queue Service",
        jul2025: 3006.26,
        aug2025: 2842.71,
        sep2025: 2477.82,
        oct2025: 2505.44,
        nov2025: 2577.78,
        dec2025: 2665.12
    },
    {
        service: "Elastic Load Balancing",
        jul2025: 2466.40,
        aug2025: 2514.69,
        sep2025: 2530.81,
        oct2025: 2543.78,
        nov2025: 2336.28,
        dec2025: 2381.53
    },
    {
        service: "AWS Database Migration Service",
        jul2025: 2288.48,
        aug2025: 2295.74,
        sep2025: 2222.27,
        oct2025: 2295.74,
        nov2025: 2186.39,
        dec2025: 2216.87
    },
    {
        service: "Amazon QuickSight",
        jul2025: 1017.65,
        aug2025: 1147.01,
        sep2025: 1599.10,
        oct2025: 2680.50,
        nov2025: 3144.66,
        dec2025: 3783.32
    },
    {
        service: "AmazonCloudWatch",
        jul2025: 1221.69,
        aug2025: 1279.18,
        sep2025: 1399.53,
        oct2025: 1603.97,
        nov2025: 1462.02,
        dec2025: 1430.64
    },
    {
        service: "Amazon Virtual Private Cloud",
        jul2025: 1188.06,
        aug2025: 1115.71,
        sep2025: 1131.97,
        oct2025: 1260.10,
        nov2025: 1217.13,
        dec2025: 1129.71
    },
    {
        service: "AWS CloudTrail",
        jul2025: 1245.01,
        aug2025: 1230.53,
        sep2025: 1150.22,
        oct2025: 1069.82,
        nov2025: 1044.34,
        dec2025: 1016.27
    }
];


// const generateChartData = () => {
//     const categories = [
//         { label: "Jul 2025" },
//         { label: "Aug 2025" },
//         { label: "Sep 2025" },
//         { label: "Oct 2025" },
//         { label: "Nov 2025" },
//         { label: "Dec 2025" }
//     ];

//     const dataset = [
//         {
//             seriesname: "Amazon Elastic Compute Cloud",
//             color: "#3b82f6",
//             data: [
//                 { value: "42000" },
//                 { value: "35000" },
//                 { value: "37000" },
//                 { value: "33000" },
//                 { value: "31000" },
//                 { value: "29000" }
//             ]
//         },
//         {
//             seriesname: "Savings Plans for AWS Compute usage",
//             color: "#06b6d4",
//             data: [
//                 { value: "26000" },
//                 { value: "25000" },
//                 { value: "24000" },
//                 { value: "25000" },
//                 { value: "24500" },
//                 { value: "25500" }
//             ]
//         },
//         {
//             seriesname: "Amazon Relational Database Service",
//             color: "#f97316",
//             data: [
//                 { value: "24000" },
//                 { value: "23000" },
//                 { value: "24500" },
//                 { value: "24000" },
//                 { value: "22500" },
//                 { value: "22000" }
//             ]
//         },
//         {
//             seriesname: "AWS Marketplace",
//             color: "#84cc16",
//             data: [
//                 { value: "21000" },
//                 { value: "28000" },
//                 { value: "24000" },
//                 { value: "13000" },
//                 { value: "26500" },
//                 { value: "26000" }
//             ]
//         },
//         {
//             seriesname: "Others",
//             color: "#eab308",
//             data: [
//                 { value: "47000" },
//                 { value: "42000" },
//                 { value: "38000" },
//                 { value: "40000" },
//                 { value: "37000" },
//                 { value: "38000" }
//             ]
//         }
//     ];

//     return { categories, dataset };
// };

const generateChartDataFromTable = (data, groupBy) => {
    const months = [
        { key: "jul2025", label: "Jul 2025" },
        { key: "aug2025", label: "Aug 2025" },
        { key: "sep2025", label: "Sep 2025" },
        { key: "oct2025", label: "Oct 2025" },
        { key: "nov2025", label: "Nov 2025" },
        { key: "dec2025", label: "Dec 2025" }
    ];

    // X-axis
    const categories = months.map(m => ({ label: m.label }));

    // Y-axis series
    const dataset = data.map((row) => ({
        seriesname: row[groupBy],   // service / account / etc
        data: months.map(m => ({
            value: row[m.key]
        }))
    }));

    return { categories, dataset };
};


const costData = TABLE_DATA;

const calculateTotal = (row) => {
    return row.jul2025 + row.aug2025 + row.sep2025 + row.oct2025 + row.nov2025 + row.dec2025;
};

const calculateColumnTotal = (column) => {
    return TABLE_DATA.reduce((sum, row) => sum + row[column], 0);
};

const FilterSidebar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={onClose}
            />

            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Date Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Range
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="block text-center text-gray-500 my-1">to</span>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Services</option>
                                <option>Amazon EC2</option>
                                <option>Amazon RDS</option>
                                <option>AWS Lambda</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Region
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Regions</option>
                                <option>us-east-1</option>
                                <option>us-west-2</option>
                                <option>eu-west-1</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Include Negative Value
                            </label>
                            <button
                                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
                            >
                                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                            </button>
                        </div>

                        <div className="pt-4 space-y-2">
                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                Apply Filters
                            </button>
                            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ChartTypeSelector = ({ currentType, onTypeChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">Chart Type</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    {CHART_CONFIG.types.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => {
                                onTypeChange(type.id);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3 ${currentType === type.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                }`}
                        >
                            <span className="text-xl">{type.icon}</span>
                            <span className="text-sm font-medium">{type.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


const CostDataTable = () => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
                <p className="text-sm text-blue-700 text-center">
                    We are showing up top 1000 records by cost.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                                Service
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Jul 2025
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Aug 2025
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Sep 2025
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Oct 2025
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Nov 2025
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Dec 2025
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-100">
                                Total
                            </th>
                            {/* <th className="px-6 py-3 text-center bg-gray-50">
                                <button className="text-green-600 hover:text-green-700 p-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </button>
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {TABLE_DATA.map((row, index) => {
                            const total = calculateTotal(row);
                            return (
                                <tr key={index} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-900 sticky left-0 bg-white">
                                        {row.service}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                        ${row.jul2025.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                        ${row.aug2025.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                        ${row.sep2025.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                        ${row.oct2025.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                        ${row.nov2025.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">
                                        ${row.dec2025.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-right bg-gray-50">
                                        ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    {/* <td className="px-6 py-4"></td> */}
                                </tr>
                            );
                        })}

                        <tr className="bg-blue-50 font-semibold border-t-2 border-blue-200">
                            <td className="px-6 py-4 text-sm text-blue-700 sticky left-0 bg-blue-50">
                                Total
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('jul2025').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('aug2025').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('sep2025').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('oct2025').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('nov2025').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('dec2025').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-blue-700 text-right bg-blue-100">
                                ${(
                                    calculateColumnTotal('jul2025') +
                                    calculateColumnTotal('aug2025') +
                                    calculateColumnTotal('sep2025') +
                                    calculateColumnTotal('oct2025') +
                                    calculateColumnTotal('nov2025') +
                                    calculateColumnTotal('dec2025')
                                ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            {/* <td className="px-6 py-4"></td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export const CostExplorer = () => {
    const [selectedGroupBy, setSelectedGroupBy] = useState("service");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [chartType, setChartType] = useState(CHART_CONFIG.defaultType);
    //   const [chartData, setChartData] = useState(generateChartData());
    // const chartData = generateChartData(selectedGroupBy);
    const chartData = generateChartDataFromTable(TABLE_DATA, selectedGroupBy);



    // Update chart data when group by changes
    //   useEffect(() => {
    //     // Here you would fetch data based on selectedGroupBy from backend
    //     // For now, we'll use the same dummy data
    //     setChartData(generateChartData());
    //   }, [selectedGroupBy]);

    const { setPageTitle } = useOutletContext();

    useEffect(() => {
        setPageTitle("Cost Explorer");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const chartConfigs = {
        type: chartType,
        width: "100%",
        height: "500",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "AWS Cost Analysis",
                subCaption: "Monthly breakdown by service",
                xAxisName: "Months",
                yAxisName: "Cost ($)",
                numberPrefix: "$",
                theme: "fusion",
                showValues: "0",
                labelDisplay: "auto",
                useRoundEdges: "0",
                showLegend: "1",
                legendPosition: "bottom",
                legendItemFontSize: "12",
                legendItemFontColor: "#666666",
                paletteColors: "#3b82f6,#06b6d4,#f97316,#84cc16,#eab308",
                bgColor: "#ffffff",
                canvasBgColor: "#ffffff",
                plotSpacePercent: "70",
                divLineAlpha: "20",
                baseFontSize: "13",
                baseFont: "Inter, sans-serif"
            },
            categories: [{ category: chartData.categories }],
            dataset: chartData.dataset
        }
    };

    return (
        <div className="p-6 space-y-4 -ml-6 ">
            <div>
                <p className="-mt-3 text-sm text-gray-700">
                    How to always be aware of cost changes and history.
                </p>
                <hr className="my-2 -ml-3 border-gray-300" />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">Group By:</span>

                    <div className="flex items-center gap-2 flex-wrap">
                        {GROUP_BY_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setSelectedGroupBy(option.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedGroupBy === option.id
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <button
                        // onClick={() => setIsFilterOpen(true)}
                        className="ml-auto px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center gap-2 curson-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span className="text-sm font-medium">Filters</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Cost ($)
                    </h3>
                    <div className="flex items-center gap-3">
                        <ChartTypeSelector
                            currentType={chartType}
                            onTypeChange={setChartType}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <ReactFC {...chartConfigs} />
                </div>
            </div>

            <CostDataTable />

            <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </div>
    );
};