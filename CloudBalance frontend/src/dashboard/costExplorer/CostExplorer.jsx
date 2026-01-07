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

// Filter Configuration - Define all available filters
const FILTER_OPTIONS = [
    {
        id: "service",
        label: "Service",
        values: [
            "Amazon Elastic Compute Cloud",
            "Savings Plans for AWS Compute usage",
            "Amazon Relational Database Service",
            "AWS Marketplace",
            "AWS Data Transfer",
            "Amazon Simple Storage Service",
            "Amazon ElastiCache",
            "Amazon Simple Queue Service",
            "Elastic Load Balancing",
            "AWS Database Migration Service",
            "Amazon QuickSight",
            "AmazonCloudWatch",
            "Amazon Virtual Private Cloud",
            "AWS CloudTrail"
        ]
    },
    {
        id: "account",
        label: "Account ID",
        values: ["123456789012", "234567890123", "345678901234", "456789012345"]
    },
    {
        id: "instance",
        label: "Instance Type",
        values: ["t2.micro", "t2.small", "t2.medium", "t3.micro", "t3.small", "m5.large", "m5.xlarge"]
    },
    {
        id: "usage",
        label: "Usage Type",
        values: ["DataTransfer-In-Bytes", "DataTransfer-Out-Bytes", "BoxUsage", "EBS:VolumeUsage"]
    },
    {
        id: "platform",
        label: "Platform",
        values: ["Linux/UNIX", "Windows", "Red Hat Enterprise Linux", "SUSE Linux"]
    },
    {
        id: "region",
        label: "Region",
        values: ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1", "ap-southeast-1"]
    },
    {
        id: "usageGroup",
        label: "Usage Type Group",
        values: ["EC2: Running Hours", "EC2: EBS", "S3: Storage", "RDS: Database"]
    },
    {
        id: "purchaseOption",
        label: "Purchase Option",
        values: ["On Demand", "Reserved", "Spot", "Savings Plan"]
    },
    {
        id: "apiOperation",
        label: "API Operation",
        values: ["RunInstances", "CreateVolume", "PutObject", "GetObject"]
    },
    {
        id: "resource",
        label: "Resource",
        values: ["i-1234567890abcdef0", "vol-1234567890abcdef0", "arn:aws:s3:::bucket-name"]
    },
    {
        id: "chargeType",
        label: "Charge Type",
        values: ["Usage", "Tax", "Credit", "Refund"]
    },
    {
        id: "availabilityZone",
        label: "Availability Zone",
        values: ["us-east-1a", "us-east-1b", "us-west-2a", "us-west-2b"]
    },
    {
        id: "tenancy",
        label: "Tenancy",
        values: ["Shared", "Dedicated", "Host"]
    },
    {
        id: "legalEntity",
        label: "Legal Entity",
        values: ["Amazon Web Services, Inc.", "Amazon Web Services India"]
    },
    {
        id: "billingEntity",
        label: "Billing Entity",
        values: ["AWS", "AWS Marketplace"]
    }
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

const generateChartDataFromTable = (data, groupBy) => {
    const months = [
        { key: "jul2025", label: "Jul 2025" },
        { key: "aug2025", label: "Aug 2025" },
        { key: "sep2025", label: "Sep 2025" },
        { key: "oct2025", label: "Oct 2025" },
        { key: "nov2025", label: "Nov 2025" },
        { key: "dec2025", label: "Dec 2025" }
    ];

    const categories = months.map(m => ({ label: m.label }));

    const dataset = data.map((row) => ({
        seriesname: row[groupBy],
        data: months.map(m => ({
            value: row[m.key]
        }))
    }));

    return { categories, dataset };
};

const getTopNWithOthers = (data, groupBy, topN = 5) => {
    const sorted = [...data].sort(
        (a, b) => calculateTotal(b) - calculateTotal(a)
    );

    const topItems = sorted.slice(0, topN);
    const restItems = sorted.slice(topN);

    if (restItems.length === 0) return topItems;

    const others = {
        [groupBy]: "Others",
        jul2025: 0,
        aug2025: 0,
        sep2025: 0,
        oct2025: 0,
        nov2025: 0,
        dec2025: 0
    };

    restItems.forEach(item => {
        others.jul2025 += item.jul2025;
        others.aug2025 += item.aug2025;
        others.sep2025 += item.sep2025;
        others.oct2025 += item.oct2025;
        others.nov2025 += item.nov2025;
        others.dec2025 += item.dec2025;
    });

    return [...topItems, others];
};

const calculateTotal = (row) => {
    return row.jul2025 + row.aug2025 + row.sep2025 + row.oct2025 + row.nov2025 + row.dec2025;
};

const calculateColumnTotal = (column, data = TABLE_DATA) => {
    return data.reduce((sum, row) => sum + row[column], 0);
};

const FilterDropdown = ({ filter, selectedValues, onToggleValue, isOpen, onToggle }) => {
    
    const allSelected = selectedValues.length === filter.values.length;
    const someSelected = selectedValues.length > 0 && !allSelected;

    const handleSelectAll = () => {
        if (allSelected) {
            onToggleValue(filter.id, []);
        } else {
            onToggleValue(filter.id, [...filter.values]);
        }
    };

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onToggle}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{filter.label}</span>
                    {selectedValues.length > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                            {selectedValues.length}
                        </span>
                    )}
                </div>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="px-4 pb-3 bg-gray-50">

                    <label className="flex items-center gap-2 py-2 cursor-pointer border-b border-gray-200 mb-2">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            ref={(el) => {
                                if (el) el.indeterminate = someSelected;
                            }}
                            onChange={handleSelectAll}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Select All</span>
                    </label>

                    <div className="max-h-48 overflow-y-auto space-y-2">
                        {filter.values.map((value) => (
                            <label key={value} className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-white px-2 rounded">
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(value)}
                                    onChange={() => {
                                        const newValues = selectedValues.includes(value)
                                            ? selectedValues.filter(v => v !== value)
                                            : [...selectedValues, value];
                                        onToggleValue(filter.id, newValues);
                                    }}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{value}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const FilterSidebar = ({ isOpen, onClose, appliedFilters, onApplyFilters, onResetFilters }) => {
    const [tempFilters, setTempFilters] = useState(appliedFilters);
    const [openDropdowns, setOpenDropdowns] = useState({});

    useEffect(() => {
        setTempFilters(appliedFilters);
    }, [appliedFilters]);

    const handleToggleDropdown = (filterId) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [filterId]: !prev[filterId]
        }));
    };

    const handleToggleValue = (filterId, values) => {
        setTempFilters(prev => ({
            ...prev,
            [filterId]: values
        }));
    };

    const handleApply = () => {
        onApplyFilters(tempFilters);
        onClose();
    };

    const handleReset = () => {
        const emptyFilters = {};
        FILTER_OPTIONS.forEach(filter => {
            emptyFilters[filter.id] = [];
        });
        setTempFilters(emptyFilters);
        onResetFilters();
    };

    const activeFilterCount = Object.values(tempFilters).reduce(
        (sum, values) => sum + values.length,
        0
    );

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200">
            
            <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                        {activeFilterCount > 0 && (
                            <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                {activeFilterCount} active
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-600">Filter your cost data by multiple dimensions</p>
            </div>

            {/* Filter List */}
            <div className="flex-1 overflow-y-auto">
                {FILTER_OPTIONS.map((filter) => (
                    <FilterDropdown
                        key={filter.id}
                        filter={filter}
                        selectedValues={tempFilters[filter.id] || []}
                        onToggleValue={handleToggleValue}
                        isOpen={openDropdowns[filter.id]}
                        onToggle={() => handleToggleDropdown(filter.id)}
                    />
                ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-white space-y-2">
                <button
                    onClick={handleApply}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                    Apply Filters
                </button>
                <button
                    onClick={handleReset}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                    Reset All Filters
                </button>
            </div>
        </div>
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

const CostDataTable = ({ data }) => {
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
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, index) => {
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
                                </tr>
                            );
                        })}

                        <tr className="bg-blue-50 font-semibold border-t-2 border-blue-200">
                            <td className="px-6 py-4 text-sm text-blue-700 sticky left-0 bg-blue-50">
                                Total
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('jul2025', data).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('aug2025', data).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('sep2025', data).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('oct2025', data).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('nov2025', data).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm text-blue-700 text-right">
                                ${calculateColumnTotal('dec2025', data).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-blue-700 text-right bg-blue-100">
                                ${(
                                    calculateColumnTotal('jul2025', data) +
                                    calculateColumnTotal('aug2025', data) +
                                    calculateColumnTotal('sep2025', data) +
                                    calculateColumnTotal('oct2025', data) +
                                    calculateColumnTotal('nov2025', data) +
                                    calculateColumnTotal('dec2025', data)
                                ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
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

    const initialFilters = {};
    FILTER_OPTIONS.forEach(filter => {
        initialFilters[filter.id] = [];
    });

    const [appliedFilters, setAppliedFilters] = useState(initialFilters);

    const { setPageTitle } = useOutletContext();

    useEffect(() => {
        setPageTitle("Cost Explorer");
    }, [setPageTitle]);

    // Apply filters to data
    const getFilteredData = () => {

        let filteredData = [...TABLE_DATA];

        // Apply service filter
        if (appliedFilters.service && appliedFilters.service.length > 0) {
            filteredData = filteredData.filter(row =>
                appliedFilters.service.includes(row.service)
            );
        }

        // Add more filter logic here when you have actual data with these fields
        // For now, we're only filtering by service since that's the only field in TABLE_DATA

        return filteredData;
    };

    const filteredData = getFilteredData();

    const chartSourceData = getTopNWithOthers(
        filteredData,
        selectedGroupBy,
        5
    );

    console.log("chartSourceData : ", chartSourceData);

    const chartData = generateChartDataFromTable(
        chartSourceData,
        selectedGroupBy
    );

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

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters);
    };

    const handleResetFilters = () => {
        setAppliedFilters(initialFilters);
    };

    const activeFilterCount = Object.values(appliedFilters).reduce(
        (sum, values) => sum + values.length,
        0
    );

    return (
        <div className={`transition-all duration-300 ${isFilterOpen ? 'pr-96' : ''}`}>
            <div className="p-6 space-y-4 -ml-6">
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
                            onClick={() => setIsFilterOpen(true)}
                            className="ml-auto px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer relative"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span className="text-sm font-medium">Filters</span>
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                                    {activeFilterCount}
                                </span>
                            )}
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

                <CostDataTable data={filteredData} />
            </div>

            <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                appliedFilters={appliedFilters}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />
        </div>
    );
}