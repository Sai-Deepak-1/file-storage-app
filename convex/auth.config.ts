const clerkConfig = {
  providers: [
    {
      domain: process.env.CLERK_DOMAIN,
      applicationID: "convex",
    },
  ],
};

export default clerkConfig;