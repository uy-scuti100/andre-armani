import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
	const supabase = createClient();

	const { data } = await supabase.auth.getUser();
	console.log("data:", data);

	return <p>Hello</p>;
}
