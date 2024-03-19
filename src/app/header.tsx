import { OrganizationSwitcher, UserButton, UserProfile } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto flex justify-between">
        <div>FileDrive</div>
        <div className="flex gap-5">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
