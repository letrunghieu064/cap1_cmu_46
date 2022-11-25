class Api::V1::Admin::PostsController < AdminBaseController
  before_action :set_post, only: %i[ update destroy ]

  def update
    if @post.update(post_params)
      render json: {data: @post}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    render json: {message: "Delete post with id:#{@post.id} successfully"}, status: :ok
  end

  private
  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:status)
  end

end
