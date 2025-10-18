import prisma from "@/lib/prisma";

export const ToolService = {
  getToolById: async (id: string) => {
    return prisma.tools.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        icon: true,
        iconType: true,
        group: true,
        shortDescription: true,
      },
    });
  },

  getAllTools: async () => {
    return prisma.tools.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
        iconType: true,
        group: true,
        shortDescription: true,
      },
    });
  },
};
