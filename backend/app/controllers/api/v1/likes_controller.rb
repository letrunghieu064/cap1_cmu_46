class Api::V1::LikesController < ApplicationController
  before_action :set_like, only: %i[ show edit update destroy ]

  # GET /likes or /likes.json
  def index
    @likes = Like.all

    render json: @likes
  end

  # GET /likes/1 or /likes/1.json
  def show
    render json: @like
  end

  # GET /likes/new
  def new
    @like = Like.new
  end

  # GET /likes/1/edit
  def edit
  end

  # POST /likes or /likes.json
  def create
    @like = Like.new(like_params)

    if like.save
      render json: @like, status: :created, location: @like
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
    @like.destroy

    # respond_to do |format|
    #   format.html { redirect_to likes_url, notice: "Like was successfully destroyed." }
    #   format.json { head :no_content }
    # end
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
