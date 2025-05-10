import { NextResponse } from "next/server";
import { ZKPassport } from "@zkpassport/sdk";

export async function GET() {
  const zk = new ZKPassport(process.env.NEXT_PUBLIC_ZK_PASSPORT_DOMAIN);

  const query = await zk.request({
    name: "zkPoll Demo",
    devMode: true,
    logo: "https://zkpoll.vercel.app/logo.svg",
    purpose: "Demostrar una votación anónima sin doble voto"
  });

  const { url } = query
    .disclose("firstname")      // opcional, demo
    .gte("age", 18)             // asegurarse de +18
    .done();

  return NextResponse.json({ url });
} 