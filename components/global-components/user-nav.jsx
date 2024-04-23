import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import useUser from "../../actions/useUser";
import createClient from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CiLogin } from "react-icons/ci";
import { MdLogin } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";

import Link from "next/link";

export default function UserNav() {
	const router = useRouter();
	const { data: user, isLoading, isFetching } = useUser();
	const queryClient = useQueryClient();
	const signOut = async () => {
		const supabase = createClient();
		queryClient.clear();
		try {
			await supabase.auth.signOut();
			return router.refresh();
		} catch (error) {
			console.log("Signout error:", error);
		}
	};

	if (isLoading || isFetching)
		return (
			<div className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 animate-pulse bg-slate-300" />
		);

	if (!user || user === null)
		return (
			<Link href={"/login"}>
				<svg
					aria-hidden="true"
					fill="none"
					focusable="false"
					width="24"
					class="header__nav-icon icon icon-account"
					viewBox="0 0 24 24"
				>
					<path
						d="M16.125 8.75c-.184 2.478-2.063 4.5-4.125 4.5s-3.944-2.021-4.125-4.5c-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5Z"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M3.017 20.747C3.783 16.5 7.922 14.25 12 14.25s8.217 2.25 8.984 6.497"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-miterlimit="10"
					></path>
				</svg>
			</Link>
		);

	// console.log(user);

	return (
		user && (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative w-8 h-8 rounded-full">
						<Avatar className="w-8 h-8">
							<AvatarImage src={user?.image_url} alt={user?.display_name} />
							<AvatarFallback>
								{user?.display_name.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{user?.display_name}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{user?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							Profile
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
						{/* <DropdownMenuItem>
							Billing
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
						</DropdownMenuItem> */}
						<DropdownMenuItem>
							Settings
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
						{/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={signOut}>
						Log out
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	);
}
