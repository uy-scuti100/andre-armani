import { useQuery } from "@tanstack/react-query";
import createClient from "../utils/supabase/client";

const initialUser = {
	created_at: "",
	display_name: "",
	email: "",
	id: "",
	image_url: "",
};
export default function useUser() {
	const supabase = createClient();
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { data: currentUser } = await supabase.auth.getUser();
			const id = currentUser.user?.id;

			if (id) {
				const { data: user } = await supabase
					.from("profiles")
					.select("*")
					.eq("id", id)
					.single();
				return user;
			}
			return initialUser;
		},
	});
}
