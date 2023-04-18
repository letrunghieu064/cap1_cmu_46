class Api::V1::LikesController < ApplicationController
  before_action :set_like, only: %i[ show edit update destroy ]
  before_action :correct_user, only: [ :update, :destroy]
  # GET /likes or /likes.json
  def index
    @likes = Like.all

    render json: @likes
  end

  # GET /likes/1 or /likes/1.json
  def show
    # render json: @like
    if correct_user
      @likes = Like.all
      render json: { statusCode: 200 ,  message: 'Delete post successfully'}, status: :ok
    else
      render json: {message: 'Incorrect user'}
    end
  end

  # GET /likes/new
  # def new
  #   @like = Like.new
  # end

  # GET /likes/1/edit
  # def edit
  # end

  # POST /likes or /likes.json
  def create
    @like = Like.new(like_params)

    if @like.save
      render json: Like.all, status: :created
    else
      render json: @like.errors, status: :unprocessable_entity
    end
    # respond_to do |format|
    #   if @like.save
    #     format.html { redirect_to like_url(@like), notice: "Like was successfully created." }
    #     format.json { render :show, status: :created, location: @like }
    #   else
    #     format.html { render :new, status: :unprocessable_entity }
    #     format.json { render json: @like.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /likes/1 or /likes/1.json
  def update
    if @like.update(like_params)
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end

    # respond_to do |format|
    #   if @like.update(like_params)
    #     format.html { redirect_to like_url(@like), notice: "Like was successfully updated." }
    #     format.json { render :show, status: :ok, location: @like }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @like.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /likes/1 or /likes/1.json
  def destroy
    if correct_user
      @like.destroy
      render json: { statusCode: 200 , data: Like.all , message: 'Delete Like Of Post  successfully'}, status: :ok
    else
      render json: {message: 'Incorrect user'}
    end
  end
  def correct_user
    @like = current_user.likes.find_by(post_id: params[:id])
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_like
      @like = Like.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def like_params
      params.require(:like).permit(:post_id, :user_id)
    end
end
