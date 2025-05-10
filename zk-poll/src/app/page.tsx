"use client";

import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { useVote } from "@/store/useVote";
import { ZKPassport } from "@zkpassport/sdk";
import VoteForm from "@/components/VoteForm";

interface UserData {
  nationality: string;
  birthdate: string;
  document_number: string;
  age: number;
}

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { setVote } = useVote();
  const zkpassportRef = useRef<ZKPassport | null>(null);

  useEffect(() => {
    const initZKPassport = async () => {
      if (!zkpassportRef.current) {
        zkpassportRef.current = new ZKPassport();
      }

      const query = await zkpassportRef.current.request({
        name: "zkPoll",
        logo: "https://zkpoll.vercel.app/logo.svg",
        purpose: "Anonymous voting without double voting",
        devMode: true,
      });

      const {
        url,
        onRequestReceived,
        onGeneratingProof,
        onProofGenerated,
        onResult,
        onReject,
        onError,
      } = query
        .disclose("nationality")
        .disclose("birthdate")
        .disclose("document_number")
        .gte("age", 18)
        .done();

      setUrl(url);

      onRequestReceived(() => {
        console.log("Request received");
      });

      onGeneratingProof(() => {
        console.log("Generating proof");
      });

      onProofGenerated((proof) => {
        console.log("Proof generated:", proof);
      });

      onResult(({ verified, result: queryResult }) => {
        console.log("Result:", queryResult);
        console.log("Verified:", verified);
        if (verified && queryResult) {
          const userData: UserData = {
            nationality: queryResult.nationality as string,
            birthdate: queryResult.birthdate as string,
            document_number: queryResult.document_number as string,
            age: queryResult.age as number,
          };
          setUserData(userData);
          setVote(JSON.stringify(userData), "");
        }
      });

      onReject(() => {
        console.log("Verification rejected");
      });

      onError((error) => {
        console.error("Error during verification:", error);
      });
    };

    initZKPassport();
  }, [setVote]);

  if (!url) return <p>Generating verification link...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">zkPoll</h1>
          <p className="text-xl text-gray-600">Secure and Anonymous Voting System</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Identity Verification</h2>
            <p className="text-gray-600 mb-6">Scan the QR code to verify your identity</p>
            <div className="flex justify-center">
              <QRCode value={url} size={256} />
            </div>
            {userData && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Verification Status</h3>
                <p className="text-green-600">✓ Identity verified successfully</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Cast Your Vote</h2>
            {userData ? (
              <VoteForm />
            ) : (
              <p className="text-gray-600">Please verify your identity first to cast your vote.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
