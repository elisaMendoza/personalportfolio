import { prisma } from '../lib/prisma.js';

// Minimal Contact CRUD (plain JS)
export async function createContact(data) {
  if (!data || !data.name || !data.email || !data.message) throw new Error('name, email and message are required');
  return prisma.contact.create({ data });
}

export async function getContact(id) {
  return prisma.contact.findUnique({ where: { id } });
}

export async function listContacts({ onlyUnread = false, skip = 0, take = 20 } = {}) {
  const where = onlyUnread ? { read: false } : {};
  return prisma.contact.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } });
}

export async function markContactRead(id) {
  return prisma.contact.update({ where: { id }, data: { read: true } });
}

export async function deleteContact(id) {
  return prisma.contact.delete({ where: { id } });
}
