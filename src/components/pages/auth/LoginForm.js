'use client'

import Logo from "components/shared/Logo";
import {Key01Icon, Mail02Icon} from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import Input from "components/ui/form/Input";

export default function LoginForm() {
    return (
        <div>
            <Logo width={180} height={40}/>
            <div className="h-7 sm:h-10"/>
            <div className="mb-6 flex flex-col gap-2 md:gap-4">
                <h1 className="text-2xl font-semibold text-neutral-600">LOGIN</h1>
                <p className="text-[11px] md:text-xs text-neutral-500">Welcome back! Enter your credentials to access your account</p>
            </div>
            <form className="flex flex-col gap-4 md:gap-6">
                <Input
                    type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength="3" maxLength="30" title="Only letters, numbers or dash"
                    icon={<Mail02Icon size={16} className="text-neutral-500"/>}
                    validator={<>
                        Must be 3 to 30 characters
                        <br/>containing only letters, numbers or dash</>}/>
                <Input
                    type="password" required placeholder="Password" minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    icon={<Key01Icon size={16} className="text-neutral-500"/>}
                    validator={<>
                        Must be more than 8 characters, including
                        <br/>At least one number
                        <br/>At least one lowercase letter
                        <br/>At least one uppercase letter</>}/>
                <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-xs text-primary-500">Forgot Password?</Link>
                </div>
                <div>
                    <button className="btn btn-primary w-full">Login</button>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-xs">
                        Do not have account? <Link href={'/register'} className="font-semibold text-primary-500">Create
                        Account</Link>
                    </p>
                </div>
                <div className="divider text-xs font-semibold text-neutral-500 my-1 md:my-4">Or</div>
                <button className="btn btn-soft w-full text-xs text-neutral-500 bg-neutral-100">
                    <Image
                        src="/images/logos/social/google.svg"
                        alt="google"
                        width={20}
                        height={20}/>
                    Sign In With Google
                </button>
            </form>
        </div>
    )
}
