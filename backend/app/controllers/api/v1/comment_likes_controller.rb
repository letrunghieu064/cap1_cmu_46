class Api::V1::CommentLikesController < ApplicationController
  before_action :set_comment_like, only: %i[ show edit update destroy ]

  # GET /comment_likes or /comment_likes.json
  def index
    @comment_likes = CommentLike.all

    render json: @comment_likes
  end

  # GET /comment_likes/1 or /comment_likes/1.json
  def show
    render json: comment_like
  end

  # GET /comment_likes/new
  def new
    @comment_like = CommentLike.new
  end

  # GET /comment_likes/1/edit
  def edit
  end

  # POST /comment_likes or /comment_likes.json
  def create
    @comment_like = CommentLike.new(comment_like_params)

    if @comment_like.save
      render json: @comment_like, status: :created
    else
      render json: @comment_like, status: :unprocessable_entity
    end

    # respond_to do |format|
    #   if @comment_like.save
    #     format.html { redirect_to comment_like_url(@comment_like), notice: "Comment like was successfully created." }
    #     format.json { render :show, status: :created, location: @comment_like }
    #   else
    #     format.html { render :new, status: :unprocessable_entity }
    #     format.json { render json: @comment_like.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /comment_likes/1 or /comment_likes/1.json
  def update
    if @comment_like.update(comment_like_params)
      render json: @comment_like
    else
      render json: @comment_like.errors, status: :unprocessable_entity
    end

    # respond_to do |format|
    #   if @comment_like.update(comment_like_params)
    #     format.html { redirect_to comment_like_url(@comment_like), notice: "Comment like was successfully updated." }
    #     format.json { render :show, status: :ok, location: @comment_like }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @comment_like.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /comment_likes/1 or /comment_likes/1.json
  def destroy
    @comment_like.destroy

    # respond_to do |format|
    #   format.html { redirect_to comment_likes_url, notice: "Comment like was successfully destroyed." }
    #   format.json { head :no_content }
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment_like
      @comment_like = CommentLike.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_like_params
      params.require(:comment_like).permit(:count, :comment_id)
    end
end
