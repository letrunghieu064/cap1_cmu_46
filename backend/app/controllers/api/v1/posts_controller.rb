class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  before_action :authenticate_request
  before_action :correct_user, only: [ :update, :destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all.includes(:user, :comments, :likes)

    render json: @posts
  end

  # GET /posts/1 or /posts/1.json
  def show
    render json: @post
  end

  # GET /posts/new
  # def new
  #   @post = Post.new
  # end

  # GET /posts/1/edit
  # def edit
  # end

  # POST /posts or /posts.json
  def create
    # @post = Post.new(post_params)
    @post = current_user.posts.build(post_params)
    if @post.save
      render json: {
        data: @post
      }, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    if correct_user
      if @post.update(post_params)
        render json: { data: @post}
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
      render json: {message: 'Delete post successfully'}, status: :ok
    else
      render json: {message: 'Incorrect user'}
    end
  end

  def correct_user
    @post = current_user.posts.find_by(id: params[:id])
  end

  def search
    find params[:name]
  end

  def find(name)
    post = Post.where("name like ?", "%#{name}%")
    if post.nil?
      render json: post
    else
      render json: {message: 'Post name does not exists'}
    end
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
