class Api::V1::FollowsController < ApplicationController
  before_action :set_follow, only: %i[ show edit update destroy ]

  # GET /follows or /follows.json
  def index
    @follows = Follow.all

    render json: @follows
  end

  # GET /follows/1 or /follows/1.json
  def show
    render json: @follow
  end

  # GET /follows/new
  def new
    @follow = Follow.new
  end

  # GET /follows/1/edit
  def edit
  end

  # POST /follows or /follows.json
  def create
    @follow = Follow.new(follow_params)

    if @follow.save
      render json: @follow, status: :created, location: @follow
    else
      render json: @follow.errors, status: :unprocessable_entity
    end

    # respond_to do |format|
    #   if @follow.save
    #     format.html { redirect_to follow_url(@follow), notice: "Follow was successfully created." }
    #     format.json { render :show, status: :created, location: @follow }
    #   else
    #     format.html { render :new, status: :unprocessable_entity }
    #     format.json { render json: @follow.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /follows/1 or /follows/1.json
  def update
    if @follow.update(follow_params)
      render json: @follow
    else
      render json: @follow.errors, status: :unprocessable_entity
    end
    # respond_to do |format|
    #   if @follow.update(follow_params)
    #     format.html { redirect_to follow_url(@follow), notice: "Follow was successfully updated." }
    #     format.json { render :show, status: :ok, location: @follow }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @follow.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /follows/1 or /follows/1.json
  def destroy
    @follow.destroy

    # respond_to do |format|
    #   format.html { redirect_to follows_url, notice: "Follow was successfully destroyed." }
    #   format.json { head :no_content }
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_follow
      @follow = Follow.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def follow_params
      params.require(:follow).permit(:follower_id, :following_id)
    end
end
