import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET(request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const origin = requestUrl.origin;

	if (code) {
		const supabase = createServerClient();
		await supabase.auth.exchangeCodeForSession(code);
	}

	// URL to redirect to after sign up process completes
	return NextResponse.redirect(`${origin}/private`);
}
