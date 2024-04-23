"use client";
import { Button } from "../../../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleSocialLogin, login, signup } from "../../../actions/client-auth";
import { createClient } from "../../../utils/supabase/client";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signingIn, setSigningIn] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);
	const [google, setGoogle] = useState(false);
	const router = useRouter();

	const handleSignUp = async () => {
		setSigningIn(true);
		try {
			await signup(email, password);
		} catch (error) {
			console.log(error);
			console.error("Signup error:", error);
		} finally {
			setSigningIn(false);
			setEmail("");
			setPassword("");
		}
	};
	const handleSignIn = async () => {
		setLoggingIn(true);
		try {
			await login(email, password);
		} catch (error) {
			console.error("Signin error:", error);
		} finally {
			setLoggingIn(false);
			setEmail("");
			setPassword("");
		}
	};

	const handleSocialLoginClick = async (provider) => {
		setGoogle(true);
		try {
			await handleSocialLogin(provider);
		} catch (error) {
			console.error("Social login error:", error);
		}
	};
	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="grid justify-center">
				<Card className="border-none shadow-none">
					<CardHeader className="space-y-2">
						<CardTitle className="text-2xl text-center capitalize grot">
							Create an account
						</CardTitle>
						<CardDescription className="text-center">
							Enter your info below to create your account
						</CardDescription>
					</CardHeader>

					<CardContent className="grid gap-4">
						<div className="w-full animate-in">
							<div className="grid gap-2 mb-5">
								<Label htmlFor="email" className="opacity-50 text-md">
									Email
								</Label>
								<Input
									name="email"
									placeholder="you@example.com"
									value={email}
									disabled={loggingIn || signingIn}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2 mb-10">
								<Label htmlFor="password" className="opacity-50 text-md">
									Password
								</Label>
								<Input
									type="password"
									name="password"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={loggingIn || signingIn}
								/>
							</div>

							<Button
								onClick={handleSignUp}
								disabled={
									signingIn || email.length === 0 || password.length === 0
								}
								className="inline-flex items-center justify-center w-full py-3 mb-6 text-sm font-medium transition-colors rounded-md shadow whitespace-nowrap disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
								// pendingText="Signing up..."
							>
								{signingIn ? "Signing up..." : "Sign Up"}
							</Button>

							<p className="mb-5 text-sm text-center first-letter:uppercase">
								already have an account?
							</p>
							<Button
								onClick={handleSignIn}
								disabled={
									loggingIn || email.length === 0 || password.length === 0
								}
								className="w-full px-4 py-2 mb-2 border rounded-md border-foreground/20 text-foreground bg-background hover:bg-secondary/90 disabled:cursor-not-allowed"
							>
								{loggingIn ? "Logging In ..." : "Log in"}
							</Button>
						</div>
						<div className="relative mt-5">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="px-2 bg-background text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<div className="grid grid-cols-1">
							<Button
								variant="outline"
								onClick={() => handleSocialLoginClick("google")}
								disabled={google}
								className="flex items-center justify-center disabled:cursor-not-allowed"
							>
								{google && <FiLoader className="mr-2 animate-spin" />}
								<FcGoogle className="w-4 h-4 mr-2" />
								Google
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
