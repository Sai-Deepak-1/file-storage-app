"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  useSession,
  SignOutButton,
  SignedOut,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  // console.log(user.user);
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const file = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);
  const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {file?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({ name: "Hello World", orgId });
        }}
      >
        Create a File
      </Button>
    </main>
  );
}
