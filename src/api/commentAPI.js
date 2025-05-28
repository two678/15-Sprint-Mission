import baseAPI from "./axios";

export const commentAPI = {
  post: async (productId, content) => {
    try {
      const response = await baseAPI.post(`/products/${productId}/comments`, {
        content,
      });
      return response.data;
    } catch (error) {
      console.error("댓글 작성 실패", error);
      throw new Error("댓글 작성 실패");
    }
  },
  patch: async (commentId, content) => {
    try {
      const response = await baseAPI.patch(`/comments/${commentId}`, {
        content,
      });
      return response.data;
    } catch (error) {
      console.error("댓글 수정 실패", error);
      throw new Error("댓글 수정 실패");
    }
  },
  delete: async (commentId) => {
    try {
      const response = await baseAPI.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error("댓글 삭제 실패", error);
      throw new Error("댓글 삭제 실패");
    }
  },
};
