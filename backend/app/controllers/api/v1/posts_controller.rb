class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: [:index, :show]
  before_action :correct_user, only: [:edit, :update, :destroy]

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
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end

    # respond_to do |format|
    #   if @post.save
    #     format.html { redirect_to post_url(@post), notice: "Post was successfully created." }
    #     format.json { render :show, status: :created, location: @post }
    #   else
    #     format.html { render :new, status: :unprocessable_entity }
    #     format.json { render json: @post.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    @post = current_user.posts.build(post_params)
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end

    # respond_to do |format|
    #   if @post.update(post_params)
    #     format.html { redirect_to post_url(@post), notice: "Post was successfully updated." }
    #     format.json { render :show, status: :ok, location: @post }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @post.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy

    # respond_to do |format|
    #   format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
    #   format.json { head :no_content }
    # end
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
      params.require(:post).permit(:name, :img_url, :description, :status, :address, :user_id, :district_id)
    end
end
