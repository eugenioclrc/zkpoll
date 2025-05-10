"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useVote } from "@/store/useVote";
import VoteForm from '@/components/RegistrationForm';   // ← aquí lo importás


export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const { setVote } = useVote();

  useEffect(() => {
    fetch("/api/zkpassport")
      .then((r) => r.json())
      .then(({ url }) => setUrl(url));
  }, []);

  // Listener de resultados que envía ZKPassport por WS
  useEffect(() => {
    if (!url) return;
    const socket = new WebSocket(url.replace("https://", "wss://"));
    socket.onmessage = (evt) => {
      const res = JSON.parse(evt.data);
      if (res.verified) {
        // usá res.uniqueIdentifier como nullifier
        setVote(res.uniqueIdentifier, "");
      }
    };
    return () => socket.close();
  }, [url, setVote]);

  if (!url) return <p>Generando link de verificación…</p>;

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">zkPoll</h1>
      <p>Escaneá para verificar identidad y emitir tu voto</p>
      <QRCode value={url} />
      {/* Render de opciones de voto */}
      <VoteForm />
    </div>
  );
}
