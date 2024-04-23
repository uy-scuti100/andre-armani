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
import { Query } from "@tanstack/react-query";
export default function UserNav() {
	const { data: user, isLoading, isFetching } = useUser();

	if (isLoading || isFetching)
		return (
			<div className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 animate-pulse bg-slate-300" />
		);

	const router = useRouter();

	const signOut = async () => {
		const supabase = createClient();

		try {
			await supabase.auth.signOut();
			Query.delete(user);
			return router.push("/login");
		} catch (error) {
			console.log("Signout error:", error);
		}
	};
	return (
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
						<p className="text-sm font-medium leading-none">shadcn</p>
						<p className="text-xs leading-none text-muted-foreground">
							m@example.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>New Team</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={signOut}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
