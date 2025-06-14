"use client";

// React & Next
import Image from "next/image";
import { useEffect, useState } from "react";

// Constants
import AuthenticationPage from "@/components/templates/auth/authentication";
import OtpPage from "@/components/templates/auth/otpPage";
import ForgetPasswordPage from "@/components/templates/auth/forgetPassword";
import ResetPasswordPage from "@/components/templates/auth/resetPassword";

// Step Types
export type ForgetPasswordStep = "phone" | "reset-password";

export default function LoginSteps() {
    const [step, setStep] = useState<ForgetPasswordStep>("phone");

    // Load from session on mount
    useEffect(() => {
        // const savedStep = sessionStorage.getItem("login-step") as Step;
        // const savedPhone = sessionStorage.getItem("login-phone");
        // if (savedStep) setStep(savedStep);
        // if (savedPhone) setPhone(savedPhone);
    }, []);

    // Save to session on change
    useEffect(() => {
        sessionStorage.setItem("login-step", step);
    }, [step]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-md mx-auto md:border border-black/20 rounded-3xl p-6">
                <Image
                    src="/images/login-logo.svg"
                    alt="login"
                    width={100}
                    height={100}
                    className="mx-auto mb-4"
                />

                {/* Step View Switcher */}
                {step === "phone" && (<ForgetPasswordPage  setStep={setStep}/>)}
                {step === "reset-password" && (<ResetPasswordPage />)}
            </div>
        </div>
    );
}
