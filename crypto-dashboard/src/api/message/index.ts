import { axiosClient } from '..'
import { API_URL } from '../../util/env'

const MessageUrls = {
  sendMessage: `${API_URL.api_url}/api/message/send`,
  unseenMessages: (userId: string) =>
    `${API_URL.api_url}/api/message/unseen/${userId}`,
  fetchMessages: (userId: string) => `${API_URL.api_url}/api/message/${userId}`,
  getMessage: (messageId: string) =>
    `${API_URL.api_url}/api/message/find/${messageId}`,
  markAsViewed: (messageId: string) =>
    `${API_URL.api_url}/api/message/${messageId}/view`,
}

export const MessageUrlsApi = {
  sendMessage: async ({
    senderId,
    receiverId,
    subject,
    content,
  }: {
    senderId: string
    receiverId: string
    subject: string
    content: string
  }) =>
    axiosClient
      .post(MessageUrls.sendMessage, { senderId, receiverId, subject, content })
      .then((res) => res.data),

  getUnseenMessagesCount: async (userId: string) =>
    axiosClient.get(MessageUrls.unseenMessages(userId)).then((res) => res.data),

  fetchMessages: async (userId: string) =>
    axiosClient.get(MessageUrls.fetchMessages(userId)).then((res) => res.data),

  getMessage: async (messageId: string) =>
    axiosClient.get(MessageUrls.getMessage(messageId)).then((res) => res.data),

  markAsViewed: async (messageId: string) =>
    axiosClient
      .patch(MessageUrls.markAsViewed(messageId))
      .then((res) => res.data),
}
