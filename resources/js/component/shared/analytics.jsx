import React, { useEffect, useState, useCallback } from "react";
import StatCard from "./statCard";
import { FaMale, FaFemale, FaMoneyCheck, FaInfoCircle } from "react-icons/fa";
import { fetchAnalytics } from "../Services/Employee";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Analytics = ({ setLoader }) => {
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [avgAge, setAvgAge] = useState(0);
    const [monthlySalary, setMonthlySalary] = useState(0);
    const [totalEmployee, setTotalEmployee] = useState(0);
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(0);
    const [averageSalary, setAverageSalary] = useState(0);

    const handleFetch = useCallback(async () => {
        try {
            setLoader(true);
            const data = await fetchAnalytics();
            if (data) {
                console.log(data);
                setMaleCount(data.male);
                setFemaleCount(data.female);
                setAvgAge(data.averageAge);
                setMonthlySalary(data.totalMonthlySalary);
                setTotalEmployee(data.male + data.female);
                setMinAge(data.lowAge);
                setMaxAge(data.highAge);
                setAverageSalary(data.averageMonhtlySalary);
            }
        } catch (error) {
            // console.log(error);
            toastr.error("Something went wrong.", "Error");
        } finally {
            setLoader(false);
        }
    }, [setLoader]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch]);
    return (
        <div className="p-10 flex justify-center">
            <div className="grid grid-cols-2 gap-8 ">
                <StatCard
                    icon={<FaMale></FaMale>}
                    label={"Male"}
                    value={maleCount}
                    description={`Out of ${totalEmployee} employees`}
                ></StatCard>

                <StatCard
                    icon={<FaFemale></FaFemale>}
                    label={"Female"}
                    value={femaleCount}
                    description={`Out of ${totalEmployee} employees`}
                ></StatCard>

                <StatCard
                    icon={<FaInfoCircle></FaInfoCircle>}
                    label={"Average Age"}
                    value={avgAge}
                    description={`Highest : ${maxAge} | Lowest : ${minAge}`}
                ></StatCard>

                <StatCard
                    icon={<FaMoneyCheck></FaMoneyCheck>}
                    label={"Total Monthly Salary"}
                    value={monthlySalary}
                    description={`Average : ${parseInt(
                        averageSalary
                    ).toLocaleString()}`}
                ></StatCard>
            </div>
        </div>
    );
};

export default Analytics;
