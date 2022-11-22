class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  # before_action :authenticate_user!, except: [:index, :show]
  # before_action :correct_user, only: [:edit, :update, :destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all

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
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end

  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy

  end

  def correct_user
    @post = correct_user.posts.find_by(id: params[:id])
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
