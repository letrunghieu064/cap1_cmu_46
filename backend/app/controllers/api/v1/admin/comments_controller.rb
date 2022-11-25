class Api::V1::Admin::CommentsController < AdminBaseController
  before_action :set_comment, only: %i[ destroy ]

  def destroy
    @comment.destroy
    render json: {message: "Delete comment with id:#{@comment.id} successfully"}, status: :ok
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end
end
