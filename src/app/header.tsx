import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignInButton, SignOutButton, UserButton, UserProfile, SignedIn, SignedOut } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto flex justify-between">
        <div>FileDrive</div>
        <div className="flex gap-5">
          <OrganizationSwitcher />
          <UserButton />
          <SignedIn>
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
