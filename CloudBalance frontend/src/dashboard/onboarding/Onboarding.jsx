// import { useEffect } from "react";
// import { useOutletContext } from "react-router-dom";

// export const Onboarding = () => {

//     const { setPageTitle } = useOutletContext();

//     useEffect(() => {
//         setPageTitle("");

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     return (
//         <>
//             <div className="bg-gray-50 -mt-6 p-5 -ml-5">

//                 <div className="">

//                 <div className="flex flex-row gap-2 ">
//                     <div>
//                         <img src="" alt="" />
//                         <h6>A. Create an IAM Role</h6>
//                     </div>
//                     <div>
//                         <img src="" alt="" />
//                         <h6>B. Add Customer Managed Policies</h6>
//                     </div>
//                     <div>
//                         <img src="" alt="" />
//                         <h6>C. Create CUR</h6>
//                     </div>
//                 </div>
//                 </div>

//             </div>
//         </>
//     )
// }

import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronRight, Copy, Info } from 'lucide-react';

const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        roleArn: '',
        accountId: '',
        accountName: '',
        roleName: 'CK-Tuner-Role-dev2'
    });

    const { setPageTitle } = useOutletContext();

    useEffect(() => {
        setPageTitle("");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const steps = [
        { id: 1, name: 'Create an IAM Role', label: 'A. Create an IAM Role' },
        { id: 2, name: 'Add Customer Managed Policies', label: 'B. Add Customer Managed Policies' },
        { id: 3, name: 'Create JS Bucket', label: 'C. Create JS Bucket' }
    ];

    const trustPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard.user');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const getNextStepName = () => {
        if (currentStep < steps.length) {
            return steps[currentStep].name;
        }
        return 'Complete';
    };

    const getPreviousStepName = () => {
        if (currentStep > 1) {
            return steps[currentStep - 2].name;
        }
        return '';
    };

    return (
        <div className="min-h-screen bg-gray-50 -mt-6 -ml-3">
            {/* Progress Bar */}
            <div className="border-b border-gray-200 px-8 pt-4">
                <div className="flex items-center gap-10">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div>
                                <div className="flex items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${step.id < currentStep
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : step.id === currentStep
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'bg-white border-gray-300 text-gray-500'
                                        }`}>
                                        {step.id < currentStep ? '✓' : ""}
                                        {/* {step.id < currentStep ? '✓' : "step.id"} */}
                                    </div>
                                    <span className={`ml-2 text-sm font-medium ${step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="flex-1 mt-4">
                                        <div className={`h-1 rounded ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                            }`}></div>
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>


            <div className='mx-10 my-5'>
                <h3 className='text-2xl font-bold text-gray-700'>Create an IAM Role</h3>
                <p className='text-gray-500'>Create an IAM Role by following these steps</p>
            </div>


            <div className="mx-10 bg-white rounded-lg shadow-sm">


                {/* Content */}
                <div className="p-8">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            {/* Step 1 */}
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3 mt-0.5">
                                    1
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700">
                                        Log into AWS account & <a href="#" className="text-blue-600 underline">Create an IAM Role</a>
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3 mt-0.5">
                                    2
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 mb-3">
                                        In the <span className="font-medium italic">Trusted entity type</span> section, select <span className="font-medium">Custom trust policy</span>. Replace the prefilled policy with the policy provided below -
                                    </p>
                                    <div className="relative">
                                        <pre className="bg-gray-50 border border-gray-200 rounded p-4 text-sm font-mono overflow-x-auto">
                                            {trustPolicy}
                                        </pre>
                                        <button
                                            onClick={() => copyToClipboard(trustPolicy)}
                                            className="absolute top-2 right-2 p-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                        >
                                            <Copy className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3 mt-0.5">
                                    3
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700">
                                        Click on <span className="font-medium">Next</span> to go to the <span className="italic">Add permissions page</span>. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on <span className="font-medium">Next</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3 mt-0.5">
                                    4
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 mb-3">
                                        In the <span className="font-medium italic">Role name field</span>, enter the below mentioned role name, and click on <span className="font-medium">Create Role</span> -
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={formData.roleName}
                                            onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={() => copyToClipboard(formData.roleName)}
                                            className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                                        >
                                            <Copy className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3 mt-0.5">
                                    5
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 mb-4">
                                        Go to the newly create IAM Role and copy the Role ARN -
                                    </p>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">IAM</span>
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">Roles</span>
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">CloudKeeper</span>
                                            </div>
                                            <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                                Delete
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-normal">CK-Tuner-Role <span className="text-blue-600 text-sm ml-2 cursor-pointer">Info</span></h2>
                                        </div>
                                        <div className="border border-gray-300 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-medium">Summary</h3>
                                                <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Creation date</p>
                                                    <p className="text-sm">August 30, 2024, 17:06 (UTC+05:30)</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">ARN</p>
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-sm">arn:aws:iam::123456789012:role/CK-Tuner-Role</code>
                                                        <Copy className="w-4 h-4 text-gray-400 cursor-pointer" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Last activity</p>
                                                    <p className="text-sm text-green-600">✓ 2 days ago</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-1">Maximum session duration</p>
                                                    <p className="text-sm">1 hour</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3 mt-0.5">
                                    6
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 mb-3">Paste the copied Role ARN below -</p>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Enter the IAM Role ARN <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter the IAM Role ARN"
                                                value={formData.roleArn}
                                                onChange={(e) => setFormData({ ...formData, roleArn: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            {formData.roleArn === '' && (
                                                <p className="text-sm text-red-500 mt-1">*This field is required</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Account ID <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Account ID"
                                                value={formData.accountId}
                                                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Account Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Account Name"
                                                value={formData.accountName}
                                                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-medium mb-4">Add Customer Managed Policies</h2>
                            <p className="text-gray-600">Content for step 2 will be designed here</p>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-medium mb-4">Create JS Bucket</h2>
                            <p className="text-gray-600">Content for step 3 will be designed here</p>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                    >
                        Cancel
                    </button>
                    <div className="flex items-center gap-3">
                        {currentStep > 1 && (
                            <button
                                onClick={handlePrevious}
                                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                            >
                                Back - {getPreviousStepName()}
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={currentStep === steps.length}
                            className={`px-6 py-2 rounded font-medium ${currentStep === steps.length
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            Next - {getNextStepName()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;