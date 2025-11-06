import { prisma } from '../lib/prisma.js';

// Minimal Project CRUD (no slug, plain JS)
export async function createProject(data) {
  if (!data || !data.title) throw new Error('title is required');
  return prisma.project.create({ data });
}

export async function getProjectById(id) {
  return prisma.project.findUnique({ where: { id } });
}

export async function listProjects({ skip = 0, take = 20, publishedOnly = false } = {}) {
  const where = publishedOnly ? { published: true } : {};
  return prisma.project.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } });
}

export async function updateProject(id, patch) {
  return prisma.project.update({ where: { id }, data: patch });
}

export async function deleteProject(id) {
  return prisma.project.delete({ where: { id } });
}
