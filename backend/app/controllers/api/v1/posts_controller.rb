class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  before_action :authenticate_request
  before_action :correct_user, only: [ :update, :destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all.includes(:user, {comments: :user}, :likes).order(created_at: :DESC)

    render json: @posts
  end

  # GET /posts/1 or /posts/1.json
  def show
    render json: @post
  end
  def getpost
    @posts=Post.all
    render json: @posts
  end

  # GET /posts/new
  # def new
  #   @post = Post.new
  # end

  # GET /posts/1/editdef search
# def search
#     @post= Post.where("name LIKE ?", params[:name] + "%")
#     if @post
#       binding.pry
#       render json: @post
#     else
#       render json: "no resutf", status: :unprocessable_entity
#     end
# end
#   post = Post.where("name like ?", "%#{name}%")
def search
  find params[:name]
end

def find(name)
  post = Post.where("name like ?", "%#{name}%")
  if post
    render json: post
  else
    render json: {message: 'Post name does not exists'}
  end
end
  # POST /posts or /posts.json
  def create
    # @post = Post.new(post_params)
    @post = current_user.posts.build(post_params)
    
    #@post.user = current_user;
    if @post.save
      render json: Post.last
    else
      render json: @post.errors, status: :unprocessable_entity
    end

  end
  # def search
  #   @post= Post.where("name LIKE ?", params[:name] + "%")
  #   if @post
  #     binding.pry
  #     render json: @post
  #   else
  #     render json: "no resutf", status: :unprocessable_entity
  #   end
  # end
 
  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    if correct_user
      if @post.update(post_params)
        render json: {statusCode: 200 , data: @post}
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    else
      render json: {message: 'Incorrect user'}
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    if correct_user
      @post.destroy
      render json: { statusCode: 200 ,  message: 'Delete post successfully'}, status: :ok
    else
      render json: {message: 'Incorrect user'}
    end
  end

  def correct_user
    @post = current_user.posts.find_by(id: params[:id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:name, :img_url, :description, :status, :address, :longitude, :latitude, :user_id)
    end
end
