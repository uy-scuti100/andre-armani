import createClient from "../utils/supabase/client";

const redirect = (path) => {
	window.location.href = path;
};

export const signup = async (email, password, username) => {
	const supabase = createClient();

	try {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}/auth/confirm?next=/private`,
			},
		});

		await supabase.from("profiles").insert({
			username: username,
			email: email,
		});

		redirect("/verify-email?email=" + email);
	} catch (error) {
		// Handle sign-up errors appropriately
		console.error("Signup error:", error);
		// Inform the user about the error
	}
};

export const login = async (email, password) => {
	const supabase = createClient();

	try {
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			return redirect("/login?message=Could not authenticate user");
		}
		return redirect("/private");
	} catch (error) {
		// Handle sign-in errors appropriately
		console.error("Signin error:", error);
		// Inform the user about the error
	}
};
export const handleSocialLogin = async (provider) => {
	try {
		const supabase = createClient();
		let { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider,
			options: {
				redirectTo: `${window.location.origin}/auth/confirm?next=/private`,
			},
		});
		if (error) {
			console.log(error);
		}
	} catch (error) {
		console.error("Social login error:", error);
	}
};
