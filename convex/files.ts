import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { error } from "console";

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) {
      throw new ConvexError(" You Must be Logged In to Upload a File! ");
    }

    const user = await getUser(ctx, identity.tokenIdentifier);

    if (!user.orgIds.includes(args.orgId) && user.tokenIdentifier!=identity.tokenIdentifier) {
      throw new ConvexError("You do not have access  to this Organization");
    }

    await ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
    });
  },
});

export const getFiles = query({
  args: { orgId: v.string() },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) {
      return [];
    }
    return ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});
