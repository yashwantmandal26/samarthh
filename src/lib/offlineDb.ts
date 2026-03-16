/**
 * @file offlineDb.ts
 * @description Lightweight localStorage-based persistence layer for Samarth.
 * Replaces Supabase with fully offline storage for conversations,
 * chat messages, and user profiles.
 */

const KEYS = {
  conversations: "samarth_conversations",
  messages: "samarth_messages",
  profiles: "samarth_profiles",
} as const;

export interface StoredConversation {
  id: string;
  session_id: string;
  created_at: string;
  updated_at: string;
}

export interface StoredMessage {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
}

export interface StoredProfile {
  session_id: string;
  age?: number;
  gender?: string;
  category?: string;
  income?: number;
  annual_income?: number;
  occupation?: string;
  rural_or_urban?: string;
  special_status?: string;
  ration_card_type?: string;
  marital_status?: string;
  owns_land?: boolean;
  updated_at: string;
}

function generateId(): string {
  return crypto.randomUUID?.() || Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function readStore<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStore<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

/** Create a new conversation and return its ID */
export function createConversation(sessionId: string): string {
  const conversations = readStore<StoredConversation>(KEYS.conversations);
  const now = new Date().toISOString();
  const id = generateId();
  conversations.push({ id, session_id: sessionId, created_at: now, updated_at: now });
  writeStore(KEYS.conversations, conversations);
  return id;
}

/** Save a chat message to a conversation */
export function saveMessage(conversationId: string, role: string, content: string): void {
  const messages = readStore<StoredMessage>(KEYS.messages);
  messages.push({
    id: generateId(),
    conversation_id: conversationId,
    role,
    content,
    created_at: new Date().toISOString(),
  });
  writeStore(KEYS.messages, messages);
}

/** Save or update a user profile keyed by session ID */
export function saveProfile(sessionId: string, profile: Record<string, unknown>): void {
  const profiles = readStore<StoredProfile>(KEYS.profiles);
  const idx = profiles.findIndex((p) => p.session_id === sessionId);
  const entry: StoredProfile = {
    ...profile,
    session_id: sessionId,
    updated_at: new Date().toISOString(),
  } as StoredProfile;

  if (idx >= 0) {
    profiles[idx] = entry;
  } else {
    profiles.push(entry);
  }
  writeStore(KEYS.profiles, profiles);
}

/** Get all messages for a conversation */
export function getMessages(conversationId: string): StoredMessage[] {
  return readStore<StoredMessage>(KEYS.messages).filter(
    (m) => m.conversation_id === conversationId
  );
}

/** Get all conversations */
export function getConversations(): StoredConversation[] {
  return readStore<StoredConversation>(KEYS.conversations);
}

/** Clear all Samarth data from localStorage */
export function clearAllData(): void {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}
