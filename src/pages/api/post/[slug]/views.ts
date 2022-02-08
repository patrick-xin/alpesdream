import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@/common/types";
import middleware from "@/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.get(async ({ query, db }, res) => {
  const slug = query.slug as string;
  const data = await db.post.findFirst({
    where: { slug },
    select: { view_count: true },
  });

  res.status(200).json({
    views: data?.view_count,
  });
});

handler.post(async ({ query, db }, res) => {
  const slug = query.slug as string;

  const data = await db.post.update({
    where: { slug },
    data: {
      view_count: { increment: 1 },
    },
  });

  return res.status(200).json({
    views: data.view_count,
  });
});

export default handler;
