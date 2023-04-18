class Api::V1::Admin::PostsController < AdminBaseController
  before_action :set_post, only: %i[ update destroy ]

  def getpost
    @posts=Post.all
    render json: {data: @posts}
  end
  def update
    if @post.update(post_params)
      render json: {statusCode: 200, data: Post.all}
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    render json: {statusCode: 200 ,message: "Delete post with id:#{@post.id} successfully"}, status: :ok
  end

  private
  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:status)
  end

end
