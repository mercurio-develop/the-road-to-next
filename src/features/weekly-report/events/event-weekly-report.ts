import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { getThisFridayWindow } from "@/features/weekly-report/utils/weekly-window";

const TZ = process.env.INNGEST_TZ || "America/Lima";
const HOUR = Number(process.env.INNGEST_WEEKLY_HOUR ?? 0);
const MIN = Number(process.env.INNGEST_WEEKLY_MIN ?? 0);

export const weeklyReportFunction = inngest.createFunction(
  { id: "send-weekly-report" },
  { cron: `TZ=${TZ} ${MIN} ${HOUR} * * 5` },
  async ({ step }) => {
    await step.run("generate-weekly-digest", async () => {
      const { startUtc, endUtc } = getThisFridayWindow();
      const users = await prisma.user.findMany({
        where: {
          createdAt: {
            gte: startUtc,
            lt: endUtc,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      const comments = await prisma.comment.findMany({
        where: {
          createdAt: {
            gte: startUtc,
            lt: endUtc,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    });
    return { ok: true };
  },
);
