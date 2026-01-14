

import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronRight, Copy, Info } from 'lucide-react';
import { toast } from 'sonner';

import onboadingImg1 from "../../assets/Onboarding1.png"
import onboadingImg2a from "../../assets/Onboarding2a.png"
import onboadingImg2b from "../../assets/Onboarding2b.png"
import onboadingImg2c from "../../assets/Onboarding2c.png"
import onboadingImg3a from "../../assets/Onboarding3a.png"
import onboadingImg3b from "../../assets/Onboarding3b.png"
import onboadingImg3c from "../../assets/Onboarding3c.png"
// import axios from '../../interceptor/AxiosRequestInterceptor';
import axiosInstance from '../../interceptor/AxiosRequestInterceptor';
import { useSelector } from 'react-redux';

const Onboarding = () => {


    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        arnNumber: '',
        accountId: '',
        accountName: '',
    });


    const validData = !!(formData.arnNumber && formData.accountId && formData.accountName);

    // console.log("validData : ", validData)
    console.log({
        arnNumber: formData.arnNumber,
        accountId: formData.accountId,
        accountName: formData.accountName,
        validData
    });

    // const [datatoCopy, setDataToCopy] = useSta?te("CK-Tuner-Role-dev2")

    const datatoCopy = "CK-Tuner-Role-dev2"

    // const [copied, setCopied] = useState(false);

    const { setPageTitle } = useOutletContext();

    useEffect(() => {
        setPageTitle("");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const reduxUser = useSelector(state => state.sidebar.user)

    if (reduxUser.role == 'Customer' || reduxUser.role == 'ReadOnly') {
        return <Navigate to='/dashboard/costexplorer' />
    }

    const steps = [
        { id: 1, name: 'Create an IAM Role', label: 'A. Create an IAM Role' },
        { id: 2, name: 'Add Customer Managed Policies', label: 'B. Add Customer Managed Policies' },
        { id: 3, name: 'Create JS Bucket', label: 'C. Create CUR' }
    ];

    const trustPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;



    // const addAccount = () => {

    //     const res = axiosInstance.post('/account', formData);

    //     console.log("Data from Account post API call : ", res);

    //     navigate("/dashboard/user");

    // }


    const handleNext = async () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);

            return;
        }

        try {
            const res = await axiosInstance.post("/account", formData);
            console.log("Data from create account API call", res)

            toast.success("Account Created Successfully")
            navigate('/dashboard/user')
        }
        catch (err) {
            console.log("En error occured: ", err);
            toast.error("Account Creation Failed")
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard/user');
    };

    // const copyToClipboard = (text) => {
    //     navigator.clipboard.writeText(text);
    //     setCopied(true)

    //     setTimeout(() => setCopied(false), 2000)
    // };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Data copied to clipboard");
        } catch (err) {
            toast.error("Failed to copy ");
            console.log("toaster Error : ", err)
        }
    };

    const getNextStepName = () => {
        if (currentStep < steps.length) {
            return steps[currentStep].name;
        }
        // else if(currentStep == steps.length){
        //     addAccount();
        // }
        return 'Complete';
    };

    const getPreviousStepName = () => {
        if (currentStep > 1) {
            return steps[currentStep - 2].name;
        }
        return '';
    };

    const isValidAccountId = /^\d{12}$/.test(formData.accountId);

    return (
        <div className="min-h-screen bg-gray-100 -mt-6 -ml-3">
           
            <div className="border-b border-gray-200 px-8 pt-4 bg-gray-50">
                <div className="flex items-center gap-10">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div>
                                <div className="flex items-center ">
                                    <div className={`flex items-center justify-center size-4 rounded-full border text-sm font-medium ${step.id < currentStep
                                        ? 'bg-white border-green-600 text-green-600'
                                        : step.id === currentStep
                                            ? 'bg-white border-green-600 text-green-600'
                                            : 'bg-white border-gray-300 text-gray-500'
                                        }`}>
                                        {step.id <= currentStep ? '✓' : ""}
                                        {/* {step.id < currentStep ? '✓' : "step.id"} */}
                                    </div>
                                    <span className={`ml-2 text-xs font-medium flex  ${step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                                        }`}>
                                        {step.label}
                                        
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            // stroke="currentColor"
                                            stroke="currentColor"
                                            className="w-5 h-5 ml-3"
                                        >
                                            <path
                                                d="M9 5l7 7-7 7"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        

                                    </span>
                                </div>
                                {index < steps.length && (
                                    <div className="flex-1 mt-3">
                                        <div className={`h-1  ${step.id <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                                            }`}></div>
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>


            <div className='mx-10 my-5'>
                <h3 className='text-2xl font-bold text-gray-700'>{currentStep == 1 ? "Create an IAM Role" : currentStep == 2 ? "Add Customer Managed Policies" : "Create Cost & Usage Report"}</h3>
                <p className='text-gray-500'>{currentStep == 1 ? "Create an IAM Role by following these steps" : currentStep == 2 ? "Create an Inline policy for the role by following these steps" : "Create a Cost & Usage Report by following these steps"}</p>
            </div>


            <div className="mx-10 bg-white rounded-lg shadow-sm">


                <div className="p-8">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                    1
                                </div>
                                <div className="flex-1">
                                    <p className="text-black">
                                        Log into AWS account & <a href="#" className="text-blue-800 underline font-bold">Create an IAM Role</a>
                                    </p>
                                </div>
                            </div>

                            
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                    2
                                </div>
                                <div className="flex-1">

                                    <p className="text-black mb-3">
                                        In the <span className="font-medium italic">Trusted entity type</span> section, select <span className="font-medium">Custom trust policy</span>. Replace the prefilled policy with the policy provided below -
                                    </p>

                                    <div className="relative" onClick={() => copyToClipboard(trustPolicy)} >
                                        <pre className="bg-gray-50 border border-gray-200 rounded p-4 text-xs font-bold max-h-64 text-blue-900 overflow-x-auto overflow-y-auto">
                                            {trustPolicy}
                                        </pre>
                                        <button

                                            className="absolute top-2 right-2 p-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                        >
                                            <Copy className="w-4 h-4 text-gray-600" />
                                        </button>

                                    </div>
                                </div>
                            </div>

                            
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                    3
                                </div>
                                <div className="flex-1">
                                    <p className="text-black">
                                        Click on <span className="font-medium">Next</span> to go to the <span className="italic">Add permissions page</span>. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on <span className="font-medium">Next</span>.
                                    </p>
                                </div>
                            </div>

                            
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                    4
                                </div>
                                <div className="flex-1">
                                    <p className="text-black mb-3">
                                        In the <span className="font-medium italic">Role name field</span>, enter the below mentioned role name, and click on <span className="font-medium">Create Role</span> -
                                    </p>
                                    {/* <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => copyToClipboard(formData.roleName)}
                                            className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                                        >
                                            <Copy className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <input
                                            type="text"
                                            value={formData.roleName}
                                            // onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                                            className="flex-1 px-3 py-2 max-w-80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div> */}

                                    <div className="relative max-w-80">
                                        
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(datatoCopy)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>

                                        
                                        <input
                                            type="text"
                                            value={datatoCopy}
                                            readOnly
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                </div>
                            </div>

                            
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                    5
                                </div>
                                <div className="flex-1">
                                    <p className="text-black mb-4">
                                        Go to the newly create IAM Role and copy the Role ARN -
                                    </p>

                                    <img src={onboadingImg1} alt="" />

                                </div>
                            </div>

                           
                            <div className="flex items-start">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                    6
                                </div>
                                <div className="flex-1">
                                    <p className="text-black mb-3">Paste the copied Role ARN below -</p>
                                    <div className="space-y-4 flex flex-row gap-16">
                                        <div className='flex flex-col'>
                                            <label className=" text-sm font-medium text-gray-600 mb-1">
                                                Enter the IAM Role ARN <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter the IAM Role ARN"
                                                maxLength={30}
                                                value={formData.arnNumber}
                                                onChange={(e) => setFormData({ ...formData, arnNumber: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            {formData.arnNumber === '' && (
                                                <p className="text-sm text-red-500 mt-5">* All field are required</p>
                                            )}
                                        </div>
                                        {/* <div className='flex flex-col'>
                                            <label className=" text-sm font-medium text-gray-600 mb-1">
                                                Account ID <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Account ID"
                                                value={formData.accountId}
                                                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div> */}
                                        <div className='flex flex-col'>
                                            <div className='flex flex-col'>
                                                <label className=" text-sm font-medium text-gray-600 mb-1">
                                                    Account ID <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    maxLength={12}
                                                    placeholder="Enter 12-digit Account ID"
                                                    value={formData.accountId}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            accountId: e.target.value.replace(/\D/g, '')
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            {!isValidAccountId && formData.accountId && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    Account ID must be 12 digits
                                                </p>
                                            )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className=" text-sm font-medium text-gray-600 mb-1">
                                                Account Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Account Name"
                                                maxLength={30}
                                                value={formData.accountName}
                                                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            {/* {console.log("FormData : ", formData)} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        // <div className="text-center py-12">
                        //     <h2 className="text-2xl font-medium mb-4">Add Customer Managed Policies</h2>
                        //     <p className="text-gray-600">Content for step 2 will be designed here</p>
                        // </div>

                        <div>

                            <div>
                                <div className="flex items-start">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            Go to the <a href="#" className="text-blue-800 underline font-bold">CK-Tuner-Role</a>
                                        </p>
                                    </div>
                                </div>

                                <img src={onboadingImg2a} alt="" className='my-7' />
                            </div>

                            <div>
                                <div className="flex items-start">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            In Permission policies, click on <strong className="text-black font-bold">Add permissions &gt; Attach Policy</strong>
                                        </p>
                                    </div>
                                </div>

                                <img src={onboadingImg2b} alt="" className='my-7' />
                            </div>

                            <div>
                                <div className="flex items-start">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            Filter by Type &gt; Customer managed then search for  <strong className="text-black font-bold">cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials</strong>
                                            and select them.
                                        </p>
                                    </div>
                                </div>

                                <img src={onboadingImg2c} alt="" className='my-7' />
                            </div>

                            <div>
                                <div className="flex items-start">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        4
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            Now, click on <strong className="text-black font-bold">Add permissions</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {currentStep === 3 && (

                        <div>
                            <div>
                                <div className="flex items-start my-5">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            Go to <a href='' className="text-blue-800 underline font-bold">Cost and Usage Reports </a>
                                            in the Billing Dashboard and click on
                                            <strong> Create report.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-start my-5">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            Name the report as shown below and select the
                                            <strong className="text-black font-bold"> Include resource IDs </strong>
                                            checkbox -
                                        </p>
                                    </div>
                                </div>

                                <div className="relative max-w-80 my-6">
                                    
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard("ck-tuner-275595855473-hourly-cur")}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>

                                    
                                    <input
                                        type="text"
                                        value={"ck-tuner-275595855473-hourly-cur"}
                                        readOnly
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <p className='text-gray-600 text-xs font-semibold my-5'>Ensure that the following configuration is checked</p>

                                <div className='flex flex-row gap-4 items-center ml-10 font-bold text-sm'>
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <p>Include Resouce IDs</p>
                                </div>
                                <p className='my-5'>Click on
                                    <b> Next</b>
                                </p>

                                <img className='w-full' src={onboadingImg3a} alt="" />
                            </div>

                            <div>
                                <div className="flex items-start my-5">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            In
                                            <i> Configure S3 Bucket, </i>
                                            provide the name of the S3 bucket that was created -
                                        </p>
                                    </div>
                                </div>

                                <p className='text-gray-600 text-xs font-semibold my-5'>Ensure that the following configuration is checked</p>

                                <div className='flex flex-row gap-4 items-center ml-10 font-bold text-sm'>
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <p>The folowing default policy will be applied to your bucket</p>
                                </div>

                                <p className='my-5'>Click on
                                    <b> Next</b>
                                </p>

                                <img className='w-full' src={onboadingImg3b} alt="" />
                            </div>

                            <div>
                                <div className="flex items-start my-5">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        4
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            In the
                                            <i> Delivery options </i>
                                            section, enter the below-mentioned Report path prefix -
                                        </p>
                                    </div>
                                </div>

                                <p className='text-gray-700 text-xs'>Report path prefix:</p>

                                <div className="relative max-w-80 my-6">
                                    
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard("275595855473")}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>

                                    
                                    <input
                                        type="text"
                                        value={"275595855473"}
                                        readOnly
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <p className='text-gray-600 text-sm my-5'>Additionally, ensure that the following checks are in place</p>
                                <p className='text-gray-600 text-sm my-5'>Time granularity:</p>

                                <div className='flex flex-row gap-3 items-center'>
                                    <input type="radio" checked disabled />
                                    <p className='text-black font-semibold'>Hourly</p>
                                </div>

                                <p className='text-gray-600 text-sm my-4'>Please make sure these checks are Enabled in <b> Enable report data integration for:</b></p>

                                <div className='flex flex-row gap-4 items-center ml-10 font-bold text-sm'>
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        disabled
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <p>Amazon Athena</p><div className='flex flex-row gap-4 items-center ml-10 font-bold text-sm'>
                                    </div>
                                </div>

                                <img className='w-full my-5' src={onboadingImg3c} alt="" />

                            </div>

                            <div>
                                <div className="flex items-start my-5">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-sm font-medium mr-3 mt-0.5">
                                        5
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-black">
                                            Click on
                                            <strong> Next. </strong>
                                            Now, review the configuration of the Cost and Usage Report. Once satisfied, click on
                                            <strong> Create Report.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        // <div className="tex
                        // t-center py-12">
                        //     <h2 className="text-2xl font-medium mb-4">Create CUR</h2>
                        //     <p className="text-gray-600">Content for step 3 will be designed here</p>
                        // </div>
                    )}
                </div>

                
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
                            // disabled={currentStep === steps.length}
                            disabled={!validData}
                            className={`px-6 py-2 rounded font-medium ${!validData
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-800 text-white hover:bg-blue-800'
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