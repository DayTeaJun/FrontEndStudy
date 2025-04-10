"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { constSelector } from "recoil";

// login <-> sigup 페이지 전환용도 setView
export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confrimationRequired, setConfrimationRequired] = useState(false);

  const supabase = createBrowserSupabaseClient();

  const signUpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // 회원가입이 다 처리 완료 후 아래 url로 redirect
          emailRedirectTo: "http://localhost:3000/signup/confirm",
        },
      });
      if (data) {
        setConfrimationRequired(true);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
      });
      if (data) {
        console.log(data);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <img src={"/images/inflearngram.png"} alt="" className="w-60 mb-6" />
        {confrimationRequired ? (
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            label="otp"
            type="number"
            className="w-full"
            placeholder="6자리 숫자 인증코드를 입력해주세요."
          />
        ) : (
          <>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="email"
              type="email"
              className="w-full"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              type="password"
              className="w-full"
            />
          </>
        )}

        <Button
          onClick={() => {
            if (confrimationRequired) {
              verifyOtpMutation.mutate();
            } else {
              signUpMutation.mutate();
            }
          }}
          loading={
            confrimationRequired
              ? verifyOtpMutation.isPending
              : signUpMutation.isPending
          }
          disabled={
            confrimationRequired
              ? verifyOtpMutation.isPending
              : signUpMutation.isPending
          }
          color="light-blue"
          className="w-full text-md py-1"
        >
          {confrimationRequired ? "인증하기" : "가입하기"}
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        이미 계정이 있으신가요?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNUP")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
